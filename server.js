//*** Dependencies ***//
//====================//
const express = require('express');

const app = express();
const PORT = 3000;

const path = require('path');
const PUBLIC = path.resolve(__dirname, './public');
const DB = path.resolve(__dirname, './db');

