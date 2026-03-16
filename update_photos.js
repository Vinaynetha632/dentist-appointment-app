const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'backend', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('UPDATING PHOTOS MANUALLY...');

const updates = [
    ["/images/dentist1.jpg", "Dr. Sarah Jenkins"],
    ["/images/dentist2.jpg", "Dr. Michael Chen"],
    ["/images/dentist3.jpg", "Dr. Emily Patel"],
    ["/images/dentist4.jpg", "Dr. John Smith"],
    ["/images/dentist5.jpg", "Dr. Lisa Ray"]
];

db.serialize(() => {
    updates.forEach(([photo, name]) => {
        db.run("UPDATE dentists SET photo = ? WHERE name = ?", [photo, name], function(err) {
            if (err) console.error('Error updating', name, err);
            else console.log('Updated', name, 'Rows affected:', this.changes);
        });
    });

    db.all("SELECT * FROM dentists", (err, rows) => {
        console.log('FINAL DB DATA:');
        console.log(JSON.stringify(rows, null, 2));
        db.close();
    });
});
