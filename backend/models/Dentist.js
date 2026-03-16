const db = require('../database');

class Dentist {

    static getAll() {
        try {
            const rows = db.prepare("SELECT * FROM dentists").all();
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static getById(id) {
        try {
            const row = db.prepare("SELECT * FROM dentists WHERE id = ?").get(id);
            return row;
        } catch (err) {
            throw err;
        }
    }

    static create(data) {
        try {
            const stmt = db.prepare(`
                INSERT INTO dentists 
                (name, photo, qualification, experience, clinicName, address, location) 
                VALUES (?,?,?,?,?,?,?)
            `);

            const info = stmt.run(
                data.name,
                data.photo,
                data.qualification,
                data.experience,
                data.clinicName,
                data.address,
                data.location
            );

            return info.lastInsertRowid;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Dentist;