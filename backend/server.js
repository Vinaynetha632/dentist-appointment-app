require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./database');

const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ⭐ API routes FIRST */
app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

/* ⭐ Static frontend */
const frontendPath = path.join(__dirname, '..', 'dist');
app.use(express.static(frontendPath));

/* ⭐ React fallback ONLY */
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log('🚀 SERVER RUNNING ON', PORT);
});