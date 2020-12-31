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
const port = process.env.PORT || 3000

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, './public');
const DB_DIR = path.resolve(__dirname, './db');
const index = path.join(PUBLIC_DIR, 'index.html');
const notes = path.join(PUBLIC_DIR, 'notes.html');
const db = path.join(DB_DIR, 'db.json');

//*** Middleware ***//
//==================//
app.use(express.static(PUBLIC_DIR));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//*** Routes ***//
//==============//
app.get('/', (req, res) => {
    res.sendFile(index);
});

app.get('/notes', (req, res) => {
    res.sendFile(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.end();
})

app.route('/api/notes')
    .get((req, res) => {
        res.sendFile(db);
    }).post((req, res) => {
        //read and parse db.json
        const data = JSON.parse(fs.readFileSync(db));
        //push user data to db.json array
        data.push(req.body);
        //Write file w/ new user data
        fs.writeFile(db, JSON.stringify(data), (err) => {
          err ? console.error(err) : console.log("User data added");
        });
    }); 

//404
app.use((req, res) =>{
    res.sendFile(`${PUBLIC_DIR}/404.html`)
});

//*** Listener ***//
//================//
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
