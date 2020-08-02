const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');

console.log(notes);

app.use(express.urlencoded({ extended: true}));
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

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    note = req.body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify([{note}], null, 2));
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}`)
});

