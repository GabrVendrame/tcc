const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE);

function login({ username, password }) {
    return new Promise((resolve, reject) => { 
        const query = `SELECT username, password FROM users 
        WHERE username = "${username}" and password = "${password}"`;
        db.get(query, (err, row) => {
            if (err) {
                console.log(err);
                reject({ status: 500, body: "Internal Server Error"})
            }
            if (row.username == username && row.password == password) {
                resolve ({ status: 201, body: "Log in successful" });
            } else {
                resolve ({ status: 400, body: "Username or password wrong" });
            }
        })});
}

function register({ username, password }) {
    return new Promise((resolve, reject) => {
        const query = `SELECT username FROM users WHERE username = "${username}"`;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err);
                console.error("Database error during registration", err);
                reject ({ status: 500, body: "Internal server error" });
            }
            if (row === undefined) {
                console.log("nao existe")
                const insert = `INSERT INTO users (username, password) 
                VALUES ("${username}", "${password}")`
                db.run(insert);
                resolve ({ status: 201, resBody: "Registration successful" });
            } else{
                console.log('existe');
                resolve ({ status: 409, body: "Username already taken" });
            }
        })});
}

module.exports = { login, register };