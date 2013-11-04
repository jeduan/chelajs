var level = require('level');
var db = level('./chela-db', { valueEncoding: 'json' });

module.exports = db;
