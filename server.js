const express = require('express');
const sqlite = require('sqlite3').verbose();
const router = require('./server/routes/routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const db = new sqlite.Database('database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error('Database not initialize');
    }
    console.log('Database connected');
});

const path = require('path');

const clientDir = path.join(__dirname, './client');

app.use(express.static(clientDir));

app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});