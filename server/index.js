const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index.js");

const app = express();

const port = 3010;
app.listen(port, () => {
  console.log("Listening on port:", port);
});

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/reservations/:restID", (req, res) => {
  // console.log(req.params.restID);
  db.getReservationsMade(req.params.restID, (err, result) => {
    if (err) {
      console.log("err from server: ", err);
      res.status(400).send(err);
    } else {
      console.log("how many reservations made at this restaurant: ", result);
      const numReservations = result.toString();
      res.status(200).send(numReservations);
    }
  });
});

app.post("/reservations/:restID", (req, res) => {
  //console.log("id", req.params.restID);
  let reservation = [
    req.params.restID,
    req.body[0].tableId,
    req.body[0].date,
    req.body[0].time,
    req.body[0].partySize,
    req.body[0].name
  ];
  //console.log("reservationInfo", reservation);
  db.postReservation(reservation, (err, result) => {
    if (err) {
      console.log("SERVER : err making reservation ", err);
      res.status(400).send(err);
    } else {
      console.log("yay made reservation to restaurant", result);
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
      console.log("err deleting: ", err);
      res.status(400).send(err);
    } else {
      console.log("successfully removed reservation", result);
      res.status(200).send(result);
    }
  });
});
