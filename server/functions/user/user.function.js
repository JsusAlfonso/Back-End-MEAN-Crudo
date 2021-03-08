/*jshint esversion: 8*/
const MongoClient = require('mongodb').MongoClient;
const strUrl = require('../../config/config').strUrl;
const strDatabaseName = require('../../config/config').strDatabaseName;
const jsnMongoOptions = require('../../config/config').jsnMongoOptions;
const ObjectId = require('mongodb').ObjectID; //is used when you call an object using _id of mongodb


//JSUS
///Route:'/api/registerUser'
exports.fnRegisterAdmin = (jsnBody) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(strUrl, jsnMongoOptions, (err, dbParent) => {
            if (dbParent !== null) {
                db = dbParent.db(strDatabaseName);
            }
            if (err) {
                reject({
                    intStatus: 2,
                    jsnAnswer: { 'Error': 'Cannot connect to the DB' }
                });
            } else {
                //jsnBody.strPassword = 1231231231;
                let myQuery = jsnBody;
                db.collection('clUser').insertOne(myQuery, (err, result) => {
                    if (err) {
                        console.error(err + '\n');
                        dbParent.close();
                        reject({
                            strAnswer: 'Data insert error',
                            intStatus: 2
                        });
                    } else {
                        resolve({
                            jsnAnswer: result.ops[0],
                            intStatus: 1
                        });
                    }
                });
            }
        });
    });
};

///Route:('/api/getUser/:strEmail/:strPassword')
exports.fnCheckLogin = (jsnparams) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(strUrl, jsnMongoOptions, (err, dbParent) => {
            if (dbParent !== null) {
                db = dbParent.db(strDatabaseName);
            }
            if (err) {
                console.error(err + '\n');
                dbParent.close();
                reject({
                    intStatus: 2,
                    jsnAnswer: { 'Error': 'Cannot connect to the DB' }
                });
            } else {
                let query = {
                    $and: [{
                        strEmail: jsnparams.strEmail
                    }, {
                        strPassword: jsnparams.strPassword
                    }]
                };
                //console.log(query);
                db.collection("clUser").find(query).toArray((err, result) => {
                    if (err) {
                        reject(err);
                        dbParent.close();
                    } else {
                        dbParent.close();
                        if (result.length > 0) {
                            delete result[0].strPassword; //no regresa la contraseña para que no la vea el usuario
                            resolve({
                                intStatus: 1,
                                jsnAnswer: result[0]
                            });
                        } else {
                            resolve({
                                intStatus: 2,
                                jsnAnswer: { 'Error': 'User not found' }
                            });
                        }
                    }
                });
            }
        });
    });
};