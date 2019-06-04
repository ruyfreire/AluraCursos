const express = require('express');
const app = express();

const consign = require('consign');

consign()
    .include('routes')
    .into(app);

module.exports = app;