var mysql = require('mysql');
var db = require('./server/db.js');
var faker = require('faker');
var moment = require('moment');
moment().format();

//node seeding >> seedingresult.sql

var restaurants = [];
for (let i = 1; i <= 100; i++) {
    restaurants.push([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({min: 0, max: 100})])
    let sql = `INSERT INTO restaurants (id, name, resToday) VALUES ("${i.toString().padStart(3, '0')}", "${faker.company.companyName()}", ${faker.random.number({min: 0, max: 50})});`;
    console.log(sql);
    // db.connection.query(sql, [[i.toString().padStart(3, '0'), faker.company.companyName(), faker.random.number({min: 0, max: 50})]], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    // })
    // console.log([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({min: 0, max: 100})])
}

for (let k = 1; k <=5; k++) {
    var time = moment('2019-05-30T17:00');
    for (let j = 0; j < 30; j++) {
        var newDate = moment(time).add(j, 'd');
        for (let i = 0; i < 8; i++) {
            let newTime = moment(newDate);
            let sql = `INSERT INTO availability (timeSlot, capacity, restaurantId) VALUES ("${newTime.add(30*i, 'm').format("YYYY-MM-DD HH:mm:ss")}", ${Math.floor(Math.random()*20)}, "${k.toString().padStart(3, "0")}");`;
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




