var mysql = require('mysql');
var moment = require('moment');
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

var queryAvailableReservations = (restID, partySize, dateTime, callback) => {
    let startTime = moment(dateTime).subtract('2.5', 'h').format("YYYY-MM-DD HH:mm:ss");
    let endTime = moment(dateTime).add('2.5', 'h').format("YYYY-MM-DD HH:mm:ss");
    let sql = `SELECT * FROM availability WHERE restaurantId=${restID} AND capacity >= ${partySize} AND timeSlot BETWEEN '${startTime}' AND '${endTime}'`;
    db.connection.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }
        console.log(results);
        callback(null, results);
    })

}

module.exports = {
    queryNumberOfResToday,
    queryAvailableReservations
}