var sub = require('level-sublevel');
var db = require('./db');

var sublevel = sub( db );

module.exports = sublevel;