const db = require("../database");

class Appointment {
  static getAll() {
    try {
      const stmt = db.prepare("SELECT * FROM appointments ORDER BY id DESC");
      return stmt.all();
    } catch (err) {
      console.log("GET APPOINTMENTS ERROR:", err);
      return [];
    }
  }

  static create(data) {
    try {
      const stmt = db.prepare(`
        INSERT INTO appointments
        (patientName, dob, gender, date, dentistId, dentistName, clinicName)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        data.patientName || "",
        data.dob || "",
        data.gender || "",
        data.date || "",
        Number(data.dentistId) || 1,
        data.dentistName || "",
        data.clinicName || "",
      );

      return result.lastInsertRowid;
    } catch (err) {
      console.log("INSERT ERROR:", err);
      throw err;
    }
  }
}

module.exports = Appointment;
