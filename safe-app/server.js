const express = require('express');
const router = require('./server/routes/routes');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const clientDir = path.join(__dirname, "./client");

app.use(express.static(clientDir));

app.use("/", router);

app.listen(port, () => {
    console.log("Server started on http://localhost:" + port);
});