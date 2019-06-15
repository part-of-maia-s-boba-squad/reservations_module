require('newrelic');
const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database/index.js");
const responseTime = require('response-time')

const app = express();

const redis = require('redis');
const client = redis.createClient();
app.use(responseTime());

const port = 3010;
app.listen(port, () => {
  console.log("Listening on port:", port);
});
app.use(bodyParser.json());
app.use(express.static("public"));

const getReservations = (req, res) => {
  let restId = req.params.restID
  db.getReservationsMade(req.params.restID, (err, result) => {
    if (err) {
      //console.log("err from server: ", err);
      res.status(400).send(err);
    } else {
      //console.log("how many reservations made at this restaurant: ", result);
      const numReservations = result.toString();
      client.setex(restId, 60, numReservations);
      res.status(200).send(numReservations);
    }
  });
}

const getCache = (req, res) => {
  let restId = req.params.restID
  let url = `http://localhost:3010/reservations/${restId}`
  client.get(url, (err, result) => {
    if (result) {
      const numReservations = result.toString();
      res.status(200).send(numReservations)
    } else {
      getReservations(req, res)
    }
  })
}

app.get('/reservations/:restID', getCache)

// app.get("/reservations/:restID", (req, res) => {
//   // console.log(req.params.restID);
//   db.getReservationsMade(req.params.restID, (err, result) => {
//     if (err) {
//       //console.log("err from server: ", err);
//       res.status(400).send(err);
//     } else {
//       //console.log("how many reservations made at this restaurant: ", result);
//       const numReservations = result.toString();
//       res.status(200).send(numReservations);
//     }
//   });
// });

app.post("/reservations/:restID", (req, res) => {
  //console.log("id", req.params.restID);
  // console.log("id: ", req.params.restID)
  let reservation = [
    req.params.restID,
    req.body.tableId,
    req.body.date,
    req.body.time,
    req.body.partySize,
    req.body.name
  ];
  //console.log("reservationInfo", reservation);
  db.postReservation(reservation, (err, result) => {
    if (err) {
      //console.log("SERVER : err making reservation ", err);
      res.status(400).send(err);
    } else {
      //console.log("yay made reservation to restaurant", result);
      res.status(200).send(result);
    }
  });
});

app.delete("/reservations/:restID", (req, res) => {
  let restId = Number(req.params.restID);
  let reservation = [restId, req.body[0].name];
  // console.log(typeof reservation[0]);
  db.deleteReservation(reservation, (err, result) => {
    if (err) {
      //console.log("err deleting: ", err);
      res.status(400).send(err);
    } else {
      //console.log("successfully removed reservation", result);
      res.status(200).send(result);
    }
  });
});

// app.put("/reservations/:restID", (req, res) => {
//   let restId = Number(req.params.restID);
//   let name = req.body[0].name;
//   let itemToChange;
//   let setTo;
//   // let key = req.body[]
//   for (var key in req.body[0]) {
//     if (key !== "name") {
//       itemToChange = key;
//     } else if (key === "time" || key === "partySize" || key === "date") {
//      MAKE PREPARED STATEMENT HERE  
//     }
//   }
//   // console.log(value);
//   setTo = req.body[0][itemToChange];
//   // console.log("setTo", typeof setTo);

//   let reservation = [restId, name, itemToChange, setTo];
//   db.updateReservation(reservation, (err, result) => {
//     if (err) {
//       console.log("err updating: ", err);
//       res.status(400).send(err);
//     } else {
//       console.log("successfully updated reservation", result);
//       res.status(200).send(result);
//     }
//   });
// });

app.put("/reservations/:restID", (req, res) => {
  let reservation = [
    req.params.restID,
    req.body[0].tableId,
    req.body[0].date,
    req.body[0].time,
    req.body[0].partySize,
    req.body[0].name
  ];
  db.updateReservation(reservation, (err, result) => {
    if (err) {
      //console.log("err updating: ", err);
      res.status(400).send(err);
    } else {
      //console.log("successfully updated reservation", result);
      res.status(200).send(result);
    }
  });
});
