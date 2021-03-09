/*jshint esversion: 8*/
//--------------------BD Connection----------------\\
const strDatabaseName = 'cafeDos';
const strUrl = `mongodb://localhost:27017/${strDatabaseName}`;
const nmbPort = 3000;

const jsnMongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = {
    strUrl,
    strDatabaseName,
    nmbPort,
    jsnMongoOptions
};