const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE);

function login({ username, password }) {
    return new Promise((resolve, reject) => { 
        const query = `SELECT * FROM users 
        WHERE username = "${username}" and password = "${password}"`;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err);
                reject({ status: 500, body: "Internal Server Error"});
            }
            if (row === undefined){
                reject({ status: 404, body: "Missing username or password"});
            } else if (row) {
                resolve ({ status: 200, body: row.id });
            } else {
                reject ({ status: 400, body: "Username or password wrong" });
            }
        })});
}

function register({ username, password }) {
    return new Promise((resolve, reject) => {
        const query = `SELECT username FROM users WHERE username = "${username}"`;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err);
                reject ({ status: 500, body: "Internal server error" });
            }
            if (row === undefined) {
                const insert = `INSERT INTO users (username, password) 
                VALUES ("${username}", "${password}")`;
                db.run(insert);
                resolve ({ status: 201, body: "Registration successful" });
            } else{
                reject ({ status: 409, body: "Username already taken" });
            }
        })});
}

module.exports = { login, register };