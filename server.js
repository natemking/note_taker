//*** Dependencies ***//
//====================//
const { json } = require('express');
const express = require('express');
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

//*** Routes ***//
//==============//
app.get('/', (req, res) => {
    res.sendFile(index);
});

app.get('/notes', (req, res) => {
    res.sendFile(notes);
});

app.get('/api', (req, res) => {
  res.sendFile(db);
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
