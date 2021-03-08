/*jshint esversion: 8*/
const express = require('express');
const app = express();

app.use(require('./user/user.direction'));

module.exports = app;