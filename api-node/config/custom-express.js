const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const consign = require('consign');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

consign()
    .include('routes')
    .then('persistencia')
    .into(app);

module.exports = app;