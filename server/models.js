let mysql = require('mysql');
let moment = require('moment');
let db = require('./db.js');

let queryNumberOfResToday = (restID, callback) => {
  const sql = 'SELECT resToday FROM restaurants WHERE id=?';
  db.connection.query(sql, restID, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
};

let queryAvailableReservations = (restID, partySize, dateTime, callback) => {
  const startTime = moment(dateTime).subtract('2.5', 'h').format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(dateTime).add('2.5', 'h').format('YYYY-MM-DD HH:mm:ss');
  const sql = `SELECT * FROM availability WHERE restaurantId=${restID} AND capacity >= ${partySize} AND timeSlot BETWEEN '${startTime}' AND '${endTime}'`;
  db.connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      callback(err);
      return;
    }
    console.log(results);
    callback(null, results);
  });
};

module.exports = {
  queryNumberOfResToday,
  queryAvailableReservations,
};
