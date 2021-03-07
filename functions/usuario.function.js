const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID; //is used when you call an object using _id of mongodb
const models = require('../directions/helpVariables');
const strUrl = models.strUrl;

//JSUS
///Route:'/api/registerUser'
exports.fnRegisterAdmin = function (jsnBody) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(strUrl, (err, dbParent) => {
      if (dbParent !== null) {
        var db = dbParent.db('cafeDos');
      }
      if (err) {
        console.error(err);
        reject({
          intStatus: 2,
          strAnswer: 'Cannot connect to the DB'
        });
      } else {
        //jsnBody.strPassword = 1231231231;
        var myQuery = jsnBody;
        db.collection('clUser').insertOne(myQuery, function (err, result) {
          if (err) {
            console.error(err + '\n');
            dbParent.close();
            reject({
              strAnswer: 'Data insert error',
              intStatus: 2
            });
          } else {
            resolve({
              strAnswer: result,
              intStatus: 1
            });
          }
        });
      }
    });
  });
};

///Route:('/api/getUser/:strEmail/:strPassword')
exports.fnCheckLogin = function (jsnparams) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(strUrl, function (err, dbParent) {
      if (dbParent !== null) {
        var db = dbParent.db('cafeDos');
      }
      if (err) {
        reject({
          intStatus: 2,
          strAnswer: "Error en la base de datos"
        });
      } else {
        var query = {
          $and: [{
            strEmail: jsnparams.strEmail
          }, {
            strPassword: jsnparams.strPassword
          }]
        };
        //console.log(query);
        db.collection("clUser").find(query).toArray(function (err, result) {
          if (err) {
            reject(err);
            dbParent.close();
          } else {
            dbParent.close();
            if (result.length > 0) {
              delete  result[0].strPassword //no regresa la contraseña para que no la vea el usuario
              resolve({
                intStatus: 1,
                jsnAnswer: result[0]
              });
            } else {
              resolve({
                intStatus: 2
              });
            }
          }
        });
      }
    });
  });
};