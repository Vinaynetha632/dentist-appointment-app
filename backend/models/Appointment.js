const db = require('../database');

class Appointment {
    static getAll(callback) {
        db.all("SELECT * FROM appointments", [], (err, rows) => {
            callback(err, rows);
        });
    }

    static create(data, callback) {
        const sql = `INSERT INTO appointments (patientName, dob, gender, date, dentistId, dentistName, clinicName) VALUES (?,?,?,?,?,?,?)`;
        const params = [
            data.patientName, 
            data.dob, 
            data.gender, 
            data.date, 
            data.dentistId, 
            data.dentistName, 
            data.clinicName
        ];
        
        db.run(sql, params, function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = Appointment;
