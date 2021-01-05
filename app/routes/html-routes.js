//*** Dependencies ***//
//====================//
const path = require('path');

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const index = path.join(PUBLIC_DIR, 'index.html');
const notes = path.join(PUBLIC_DIR, 'notes.html');

//*** HTML Routing ***//
//====================//
module.exports = (app) => {
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
}