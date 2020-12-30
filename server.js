//*** Dependencies ***//
//====================//
const express = require('express');

const app = express();
const PORT = 3000;

const path = require('path');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const DB_DIR = path.resolve(__dirname, './db');
const index = path.join(PUBLIC_DIR, 'index.html')

//*** Routes ***//
//==============//

//Root routes to ./public/index.html
app.get('/', (req, res) => {
    res.sendFile(index);
});



//*** Listener ***//
//================//
app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});