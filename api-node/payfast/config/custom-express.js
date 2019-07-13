const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const logger = require('../servicos/logger');

const consign = require('consign');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

// chave customizada para o morgan
morgan.token('corpoRequisicao', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(`
    Requisição - :method
    URL - :url
    HTTP - :http-version
    Status - :status
    Data - :date
    Corpo - :corpoRequisicao
    `, {
        stream: {
            write: function(message) {
                logger.info(message)
            }
        }
    }
));

consign()
    .include('routes')
    .then('persistencia')
    .then('servicos')
    .into(app);

module.exports = app;