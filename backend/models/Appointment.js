const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

/* ⭐ GET all appointments */
router.get("/", (req, res) => {
  try {
    const appointments = Appointment.getAll();

    if (!appointments) {
      return res.json([]);
    }

    res.json(appointments);

  } catch (err) {
    console.error("❌ Appointment fetch error:", err);
    res.status(500).json({ error: "Database fetch failed" });
  }
});

/* ⭐ CREATE appointment */
router.post("/", (req, res) => {
  try {
    const { patientName, dob, gender, date } = req.body;

    if (!patientName || !dob || !gender || !date) {
      return res.status(400).json({
        error: "Patient Name, DOB, Gender and Date are required"
      });
    }

    const id = Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment booked successfully",
      id
    });

  } catch (err) {
    console.error("❌ Appointment create error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

module.exports = router;