const Joi = require('joi');

//--------------------BD Connection----------------\\
const strUrl = 'mongodb://localhost:27017/cafeDos';

//--------------------Models------------------------\\
var modelUser = Joi.object().keys({
  strName: Joi.string().required(),
  strLastName: Joi.string().required(),
  strEmail: Joi.string().required(),
  strPassword: Joi.string().required()
}).optional();


//-------------------Exports-------------------------\\
module.exports = {
  strUrl,
  modelUser
}