 //*** Dependencies ***//
//====================//
const fs = require('fs');

const writeToFile = (file, data, job) => {
    fs.writeFile(file, data, (err) => {
        err ? console.error(err) : console.log(`Data ${job}`);
    });
}

module.exports = writeToFile;