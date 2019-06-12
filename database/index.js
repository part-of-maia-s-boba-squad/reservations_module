const { Client } = require("pg");

// const client = new Client();
const client = new Client({
  database: "reservations"
});

const getReservationsMade = (restID, callback) => {
  let sql =
    "SELECT name FROM reservations INNER JOIN restaurants ON reservations .restaurant_id=restaurants.id where restaurant_id=$1";
  console.log("in DB:", restID);
  // console.log(sql, [restID]);
  client.connect();
  client.query(sql, [restID], (err, res) => {
    if (err) {
      console.log("Error connecting:", err);
      callback(err, null);
      client.end();
    } else {
      console.log("success getting: ", res);
      callback(null, res.rows.length);
      client.end();
    }
  });
};

//GO BACK TO AUTO INCREMENT PRIMARY IDS FOR ALL TABLES
// INSERT INTO reservations (id, restaurant_id, table_id, date, time, party_size, name) VALUES (25001760, 10000000, 2, '2019-06-17', '20:00:00', 4, 'Winnie Fong');

const postReservation = (reservationInfo, callback) => {
  // console.log("things I want to insert into db", reservationInfo);
  // console.log("POST Query: ", reservationInfo);
  let sql = "INSERT INTO reservations VALUES (DEFAULT,$1,$2,$3,$4,$5,$6);";
  client.connect();
  client.query(sql, reservationInfo, (err, res) => {
    if (err) {
      console.log("DATABASE :Error connecting:", err);
      callback(err, null);
      client.end();
    } else {
      console.log("success posting: ", res);
      callback(null, "YeeTUS made reservation fosho");
      client.end();
    }
  });
};

const deleteReservation = (reservation, cb) => {
  console.log("in db: ", reservation);
  let sql = "DELETE FROM reservations WHERE restaurant_id=$1 AND name=$2";
  client.connect();
  client.query(sql, reservation, (err, res) => {
    if (err) {
      console.log("we cant delete this try again nerd: ", err);
      cb(err, null);
      client.end();
    } else {
      console.log("yay deleted this reservation: ", res);
      cb(null, 'heck yeah we deleted this reservation');
      client.end();
    }
  });
};

module.exports.getReservationsMade = getReservationsMade;
module.exports.postReservation = postReservation;
module.exports.deleteReservation = deleteReservation;
