/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const mysql = require('mysql');
const faker = require('faker');
const moment = require('moment');
const db = require('./server/db.js');

moment().format();

// node seeding >> seedingresult.sql

const restaurants = [];
// eslint-disable-next-line no-plusplus
for (let i = 1; i <= 100; i++) {
  restaurants.push([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({ min: 0, max: 100 })]);
  const sql = `INSERT INTO restaurants (id, name, resToday) VALUES ("${i.toString().padStart(3, '0')}", "${faker.company.companyName()}", ${faker.random.number({ min: 0, max: 50 })});`;
  console.log(sql);
  // db.connection.query(sql, [[i.toString().padStart(3, '0'), faker.company.companyName(), faker.random.number({min: 0, max: 50})]], (err, result) => {
  //     if (err) {
  //         console.log(err);
  //         return;
  //     }
  // })
  // console.log([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({min: 0, max: 100})])
}

for (let k = 1; k <= 5; k++) {
  const time = moment('2019-05-30T17:00');
  for (let j = 0; j < 30; j++) {
    const newDate = moment(time).add(j, 'd');
    for (let i = 0; i < 8; i++) {
      const newTime = moment(newDate);
      const sql = `INSERT INTO availability (timeSlot, capacity, restaurantId) VALUES ("${newTime.add(30 * i, 'm').format('YYYY-MM-DD HH:mm:ss')}", ${Math.floor(Math.random() * 20)}, "${k.toString().padStart(3, '0')}");`;
      console.log(sql);

      // db.connection.query(sql,[[newTime.add(30*i, 'm').format("YYYY-MM-DD HH:mm:ss"), Math.floor(Math.random()*20), k.toString().padStart(3, '0')]], (err, result) => {
      //     if (err) {
      //         console.log(err);
      //         return;
      //     }
      // });
    }
  }
}
