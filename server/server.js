const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('../database/models.js');

const app = express();
var port = 3000;

app.use(cors());
app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/bookedTimes', (req, res) => {
  models.queryNumberOfResToday(Number(req.query.restID), (err, result) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    let numResToday = result[0].resToday.toString();
    res.status(200).send(numResToday);
  })
});

app.get('/reservations', (req, res) => {
  console.log(req.query);
  res.status(200).end();
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});