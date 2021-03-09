/*jshint esversion: 8*/
const express = require('express');
const app = express();
const functions = require('../../functions/user/user.function');
const Joi = require('joi');
const ModelUser = require('../../models/user.model').modelUser;

//-------------------JSUS----------------------->>>
//Api que registra un usuario a la base de datos
//---------------------------------------------->>>
app.post('/registerUser', (req, res) => {
    const user = Joi.validate(req.body, ModelUser); // Verificamos que la información que nos manda el usuario sea igual a la del modelo
    if (user.error != null) { // Si falta información o no es del dato que esperabamos nos regresa este error.
        res.json({
            jsnAnswer: { 'Error': user.error.details[0].message },
            intStatus: 6
        });
    } else { // Entro a la función.
        functions.fnRegisterAdmin(user.value)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    }
});

//-------------------Jsus----------------------->>>
//API para obtener un usuario de la base de datos.
//---------------------------------------------->>>
app.get('/getUser/:strEmail/:strPassword', (req, res) => {
    functions.fnCheckLogin(req.params)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = app;