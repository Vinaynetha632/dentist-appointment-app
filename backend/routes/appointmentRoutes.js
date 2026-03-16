const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/', (req, res) => {
    Appointment.getAll((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { patientName, age, gender, date, dentistId, dentistName, clinicName } = req.body;
    
    console.log(req.body);
    // Basic validation
    if (!patientName || !age || !gender || !date) {
        return res.status(400).json({ error: 'Patient Name, Age, Gender, and Appointment Date are required' });
    }

    Appointment.create(req.body, (err, id) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Appointment created successfully', id });
    });
});

module.exports = router;
