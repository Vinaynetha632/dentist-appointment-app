const db = require("../database");

class Appointment {

  static getAll() {
    const stmt = db.prepare(
      "SELECT * FROM appointments ORDER BY id DESC"
    );
    return stmt.all();
  }
static create(data) {

  const stmt = db.prepare(`
    INSERT INTO appointments
    (patientName, dob, gender, date, dentistId, dentistName, clinicName)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    String(data.patientName),
    String(data.dob),
    String(data.gender),
    String(data.date),
    data.dentistId ? parseInt(data.dentistId) : null,
    String(data.dentistName || ""),
    String(data.clinicName || "")
  );

  return result.lastInsertRowid;
}
}

module.exports = Appointment;