/*jshint esversion: 8*/
const Joi = require('joi');
//--------------------Model------------------------\\
var modelUser = Joi.object().keys({
    strName: Joi.string().required(),
    strLastName: Joi.string().required().optional(),
    strEmail: Joi.string().lowercase().required(),
    strPhone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required().optional(),
    dteBirthDay: Joi.date().iso().required(),
    strPassword: Joi.string().required(),
    strConfirmPassword: Joi.string().valid(Joi.ref('strPassword')).required().strict()
}).optional();


//-------------------Exports-------------------------\\
module.exports = {
    modelUser
};