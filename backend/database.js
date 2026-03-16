const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

console.log('Attempting to open database at:', dbPath);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ DATABASE CONNECTION ERROR:', err.message);
    } else {
        console.log('✅ Connected to the SQLite database.');
        
        // Create tables
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS dentists (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                photo TEXT NOT NULL,
                qualification TEXT NOT NULL,
                experience INTEGER NOT NULL,
                clinicName TEXT NOT NULL,
                address TEXT NOT NULL,
                location TEXT NOT NULL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patientName TEXT NOT NULL,
                dob TEXT NOT NULL,
                gender TEXT NOT NULL,
                date TEXT NOT NULL,
                dentistId INTEGER,
                dentistName TEXT,
                clinicName TEXT,
                status TEXT DEFAULT 'Booked',
                FOREIGN KEY(dentistId) REFERENCES dentists(id)
            )`);
            
            // Force update data for this assignment
            db.run("DELETE FROM dentists", () => {
                const insert = db.prepare("INSERT INTO dentists (name, photo, qualification, experience, clinicName, address, location) VALUES (?,?,?,?,?,?,?)");
                insert.run("Dr. Sarah Jenkins", "/images/dentist1.jpg", "BDS, MDS - Periodontology", 12, "Smile Care Clinic", "Jubilee Hills", "Hyderabad");
                insert.run("Dr. Michael Chen", "/images/dentist2.jpg", "BDS - Endodontics", 8, "Perfect Teeth Center", "Indiranagar", "Bangalore");
                insert.run("Dr. Emily Patel", "/images/dentist3.jpg", "DDS, Orthodontist", 15, "Align Orthodontics", "Connaught Place", "Delhi");
                insert.run("Dr. John Smith", "/images/dentist4.jpg", "BDS, General Dentistry", 5, "Family Dental Rx", "Bandra West", "Mumbai");
                insert.run("Dr. Lisa Ray", "/images/dentist5.jpg", "DDS, Pediatric Dentistry", 10, "Kids Smiles", "T Nagar", "Chennai");
                insert.finalize();
                console.log("SUCCESS: Database seeded with VERSION 2.0 (Local Images)");
            });
        });
    }
});

module.exports = db;
