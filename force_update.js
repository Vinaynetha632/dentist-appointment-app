const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'backend', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Opening database at:', dbPath);

const dentists = [
    ["Dr. Sarah Jenkins", "/images/dentist1.jpg", "BDS, MDS - Periodontology", 12, "Smile Care Clinic", "Jubilee Hills", "Hyderabad"],
    ["Dr. Michael Chen", "/images/dentist2.jpg", "BDS - Endodontics", 8, "Perfect Teeth Center", "Indiranagar", "Bangalore"],
    ["Dr. Emily Patel", "/images/dentist3.jpg", "DDS, Orthodontist", 15, "Align Orthodontics", "Connaught Place", "Delhi"],
    ["Dr. John Smith", "/images/dentist4.jpg", "BDS, General Dentistry", 5, "Family Dental Rx", "Bandra West", "Mumbai"],
    ["Dr. Lisa Ray", "/images/dentist5.jpg", "DDS, Pediatric Dentistry", 10, "Kids Smiles", "T Nagar", "Chennai"]
];

db.serialize(() => {
    db.run("DELETE FROM dentists", (err) => {
        if (err) console.error('Delete error:', err);
        else console.log('TABLE CLEARED');
    });

    const insert = db.prepare("INSERT INTO dentists (name, photo, qualification, experience, clinicName, address, location) VALUES (?,?,?,?,?,?,?)");
    
    dentists.forEach((d, i) => {
        insert.run(d, (err) => {
            if (err) console.error(`Insert error at index ${i}:`, err);
            else console.log(`Inserted: ${d[0]} with photo ${d[1]}`);
        });
    });

    insert.finalize(() => {
        console.log('FINALIZE DONE');
        db.all("SELECT * FROM dentists", (err, rows) => {
            console.log('VERIFYING DATA IN DB:');
            console.log(JSON.stringify(rows, null, 2));
            db.close();
            process.exit(0);
        });
    });
});
