var db = require("./create_database");
db.create();

var nano = require('nano')('http://admin:admin@localhost:5984');
var db = nano.db.use('users');
