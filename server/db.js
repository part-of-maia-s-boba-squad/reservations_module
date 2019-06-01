var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '172.17.0.2',
    user     : 'root',
    password : 'hackreactor',
    database : 'reservations'
  });


module.exports.connection = connection;