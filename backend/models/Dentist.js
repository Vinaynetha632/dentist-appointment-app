const db = require('../database');

class Dentist {
    static getAll(callback) {
        db.all("SELECT * FROM dentists", [], (err, rows) => {
            callback(err, rows);
        });
    }

    static getById(id, callback) {
        db.get("SELECT * FROM dentists WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        });
    }

    static create(data, callback) {
        const sql = `INSERT INTO dentists (name, photo, qualification, experience, clinicName, address, location) VALUES (?,?,?,?,?,?,?)`;
        const params = [data.name, data.photo, data.qualification, data.experience, data.clinicName, data.address, data.location];
        
        db.run(sql, params, function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = Dentist;
