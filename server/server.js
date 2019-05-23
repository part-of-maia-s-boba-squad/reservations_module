const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const models = require('../database/models.js');

const app = express();
var port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/restaurants/:restID/bookedTimes', (req, res) => {
  models.queryNumberOfResToday(req.params.restID, (err, result) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    let numResToday = result[0].resToday.toString();
    res.status(200).send(numResToday);
  })
});

app.get('/restaurants/:restID/reservations', (req, res) => {
  console.log(req.params.restID, req.query.partySize, req.query.dateTime);
  models.queryAvailableReservations(req.params.restID, req.query.partySize, req.query.dateTime, (err, results) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).json(results);

  });
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});