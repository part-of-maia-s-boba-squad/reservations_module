var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'hackreactor',
    database : 'reservations'
  });


module.exports.connection = connection;