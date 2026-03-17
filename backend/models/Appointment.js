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
      data.patientName,
      data.dob,
      data.gender,
      data.date,
      data.dentistId || null,
      data.dentistName || null,
      data.clinicName || null
    );

    return result.lastInsertRowid;
  }
}

module.exports = Appointment;