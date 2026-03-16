const express = require('express');
const router = express.Router();
const Dentist = require('../models/Dentist');

router.get('/', (req, res) => {
    Dentist.getAll((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { name, photo, qualification, experience, clinicName, address, location } = req.body;
    if (!name || !photo || !qualification || !experience || !clinicName || !address || !location) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    Dentist.create(req.body, (err, id) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Dentist created successfully', id });
    });
});

module.exports = router;
