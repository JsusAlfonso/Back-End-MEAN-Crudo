/*jshint esversion: 8*/
const Joi = require('joi');
//--------------------Model------------------------\\
var modelUser = Joi.object().keys({
    strName: Joi.string().required(),
    strLastName: Joi.string().required().optional(),
    strEmail: Joi.string().required(),
    strPassword: Joi.string().required()
}).optional();


//-------------------Exports-------------------------\\
module.exports = {
    modelUser
};