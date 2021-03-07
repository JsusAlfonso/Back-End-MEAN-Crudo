const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const functions = require('../functions/usuario.function');
const Celebrate = require('celebrate');
const Joi = require('joi');
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


//------------------DIRECTIONS AND METHODS (APIS)-------->>>>>>>>>>>>>>>>>>

//-------------------JSUS----------------------->>>
//Api que registra un usuario a la base de datos
//---------------------------------------------->>>
app.post('/api/registerUser', Celebrate({
  body: {
    strName: Joi.string().required(),
    strLastName: Joi.string().required(),
    strEmail: Joi.string().required(),
    strPassword: Joi.string().required()
  }
}), function (req, res) {
  functions.fnRegisterAdmin(req.body)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//-------------------Jsus----------------------->>>
//API para obtener un usuario de la base de datos.
//---------------------------------------------->>>
app.get('/api/getUser/:strEmail/:strPassword', Celebrate({
  params: {
    strEmail: Joi.string().required(),
    strPassword: Joi.string().required()
  }
}), function (req, res) {
  functions.fnCheckLogin(req.params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      res.json(err);
    });
});


//---------------------------Datos----------------------------------------------
//GET AND DELTE  = params
//POST AND PUT = body

//----------------------------error messages------------------------------------
app.use((err, req, res, next) => {
  res.status(400).json({
    intStatus: 6,
    strAnswer: 'Error to attend the petition' + err
  });
});

//-------------------API MANAGER RESPONDS TO PORT 5000 ------------------------
app.listen(5003, () => {
  console.log('Listen admin on port 5003');
});