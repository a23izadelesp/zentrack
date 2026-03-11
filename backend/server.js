require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const syncRoutes = require('./routes/sync');

const app = express();
const PORT = process.env.PORT || 22897;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ZenTrack Cloud Backend online' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sync', syncRoutes);

app.listen(PORT, () => {
  console.log(`ZenTrack Backend Server running on http://localhost:${PORT}`);
});
