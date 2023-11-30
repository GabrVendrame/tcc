const db = require('./database')

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const data = db.query("SELECT username, password FROM users WHERE username = ? AND password = ?", [username, password], function (err, row){
        if (err){
            console.error("Database error during login", err);
            res.status(500).send("Internal server error");
        } else if(row) {
            res.status(200).send("Login successful");
        } else{
            res.status.send("Login Failed");
        }
        return {data}; // não faço ideia se ta certo
    });

    if (data.username === username && data.password === password){
        console.log("Login successful");
    } else{
        consoler.error("User not found");
    }
}

module.exports = { login }