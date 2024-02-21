const express = require("express");
const router = require("./server/routes/routes");
const path = require("path");
const fs = require("fs");
const https = require("https");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const clientDir = path.join(__dirname, "./client");

app.use(express.static(clientDir));

app.use("/", router);

const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

https.createServer(options, app).listen(port, () => {
  console.log("Server started on https://localhost:" + port);
});
