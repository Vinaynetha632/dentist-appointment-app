require('dotenv').config();
const express = require('express');
const cors = require('cors');

const dentistRoutes = require('./routes/dentistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const db = require('./database'); // establish db connection and run seeds

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// database connection


// Routes

app.use('/api/dentists', dentistRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: "SERVER VERSION 3.0", timestamp: Date.now() });
});

// Base route
app.get('/', (req, res) => {
    res.send('Dentist Appointment API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
