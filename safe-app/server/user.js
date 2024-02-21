const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE);

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function login({ username, password }) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err);
        reject({ status: 500, body: "Internal Server Error" });
      }
      if (!row) {
        reject({ status: 404, body: "Missing username" });
      } else if (comparePassword(password, row.password)) {
        resolve({ status: 200, body: row.id });
      } else {
        reject({ status: 400, body: "Username or password wrong" });
      }
    });
  });
}

function register({ username, password }) {
  return new Promise((resolve, reject) => {
    const query = "SELECT username FROM users WHERE username = ?";
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err);
        reject({ status: 500, body: "Internal server error" });
      }
      if (!row) {
        const hashedPassword = hashPassword(password);
        const insert = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.run(insert, [username, hashedPassword], (err) => {
          if (err) {
            console.error(err);
            reject({ status: 500, body: "Internal server error" });
          } else {
            resolve({ status: 201, body: "Registration successful" });
          }
        });
      } else {
        reject({ status: 409, body: "Username already taken" });
      }
    });
  });
}

module.exports = { login, register };
