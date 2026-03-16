const express = require('express');
const router = express.Router();
const Dentist = require('../models/Dentist');

/* GET all dentists */
router.get('/', (req, res) => {
    try {
        const dentists = Dentist.getAll();
        res.json(dentists);
    } catch (err) {
        console.error("🔥 DENTIST API ERROR:", err);
        res.status(500).json({ error: err.message || "Server crash" });
    }
});

/* GET dentist by id */
router.get('/:id', (req, res) => {
    try {
        const dentist = Dentist.getById(req.params.id);
        if (!dentist) {
            return res.status(404).json({ error: "Dentist not found" });
        }
        res.json(dentist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* CREATE dentist (optional admin feature) */
router.post('/', (req, res) => {
    try {
        const id = Dentist.create(req.body);
        res.status(201).json({ message: "Dentist created", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;