const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "database.sqlite");

console.log("📦 Opening database:", dbPath);

const db = new Database(dbPath);

/* Enable FK safely */
db.pragma("foreign_keys = OFF");

/* Create tables */

db.exec(`
CREATE TABLE IF NOT EXISTS dentists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  photo TEXT,
  qualification TEXT,
  experience INTEGER,
  clinicName TEXT,
  address TEXT,
  location TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patientName TEXT,
  dob TEXT,
  gender TEXT,
  date TEXT,
  dentistId INTEGER,
  dentistName TEXT,
  clinicName TEXT,
  status TEXT DEFAULT 'Booked'
);
`);

/* ⭐ SEED ONLY ON VERY FIRST DEPLOY */

try {
  const count = db.prepare("SELECT COUNT(*) as c FROM dentists").get();

  if (count.c === 0) {
    console.log("🌱 First deploy seed");

    const insert = db.prepare(`
      INSERT INTO dentists
      (name, photo, qualification, experience, clinicName, address, location)
      VALUES (?,?,?,?,?,?,?)
    `);

    insert.run("Dr. Sarah Jenkins", "/images/dentist1.jpg", "BDS, MDS", 12, "Smile Care Clinic", "Jubilee Hills", "Hyderabad");
    insert.run("Dr. Michael Chen", "/images/dentist2.jpg", "BDS", 8, "Perfect Teeth Center", "Indiranagar", "Bangalore");
    insert.run("Dr. Emily Patel", "/images/dentist3.jpg", "DDS", 15, "Align Orthodontics", "Connaught Place", "Delhi");
    insert.run("Dr. John Smith", "/images/dentist4.jpg", "BDS", 5, "Family Dental Rx", "Bandra", "Mumbai");
    insert.run("Dr. Lisa Ray", "/images/dentist5.jpg", "DDS", 10, "Kids Smiles", "T Nagar", "Chennai");
  }

} catch (e) {
  console.error("❌ DB seed error:", e);
}

console.log("✅ DB Ready");

module.exports = db;