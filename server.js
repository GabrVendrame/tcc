const express = require('express');
const sqlite = require('sqlite3').verbose();

const app = express();

const db = new sqlite.Database('database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err){
        return console.error('Database not initialize');
    }
    console.log('Database connected');
});

// app.set('view engine', 'html');

const path = require('path');

const clientDir = path.join(__dirname, './client');

app.use(express.static(clientDir));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});