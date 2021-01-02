//*** Dependencies ***//
//====================//
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//*** Express app ***//
//===================//
const app = express();
//Dynamic port for Heroku, fallback 3000
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//*** Routes ***//
//==============//
app.get('/', (req, res) => {
    res.sendFile(index);
});

app.get('/notes', (req, res) => {
    res.sendFile(notes);
});


app.route('/api/notes/:id?')
    .get((req, res) => {
        //Filter and display the notes per their id
        const id = parseFloat(req.params.id);
        if (id) {
            const arr = data.filter((note) => {
                return id === note.id;
            });
            res.json(arr);
        } else {
            res.sendFile(db);
        }
        return id;
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

//404
app.use((req, res) => {
    res.status(404).sendFile(`${PUBLIC_DIR}/404.html`);
});

//*** Listener ***//
//================//
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
