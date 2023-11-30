const db = require('./database');

function register({username, password}) {
    try{
        const data = db.query('SELECT username FROM users WHERE username = ?', [username]);
        console.log(data);
        if (data && data.length > 0){
            return { status: 409, body: "Username already taken" };
        }
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        return { status: 201, body: "Registration successful" };
    } catch (error) {
        console.error("Database error during registration", err);
        return { status: 500, body: "Internal server error" };
    }
}

module.exports = { register };