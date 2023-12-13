const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE);

const insertFile = async (name, user_id, buffer, mimetype, size) => {
    try {
        const query = `INSERT INTO images (name, file, user_id, mimetype, size) 
        VALUES ("${name}", "${buffer}", "${user_id}", "${mimetype}", "${size}")`;
        db.run(query);
        return { status: 201, body: "Upload successful" };
    } catch (err) {
        console.error("Database error during upload", err);
        return { status: 500, body: "Internal server error" };
    }
}

const getFiles = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM images WHERE id = "${id}"`;
        db.get(query, (err, row) => {
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

module.exports = { insertFile, getFiles };