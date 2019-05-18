var mysql = require('mysql');
var db = require('./db.js');
var faker = require('faker');
var moment = require('moment');
moment().format();

var restaurants = [];
for (let i = 1; i <= 100; i++) {
    restaurants.push([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({min: 0, max: 100})])
    let sql = "INSERT INTO restaurants (id, name, resToday) VALUES (?)";
    db.connection.query(sql, [[i, faker.company.companyName(), faker.random.number({min: 0, max: 100})]], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    })
    // console.log([i.toString().padStart(3, 0), faker.company.companyName(), faker.random.number({min: 0, max: 100})])
}

var availability = [];
var time = moment('2019-05-17T17:00');
for (let k = 1; k <=1; k++) {
    for (let j = 0; j < 30; j++) {
        time.add(1, 'd');
        for (let i = 0; i < 10; i++) {
            let newTime = moment(time);
            time.add(30, 'm');
            availability.push([newTime.add(30, 'm'), 10])
            let sql = "INSERT INTO availability (timeSlot, capacity, restaurantId) VALUES (?)";
            db.connection.query(sql,[[newTime.add(30, 'm').format("YYYY-MM-DD HH:mm:ss"), Math.floor(Math.random()*20), k]], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        }
    }

}




