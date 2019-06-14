const Pool = require("pg").Pool;

// const Pool = new Client();
const pool = new Pool({
  database: "reservations"
});

const getReservationsMade = (restID, callback) => {
  let sql =
    "SELECT name FROM reservations INNER JOIN restaurants ON reservations .restaurant_id=restaurants.id where restaurant_id=$1";
  //console.log("in DB:", restID);
  // console.log(sql, [restID]);
  pool.query(sql, [restID], (err, res) => {
    if (err) {
      //console.log("Error connecting:", err);
      callback(err, null);
    } else {
      //console.log("success getting: ", res);
      callback(null, res.rows.length);
    }
  });
};

//GO BACK TO AUTO INCREMENT PRIMARY IDS FOR ALL TABLES
// INSERT INTO reservations (id, restaurant_id, table_id, date, time, party_size, name) VALUES (25001760, 10000000, 2, '2019-06-17', '20:00:00', 4, 'Winnie Fong');

const postReservation = (reservationInfo, callback) => {
  // console.log("things I want to insert into db", reservationInfo);
  // console.log("POST Query: ", reservationInfo);
  let sql = "INSERT INTO reservations VALUES (DEFAULT,$1,$2,$3,$4,$5,$6);";
  pool.query(sql, reservationInfo, (err, res) => {
    if (err) {
      //console.log("DATABASE :Error connecting:", err);
      callback(err, null);
    } else {
      //console.log("success posting: ", res);
      callback(null, "YeeTUS made reservation fosho");
    }
  });
};

const deleteReservation = (reservation, cb) => {
  //console.log("in db: ", reservation);
  let sql = "DELETE FROM reservations WHERE restaurant_id=$1 AND name=$2";
  pool.query(sql, reservation, (err, res) => {
    if (err) {
      //console.log("we cant delete this try again nerd: ", err);
      cb(err, null);
    } else {
      //console.log("yay deleted this reservation: ", res);
      cb(null, "heck yeah we deleted this reservation");
    }
  });
};

// const updateReservation = (reservation, cb) => {
//   console.log(reservation);
//   let sql =
//     "UPDATE reservations SET $3 = $4 WHERE name=$2 AND restaurant_id=$1";
//   console.log('UNSET: value of sql', sql)
//   pool.connect();
//   pool.query(sql, reservation, (err, res) => {
//     console.log('SET:value of sql', sql)
//     if (err) {
//       console.log("we cant update this try again nerd: ", err);
//       cb(err, null);
//       pool.end();
//     } else {
//       console.log("updated this reservation: ", res);
//       cb(null, "updated reservation");
//       pool.end();
//     }
//   });
// };

const updateReservation = (reservation, cb) => {
  //console.log("db will update with this: ", reservation);
  let sql =
    "UPDATE reservations SET id = DEFAULT, restaurant_id = $1, table_id = $2, date = $3, time = $4, party_size=$5, name=$6 WHERE name=$6 AND restaurant_id=$1";
  pool.query(sql, reservation, (err, res) => {
    if (err) {
      //console.log("we cant update this try again nerd: ", err);
      cb(err, null);
    } else {
      //console.log("updated this reservation: ", res);
      cb(null, "updated reservation");
    }
  });
};

module.exports.getReservationsMade = getReservationsMade;
module.exports.postReservation = postReservation;
module.exports.deleteReservation = deleteReservation;
module.exports.updateReservation = updateReservation;
