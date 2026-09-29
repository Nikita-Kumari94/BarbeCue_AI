const express = require('express');
const pool = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

const router = express.Router();
const mlUrl = () => (process.env.ML_SERVICE_URL || 'http://localhost:8000').replace(/\/$/, '');

async function mlRequest(path, body) {
  const response = await fetch(`${mlUrl()}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await response.json().catch(() => ({ message: 'Prediction service returned invalid JSON.' }));
  if (!response.ok) { const error = new Error(data.detail || data.message || 'Prediction service failed.'); error.status = response.status; throw error; }
  return data;
}

router.get('/restaurants', async (req, res, next) => {
  try {
    const zip = String(req.query.zip_code || '').trim();
    if (!zip || zip.length > 12) return res.status(400).json({ message: 'A valid zip_code is required.' });
    const [rows] = await pool.query('SELECT org_name AS name, location AS address FROM users WHERE user_type = ? AND location LIKE ? LIMIT 30', ['restaurant', `%${zip}%`]);
    res.json(rows);
  } catch (error) { next(error); }
});

router.post('/sales/train', verifyToken, requireRole('restaurant'), async (req, res, next) => {
  try {
    if (typeof req.body.csv !== 'string' || req.body.csv.length > 8 * 1024 * 1024) return res.status(400).json({ message: 'Submit a CSV string no larger than 8 MB.' });
    res.status(201).json(await mlRequest('/train', { restaurant_id: req.user.id, csv: req.body.csv }));
  } catch (error) { next(error); }
});

router.post('/predictions', verifyToken, requireRole('restaurant'), async (req, res, next) => {
  try {
    const targetDate = req.body.target_date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate || '')) return res.status(400).json({ message: 'target_date must be YYYY-MM-DD.' });
    res.json(await mlRequest('/predict', { restaurant_id: req.user.id, target_date: targetDate }));
  } catch (error) { next(error); }
});

router.post('/donations', verifyToken, requireRole('restaurant'), async (req, res, next) => {
  try {
    const { food_name: foodName, quantity, unit, expires_at: expiresAt, pickup_address: pickupAddress } = req.body;
    if (!foodName || !quantity || !expiresAt || !pickupAddress) return res.status(400).json({ message: 'food_name, quantity, expires_at and pickup_address are required.' });
    const [result] = await pool.execute('INSERT INTO donations (restaurant_id, food_name, quantity, unit, expires_at, pickup_address) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, foodName, quantity, unit || 'servings', expiresAt, pickupAddress]);
    res.status(201).json({ id: result.insertId, message: 'Donation published.' });
  } catch (error) { next(error); }
});

router.get('/donations', verifyToken, async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT d.id, d.food_name, d.quantity, d.unit, d.expires_at, d.pickup_address, u.org_name AS restaurant_name FROM donations d JOIN users u ON u.id = d.restaurant_id WHERE d.status = 'available' AND d.expires_at > NOW() ORDER BY d.expires_at ASC");
    res.json(rows);
  } catch (error) { next(error); }
});

router.post('/donations/:id/requests', verifyToken, requireRole('ngo'), async (req, res, next) => {
  try {
    const [ngo] = await pool.execute('SELECT verified FROM users WHERE id = ?', [req.user.id]);
    if (!ngo[0]?.verified) return res.status(403).json({ message: 'Your NGO must be verified before requesting food.' });
    const [result] = await pool.execute("INSERT INTO donation_requests (donation_id, ngo_id, message) SELECT id, ?, ? FROM donations WHERE id = ? AND status = 'available'", [req.user.id, String(req.body.message || '').slice(0, 500), req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Donation is unavailable.' });
    res.status(201).json({ message: 'Request submitted.' });
  } catch (error) { if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'You already requested this donation.' }); next(error); }
});

router.get('/requests', verifyToken, async (req, res, next) => {
  try {
    const where = req.user.userType === 'restaurant' ? 'd.restaurant_id = ?' : 'r.ngo_id = ?';
    const [rows] = await pool.execute(`SELECT r.id, r.status, r.message, d.food_name, d.quantity, d.unit, d.pickup_address, d.expires_at, u.org_name AS ngo_name FROM donation_requests r JOIN donations d ON d.id = r.donation_id JOIN users u ON u.id = r.ngo_id WHERE ${where} ORDER BY r.created_at DESC`, [req.user.id]);
    res.json(rows);
  } catch (error) { next(error); }
});

router.patch('/requests/:id', verifyToken, requireRole('restaurant'), async (req, res, next) => {
  try {
    const status = req.body.status;
    if (!['accepted', 'rejected'].includes(status)) return res.status(400).json({ message: 'status must be accepted or rejected.' });
    const [result] = await pool.execute("UPDATE donation_requests r JOIN donations d ON d.id = r.donation_id SET r.status = ?, d.status = IF(? = 'accepted', 'reserved', d.status) WHERE r.id = ? AND d.restaurant_id = ? AND r.status = 'pending'", [status, status, req.params.id, req.user.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Pending request not found.' });
    res.json({ message: `Request ${status}.` });
  } catch (error) { next(error); }
});

router.use((error, _req, res, _next) => { console.error(error); res.status(error.status || 500).json({ message: error.message || 'Internal server error.' }); });
module.exports = router;
