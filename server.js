//*** Dependencies ***//
//====================//
const fs = require('fs');
const path = require('path');
const express = require('express');

//*** Express app ***//
//===================//
const app = express();
const PORT = process.env.PORT || 3000

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, './public');
const DB_DIR = path.resolve(__dirname, './db');
const LIB_DIR = path.resolve(__dirname, './lib')
const index = path.join(PUBLIC_DIR, 'index.html');
const notes = path.join(PUBLIC_DIR, 'notes.html');
const db = path.join(DB_DIR, 'db.json');
const data = JSON.parse(fs.readFileSync(db));

//*** Custom Modules ***//
//======================//
const writeToFile = require(`${LIB_DIR}/writeToFile`)
const addID = require(`${LIB_DIR}/addID`);

//*** Middleware ***//
//==================//
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*** Routes ***//
//==============//

//API route
app.route('/api/notes/:id?')
.get((req, res) => {
    const id = parseFloat(req.params.id);
    //Filter and display notes per their id if specific url is requested else show all notes
    if (id) {
        res.json(data.filter(note => id === note.id ));
    } else {
        res.sendFile(db);
    }
})
.post((req, res) => {
    //push user data to db.json array
    data.push(req.body);
    //add an id to each note
    addID(data);
    //Write file w/ new user data
    writeToFile(db, JSON.stringify(data), 'posted');
    res.end();
})
.delete((req, res) => {
    const id = parseFloat(req.params.id);
    //Remove the note from data array
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            data.splice(i, 1);
        }
    }
    //update the notes id#
    addID(data);
    //Write file w/ user data deleted
    writeToFile(db, JSON.stringify(data), 'deleted');
    res.end();
});

//Root route
app.get('/', (req, res) => {
    res.sendFile(index);
});

//Notes route
app.get('/notes', (req, res) => {
    res.sendFile(notes);
});

//Catch all route to redirect to index.html
app.all('*',(req, res) => {
    res.redirect('/');
});

//*** Listener ***//
//================//
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
