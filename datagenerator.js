/* eslint-disable arrow-parens */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
const faker = require('faker');
const fs = require('fs');
const zlib = require('zlib');

const output = fs.createWriteStream('reservationdata.csv.gz');
const compress = zlib.createGzip();

compress.pipe(output);

var dates = [
  '2019-06-01',
  '2019-06-02',
  '2019-06-03',
  '2019-06-04',
  '2019-06-05',
  '2019-06-06',
  '2019-06-07',
  '2019-06-08',
  '2019-06-09',
  '2019-06-10',
  '2019-06-11',
  '2019-06-12',
  '2019-06-13',
  '2019-06-14',
  '2019-06-15',
  '2019-06-16',
  '2019-06-17',
  '2019-06-18',
  '2019-06-19',
  '2019-06-20',
  '2019-06-21',
  '2019-06-22',
  '2019-06-23',
  '2019-06-24',
  '2019-06-25',
  '2019-06-26',
  '2019-06-27',
  '2019-06-28',
  '2019-06-29',
  '2019-06-30',
];

var date = function () {
  const index = Math.floor(Math.random() * (30 - 0) + 0);
  return dates[index];
};

var capacity = function () {
  return Math.floor(Math.random() * (10 - 1) + 1);
};

var times = ['17:00:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00'];
var time = function () {
  var index = Math.floor(Math.random() * (6 - 0) + 0);
  return times[index];
};

for (let i = 0; i < 5000000; i++) {
  var reservation;
  const numReservations = Math.floor(Math.random() * (5 - 1) + 1);
  for (let j = 0; j < numReservations; j++) {
    reservation = i + ',' + date() + ',' + capacity() + ',' + time();
    compress.write(`${reservation}\n`);
  }
  if (i % 10000 === 0) {
    console.log(reservation);
  }
  if (i === 4999999) {
    console.log('Done with reservation');
  }
}

compress.end();

compress.on('finish', () => {
  console.log('done compressing data');
});

compress.on('error', err => {
  console.log(err.stack);
});
