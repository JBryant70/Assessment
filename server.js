// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const starship = require('./src/routes/starship.js')
const film = require('./src/routes/film.js');
const planet = require('./src/routes/planets.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/starships', starship);
app.use('/films', film);
app.use('/planets', planet);


module.exports = app;