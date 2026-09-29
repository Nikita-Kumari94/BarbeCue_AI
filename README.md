# BarbeCue AI

BarbeCue AI forecasts restaurant demand from that restaurant's sales history and connects verified NGOs with available food donations.

## Run locally with Docker

1. Install Docker Desktop.
2. From the repository root run `docker compose up --build`.
3. Open `http://localhost:8080`.

The stack comprises React/Nginx, Node/Express, MySQL, and a FastAPI/scikit-learn prediction service. MySQL data and restaurant-specific trained models persist in named Docker volumes.

## Application flow

1. Register a restaurant or NGO account. An administrator must set `users.verified = 1` for an NGO before it can request donations.
2. A restaurant uploads CSV sales data containing `date`, `item_name`, and `quantity`, then trains a model and requests a date forecast.
3. Restaurants publish leftover food. Verified NGOs request it; restaurants accept or reject requests.

The model is evaluated with a chronological validation split before being retrained on all supplied historical data. The dashboard displays the held-out MAE.

## Production configuration

Set `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `ML_SERVICE_URL`, and `CORS_ORIGIN` using the template at [backend/.env.example](backend/.env.example). Do not commit `.env` files. Use managed MySQL, HTTPS, a long random JWT secret, and persistent storage for ML models in production.

For a separately hosted frontend, set `VITE_API_URL=https://your-api.example.com/api` at build time. The included Nginx configuration uses `/api` when deployed as a single Docker stack.
