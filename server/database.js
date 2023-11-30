const sqlite = require("sqlite3");
const path = require("path");
const db = new sqlite.Database(path.resolve("database.db"), { fileMustExist: true });

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run,
};