const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    //res.sendFile(path.join(__dirname, './db/db.json'));
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`)
});

