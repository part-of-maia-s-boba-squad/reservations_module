var mysql = require('mysql');
var db = require('./db.js');

var queryNumberOfResToday = (restID, callback) => {
    let sql = "SELECT resToday FROM restaurants WHERE id=?";
    db.connection.query(sql, restID, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    })
}

module.exports = {
    queryNumberOfResToday,
}