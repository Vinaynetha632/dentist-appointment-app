require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const dentistRoutes = require("./routes/dentistRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* API routes */
app.use("/api/dentists", dentistRoutes);
app.use("/api/appointments", appointmentRoutes);

/* ⭐ Serve React build */
const frontendPath = path.join(__dirname, "..", "dist");
app.use(express.static(frontendPath));

/* ⭐ Catch-all ONLY for non-API routes */
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log("🚀 SERVER RUNNING ON PORT", PORT);
});
