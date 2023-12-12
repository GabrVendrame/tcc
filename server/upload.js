const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const insertFile = async (name, file, user_id, mimetype, size) => {
    try {

        db.run('INSERT INTO images (name, file, user_id, mimetype, size) VALUES (?, ?, ?, ?, ?)', [name, file, user_id, mimetype, size]);
        return { status: 201, body: "Upload successful" };
    } catch (err) {
        console.error("Database error during upload", err);
        return { status: 500, body: "Internal server error" };
    }

}

module.exports = { insertFile };

