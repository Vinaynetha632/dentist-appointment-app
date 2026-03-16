const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'backend', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('--- DB FIXER START ---');
console.log('Target DB:', dbPath);

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS dentists", (err) => {
        if (err) console.error('DROP error:', err);
        else console.log('TABLE DROPPED');
    });

    db.run(`CREATE TABLE dentists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        photo TEXT NOT NULL,
        qualification TEXT NOT NULL,
        experience INTEGER NOT NULL,
        clinicName TEXT NOT NULL,
        address TEXT NOT NULL,
        location TEXT NOT NULL
    )`, (err) => {
        if (err) console.error('CREATE error:', err);
        else console.log('TABLE CREATED');
    });

    const insert = db.prepare("INSERT INTO dentists (name, photo, qualification, experience, clinicName, address, location) VALUES (?,?,?,?,?,?,?)");
    
    const data = [
        ["Dr. Sarah Jenkins", "/images/dentist1.jpg", "BDS, MDS - Periodontology", 12, "Smile Care Clinic", "Jubilee Hills", "Hyderabad"],
        ["Dr. Michael Chen", "/images/dentist2.jpg", "BDS - Endodontics", 8, "Perfect Teeth Center", "Indiranagar", "Bangalore"],
        ["Dr. Emily Patel", "/images/dentist3.jpg", "DDS, Orthodontist", 15, "Align Orthodontics", "Connaught Place", "Delhi"],
        ["Dr. John Smith", "/images/dentist4.jpg", "BDS, General Dentistry", 5, "Family Dental Rx", "Bandra West", "Mumbai"],
        ["Dr. Lisa Ray", "/images/dentist5.jpg", "DDS, Pediatric Dentistry", 10, "Kids Smiles", "T Nagar", "Chennai"]
    ];

    data.forEach(d => {
        insert.run(d, (err) => {
            if (err) console.error('INSERT error for', d[0], err);
            else console.log('INSERTED', d[0]);
        });
    });

    insert.finalize(() => {
        console.log('FINALIZE DONE');
        db.all("SELECT * FROM dentists", (err, rows) => {
            console.log('VERIFICATION:');
            console.log(JSON.stringify(rows));
            db.close();
            process.exit(0);
        });
    });
});
