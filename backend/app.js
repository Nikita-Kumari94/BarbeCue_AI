const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const platformRoutes = require('./routes/platformRoutes');

const app = express();


const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST', 'PATCH'] }));
app.use(express.json({ limit: '10mb' }));

app.use('/api', authRoutes);
app.use('/api', platformRoutes);
app.get('/health', (_req, res) => res.json({ ok: true }));

module.exports = app;
