const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const consign = require('consign');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('routes')
    .then('persistencia')
    .into(app);

module.exports = app;