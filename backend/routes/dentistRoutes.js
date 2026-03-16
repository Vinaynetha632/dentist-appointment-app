const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");

router.get("/", (req, res) => {
  try {
    const rows = Dentist.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Dentist fetch error:", err);
    res.status(500).json({ error: "Failed to load dentists" });
  }
});

router.post("/", (req, res) => {
  try {
    const id = Dentist.create(req.body);
    res.status(201).json({ message: "Dentist created", id });
  } catch (err) {
    console.error("Dentist create error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

module.exports = router;