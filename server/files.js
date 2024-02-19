const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE);

const insertFile = async (name, buffer, user_id, mimetype, size) => {
  try {
    const query =
      "INSERT INTO images (name, file, user_id, mimetype, size) VALUES (?, ?, ?, ?, ?)";
    db.run(query, [name, buffer, user_id, mimetype, size]);
    return { status: 201, body: "Upload successful" };
  } catch (err) {
    console.error(err);
    return { status: 500, body: "Internal server error" };
  }
};

const getFiles = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, file, mimetype FROM images WHERE user_id = "${user_id}"`;
    db.all(query, (err, row) => {
      if (row) {
        resolve({ status: 200, body: row });
      } else {
        reject({ status: 404, body: "Not found" });
      }
    });
  });
};

module.exports = { insertFile, getFiles };
