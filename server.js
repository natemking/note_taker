//*** Dependencies ***//
//====================//
const express = require('express');
const path = require('path');


//*** Express app ***//
//===================//
const app = express();
const PORT = process.env.PORT || 3000;

//*** Directories ***//
//===================//
const PUBLIC_DIR = path.resolve(__dirname, './app/public');
const ROUTES_DIR = path.resolve(__dirname, './app/routes');
const apiRoutes = path.join(ROUTES_DIR, './api-routes.js');
const htmlRoutes = path.join(ROUTES_DIR, './html-routes.js');

//*** Middleware ***//
//==================//
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*** Routes ***//
//==============//
    //API routes
require(apiRoutes)(app);
    // HTML routes
require(htmlRoutes)(app);

//*** Listener ***//
//================//
app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
