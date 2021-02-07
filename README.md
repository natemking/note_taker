# Note Taker
Homework #11 Express: Note Taker

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/natemking/note_taker/blob/main/LICENSE)

[Depolyed App Link](https://note-taker-nmk.herokuapp.com/)

![html badge](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![css badge](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![bootstrap badge](https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)
![jquery badge](https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white)
![node.js badge](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)
![express.js badge](https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge)

---
## Table of Contents
 * [Description](#description)
    + [Scope of Work](#scope-of-work)
    + [Node.js & Express functionality](#nodejs--express-functionality)
    + [HTML, CSS & jQuery](#html-css--jquery)
  * [Screenshots](#screenshots)
  * [License](#license)
  * [Credits](#credits)

## Description

### Scope of Work
The user is wanting an app that will allow them to take notes. This app must allow them to create, save, recall, and delete their notes. The app is to use an express.js backend.

### Node.js & Express Functionality
The main goal of this project was taking the boilerplate code provided and getting it deployed via a custom-built Express server. The first move was to create a server and getting the routes setup. Originally I had written the routes right into the server file but in the end refactored to have my routes in their own modules. I like this better as it compartmentalizes your code. Not only does it give other modules access to the same code, but it also makes updating code in the future much easier. No need to go to multiple spots. Just update your module and it will flow through.

The only npm package in this project is Express. The rest of the modules I used are either built-in (fs, patch) or written by me. The only middleware needed was built in as well(static, urlencoded, JSON).

The API route is really only one route that takes the user to '/api/notes'. The GET method will display the current notes that are saved in the db.json file. I did add an ID parameter here allowing the ability to display just one note based on its ID number. Otherwise, all notes are displayed. The POST method will take the parsed JSON data from the db file and push the user data to it. I then call a modularized function, `addID()`, that adds a unique ID onto each note. This function is a simple for loop that goes through each object and adds the ID as a number. Then the new db file is written using the filesystem `writeFile()` method which is actually in another modularized function I created called `writeToFile()`. Finally, there is a DELETE method. The object is deleted by using a for loop and the `splice()` method on the db.json data. The object can be identified by the ID number that is added to it on the POST request. Once the object is removed, the data is again run through the `addID()` function to update the ID numbers and lastly written with the `writeToFile()` function.

The HTML routes are very straight forward. There are only three: '/' (index.html), 'notes'(notes.html), and a '*' wildcard to redirect all other route requests back to the index. 

### HTML, CSS, & jQuery
All of the HTML, CSS, and jQuery came provided with the assignment. I left the jQuery code alone. Once the server was up and running, all the jQuery was working as expected and I saw no need to alter it. The HTML was not altered too much either. Aside from changing some wording and a provided emoji, it is very similar to what was originally given. 

It was in the styling that I decided to have a little fun and put my own spin on the project. The project came with BootStrap and a BootSwatch theme. I updated this theme to a color scheme I preferred. What I really dove into was the idea that I wanted the notes to actually look like a notepad and paper. The note list was simple. Just some formatting and coloring to give the look of a post-it pad. The real fun was to make the note text area to look like a sheet of ruled paper. I achieved this by using a background image I found that was lined paper. The background is just the lines. I had to use BootStraps grid to create a grid of 2 columns and add the background image to all. Then I was able to add a border for the pink margin line on ruled paper. A happy accident worked out that my text lines up with the lines on the paper. 

As with all my projects, this is fully mobile responsive. I had to go outside of BootStraps responsiveness and create some media query rules of my own in order to achieve the look I wanted on mobile devices.

## Screenshots

<summary><strong>Note Taker</strong></summary>
<br>


![index page](./app/public/assets/images/screenshots/note_taker_index.jpg?raw=true)
<br>
_Index.html_
<br>

![app functionality](./app/public/assets/images/screenshots/note_taker_notes.gif?raw=true)
<br>
_app functionality_
<br>

![workday planner hour change](./app/public/assets/images/screenshots/note_taker_index_mobile.jpg?raw=true)
<br>
_index.html on mobile_
<br>

![workday planner day change](./app/public/assets/images/screenshots/note_taker_notes_mobile.jpg?raw=true)
<br>
_notes.html on mobile_
<br>


## License
Licensed under the GNU GPLv3.0 License. Copyright © 2020

## Credits

* [Background image from subtle backgrounds](https://www.toptal.com/designers/subtlepatterns/?s=paper)

* [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)

* [Favicon](https://favicon.io/emoji-favicons/)

* [Deploying app to Heroku](https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/) 

* [Push object to array of of JSON file](https://stackoverflow.com/questions/61473968/how-to-push-object-inside-an-array-while-writing-to-a-file-in-node-js)

* [`require()` vs `fs.readFileSync()` to read JSON files](https://dev.to/tejesh/nodejs-read-json-file-using-require-vs-fs-module-4f94)


