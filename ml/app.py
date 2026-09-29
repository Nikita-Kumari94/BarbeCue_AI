from __future__ import annotations

from io import StringIO
from pathlib import Path
from typing import List

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder

app = FastAPI(title='BarbeCue prediction service')
MODEL_DIR = Path(__file__).resolve().parent / 'models'
MODEL_DIR.mkdir(exist_ok=True)
REQUIRED_COLUMNS = {'date', 'item_name', 'quantity'}

class TrainingPayload(BaseModel):
    restaurant_id: int
    csv: str = Field(min_length=30, max_length=8 * 1024 * 1024)

class PredictionPayload(BaseModel):
    restaurant_id: int
    target_date: str

def model_path(restaurant_id: int) -> Path:
    return MODEL_DIR / f'restaurant-{restaurant_id}.joblib'

def prepare(csv_text: str) -> pd.DataFrame:
    try:
        frame = pd.read_csv(StringIO(csv_text))
    except Exception as exc:
        raise HTTPException(400, f'Invalid CSV: {exc}') from exc
    missing = REQUIRED_COLUMNS - set(frame.columns)
    if missing:
        raise HTTPException(400, f'CSV must contain: date, item_name, quantity. Missing: {", ".join(sorted(missing))}.')
    frame = frame[['date', 'item_name', 'quantity']].copy()
    frame['date'] = pd.to_datetime(frame['date'], dayfirst=True, errors='coerce')
    frame['quantity'] = pd.to_numeric(frame['quantity'], errors='coerce')
    frame['item_name'] = frame['item_name'].astype(str).str.strip()
    frame = frame.dropna().query("quantity >= 0 and item_name != ''")
    if len(frame) < 30 or frame['date'].nunique() < 14 or frame['item_name'].nunique() < 2:
        raise HTTPException(400, 'CSV needs at least 30 rows, 14 dates, and 2 menu items for a useful forecast.')
    return frame.groupby(['date', 'item_name'], as_index=False)['quantity'].sum().sort_values('date')

def features(frame: pd.DataFrame, encoder: LabelEncoder) -> pd.DataFrame:
    result = frame.copy()
    result['item_code'] = encoder.transform(result['item_name'])
    result['weekday'] = result['date'].dt.weekday
    result['month'] = result['date'].dt.month
    result['day_of_month'] = result['date'].dt.day
    return result[['item_code', 'weekday', 'month', 'day_of_month']]

@app.get('/health')
def health():
    return {'ok': True}

@app.post('/train')
def train(payload: TrainingPayload):
    frame = prepare(payload.csv)
    encoder = LabelEncoder().fit(frame['item_name'])
    cutoff = frame['date'].quantile(0.8)
    train_frame, validation = frame[frame['date'] <= cutoff], frame[frame['date'] > cutoff]
    if validation.empty or train_frame.empty:
        raise HTTPException(400, 'CSV needs data across multiple dates for chronological validation.')
    model = RandomForestRegressor(n_estimators=250, min_samples_leaf=2, random_state=42, n_jobs=-1)
    model.fit(features(train_frame, encoder), train_frame['quantity'])
    mae = float(mean_absolute_error(validation['quantity'], model.predict(features(validation, encoder))))
    # Retrain on all historical data only after evaluating on future-held-out data.
    model.fit(features(frame, encoder), frame['quantity'])
    joblib.dump({'model': model, 'encoder': encoder, 'trained_through': str(frame['date'].max().date()), 'validation_mae': round(mae, 2)}, model_path(payload.restaurant_id))
    return {'message': 'Model trained.', 'rows_used': len(frame), 'items': int(frame['item_name'].nunique()), 'trained_through': str(frame['date'].max().date()), 'validation_mae': round(mae, 2)}

@app.post('/predict')
def predict(payload: PredictionPayload):
    try:
        target = pd.Timestamp(payload.target_date)
    except ValueError as exc:
        raise HTTPException(400, 'target_date must be YYYY-MM-DD.') from exc
    path = model_path(payload.restaurant_id)
    if not path.exists():
        raise HTTPException(404, 'No model found. Upload and train using sales data first.')
    artifact = joblib.load(path)
    encoder: LabelEncoder = artifact['encoder']
    frame = pd.DataFrame({'item_name': encoder.classes_, 'date': target})
    prediction = artifact['model'].predict(features(frame, encoder))
    rows = [{'item_name': item, 'predicted_quantity': max(0, int(round(value)))} for item, value in zip(frame['item_name'], prediction)]
    rows.sort(key=lambda row: row['predicted_quantity'], reverse=True)
    return {'target_date': payload.target_date, 'trained_through': artifact['trained_through'], 'validation_mae': artifact['validation_mae'], 'predictions': rows}
