const db = require('../database');

class Appointment {

    static getAll() {
        try {
            const rows = db.prepare("SELECT * FROM appointments ORDER BY id DESC").all();
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static create(data) {
        try {
            const stmt = db.prepare(`
                INSERT INTO appointments 
                (patientName, dob, gender, date, dentistId, dentistName, clinicName) 
                VALUES (?,?,?,?,?,?,?)
            `);

            const info = stmt.run(
                data.patientName,
                data.dob,
                data.gender,
                data.date,
                data.dentistId,
                data.dentistName,
                data.clinicName
            );

            return info.lastInsertRowid;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Appointment;