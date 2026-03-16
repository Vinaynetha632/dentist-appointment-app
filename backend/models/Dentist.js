const db = require("../database");

class Dentist {
  static getAll() {
    return db.prepare("SELECT * FROM dentists").all();
  }

  static getById(id) {
    return db.prepare("SELECT * FROM dentists WHERE id = ?").get(id);
  }

  static create(data) {
    const info = db.prepare(`
      INSERT INTO dentists
      (name, photo, qualification, experience, clinicName, address, location)
      VALUES (?,?,?,?,?,?,?)
    `).run(
      data.name,
      data.photo,
      data.qualification,
      data.experience,
      data.clinicName,
      data.address,
      data.location
    );

    return info.lastInsertRowid;
  }
}

module.exports = Dentist;