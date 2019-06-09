/* eslint-disable no-lone-blocks */
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

const dates = [
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

const date = function() {
  const index = Math.floor(Math.random() * (30 - 0) + 0);
  return dates[index];
};

const capacity = function() {
  return Math.floor(Math.random() * (10 - 5) + 5);
};

const partySize = function() {
  return Math.floor(Math.random() * (12 - 1) + 1);
};

const times = ['17:00:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00'];

var time = function() {
  var index = Math.floor(Math.random() * (6 - 0) + 0);
  return times[index];
};

var reservationNum = function() {
  const randomNum = Math.floor(Math.random() * (5 - 1) + 1);
  return randomNum;
};

var restaurantName = function() {
  return faker.lorem.word();
};

var name = function() {
  return faker.name.findName();
};

// async function restaurants() {
//   const output = fs.createWriteStream('restaurantdata.csv.gz');
//   const compress = zlib.createGzip();
//   compress.pipe(output);
//   var restaurant;
//   for (let i = 0; i < 10000000; i++) {
//     restaurant = i + ', ' + restaurantName() + ', ' + capacity();
//     let write = compress.write(`${restaurant}\n`);
//     if (!write) {
//       await new Promise(resolve => {
//         compress.once('drain', resolve);
//       });
//     }
//     if (i % 100000 === 0) {
//       console.log('written: ', write, restaurant);
//     }
//   }
//   compress.end();
//   compress.on('finish', () => {
//     console.log('done compressing restaurant data');
//   });
//   compress.on('error', err => {
//     console.log(err.stack);
//   });
// }

// async function reservations() {
//   const output = fs.createWriteStream('reservationdata.csv.gz');
//   const compress = zlib.createGzip();
//   compress.pipe(output);
//   var reservation;
//   var id = 0
//   for (let i = 0; i < 10000000; i++) {
//     let numRes = reservationNum();
//     for (let j = 0; j < numRes; j++) {
//       reservation =
//        //reservation id(uniq id),restaurant id(fk), table id(fk), date, time, party size, name
//         id + ', ' + i + ', ' + j + ', ' + date() + ', ' + time() + ', ' + capacity() + ', ' + name();
//       id+=1
//       let write = compress.write(`${reservation}\n`)
//       if (!write) {
//         await new Promise(resolve => {
//           compress.once('drain', resolve);
//         });
//       }
//       if(i % 100000 === 0) {
//         console.log('reservation: ',reservation)
//       }
//     }
//   }
//   compress.end();
//   compress.on('finish', () => {
//     console.log('done compressing reservation data');
//   });
//   compress.on('error', err => {
//     console.log(err.stack);
//   });
// }

// async function tables() {
//   const output = fs.createWriteStream('tablesdata.csv.gz');
//   const compress = zlib.createGzip();
//   compress.pipe(output);
//   var table;
//   var id = 0
//   for (let i = 0; i < 10000000; i++) {
//     let numRes = reservationNum();
//     for (let j = 0; j < numRes; j++) {
//        // id (unique id), table id(for restaurant), restaurant id, capacity
//       table = id + ', ' + j + ', ' + i + ', ' + capacity();
//        id+=1
//       let write = compress.write(`${table}\n`);
//       if (!write) {
//         await new Promise(resolve => {
//           compress.once('drain', resolve);
//         });
//       }
//       if(i % 100000 === 0) {
//         console.log('written: ', write, table)
//       }
//     }
//   }
//   compress.end();
//   compress.on('finish', () => {
//     console.log('done compressing reservation data');
//   });
//   compress.on('error', err => {
//     console.log(err.stack);
//   });
// }

// tables();

// reservations();

// restaurants();
// ------------------------------------------------------------------- //

async function NOSQLrestaurants() {
  const output = fs.createWriteStream('NOSQLreservationsdata.csv.gz');
  const compress = zlib.createGzip();
  compress.pipe(output);
  var id = 0;
  var restaurant;
  for (let i = 0; i < 1000; i++) {
    const numRes = reservationNum();
    restaurant = id + '|' + restaurantName() + '|' + capacity() + '|' 
    var reservations = [];
    for (let j = 0; j < numRes; j++) {
      var res = {
        id: j,
        name: name(),
        time: time(),
        partySize: partySize(),
      };
      reservations.push(res);
    }
    reservations = JSON.stringify(reservations);
    restaurant += reservations;
    restaurant = restaurant.split('"').join('');

    // restaurant = JSON.stringify(restaurant);
    let write = compress.write(`${restaurant}\n`);

    id += 1;

    if (!write) {
      await new Promise(resolve => {
        compress.once('drain', resolve);
      });
    }
  }
  compress.end();
  compress.on('finish', () => {
    console.log('done compressing reservation data');
  });
  compress.on('error', err => {
    console.log(err.stack);
  });
}

NOSQLrestaurants();
