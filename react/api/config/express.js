const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotas = require('../routes/rotas');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

rotas(app);

module.exports = app;