const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.get("/", (req, res) => {
  try {
    const rows = Appointment.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Appointment fetch error:", err);
    res.status(500).json({ error: "Failed to load appointments" });
  }
});

router.post("/", (req, res) => {
  try {
    const { patientName, dob, gender, date } = req.body;

    if (!patientName || !dob || !gender || !date) {
      return res.status(400).json({
        error: "Patient Name, DOB, Gender and Date required"
      });
    }

    const id = Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment booked",
      id
    });

  } catch (err) {
    console.error("Appointment create error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

module.exports = router;