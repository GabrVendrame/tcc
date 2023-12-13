const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


const getFiles = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM images WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error("Database error during upload", err);
                reject({ status: 500, body: "Internal server error" });
            }

            if (row) {

                resolve({ status: 200, body: row });
            } else {
                resolve({ status: 404, body: "Not found" });
            }
        });
    });
};

module.exports = { getFiles };

