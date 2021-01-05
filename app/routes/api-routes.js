//*** Dependencies ***//
//====================//
const fs = require('fs');
const path = require('path');


//*** Directories ***//
//===================//
const DB_DIR = path.resolve(__dirname, '../db');
const LIB_DIR = path.resolve(__dirname, '../lib');
const db = path.join(DB_DIR, 'db.json');


//*** Custom Modules ***//
//======================//
    //Parse and read the db file
const data = JSON.parse(fs.readFileSync(db));
    //Function to write to file
const writeToFile = require(`${LIB_DIR}/writeToFile`);
    //Function to add an id to each note
const addID = require(`${LIB_DIR}/addID`);

//*** API Routing ***//
//===================//
module.exports = (app) => {
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
    //Push user data to db.json 
    data.push(req.body);
    //Add an id to each note
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
    //Update the notes ids 
    addID(data);
    //Write file w/ user data deleted
    writeToFile(db, JSON.stringify(data), 'deleted');
    res.end();
});
}
