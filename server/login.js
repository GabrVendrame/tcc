const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function loginUser({ username, password }) {
    try {
        const data = db.query(
            "SELECT username, password FROM users WHERE username = ? and password = ?",
            [username, password]);
        if (data && data.length > 0) {
            return { status: 200, body: "Log in successful" };
        } else {
            return { status: 400, body: "Username or password wrong" };
        }
    } catch (err) {
        console.error("Database error during login", err);
        return { status: 500, body: "Internal server error" };
    }
}

module.exports = { loginUser };