/*jshint esversion: 8*/
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nmbPort = require('./config/config').nmbPort;

require('colors');

//const modelUser = require('../directions/helpVariables').modelUser;

app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 500000
}));

app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(cors());

app.use('/api', require('./directions/index'));

//---------------------------Info----------------------------------------------
//GET AND DELTE  = params
//POST AND PUT = body

//----------------------------error messages------------------------------------
app.use((req, res, next) => {
    return res.status(404).send({
        resp: '404',
        err: true,
        msg: `URL ${req.url} Not Found`,
        cont: {}
    });
});

app.use((err, req, res, next) => {
    res.status(400).json({
        intStatus: 6,
        strAnswer: 'Error to attend the petition' + err
    });
});

//-------------------API MANAGER RESPONDS TO PORT 5000 ------------------------
const server = app.listen(nmbPort, () => {
    console.log('[SERVER]'.green, `Listen admin on port: ${nmbPort}`);
});