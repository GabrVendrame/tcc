app.post("/server/register", (req, res) => {
  const { username, password } = req.body;

  db.run(
    "SELECT username FROM users WHERE username = ?",
    [username],
    async (error, res) => {
      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        return res.render("register", {
          message: "This username is already in use",
        });
      }
    }
  );
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        alert("User registered");
        // return res.render('register');
      }
    }
  );
});