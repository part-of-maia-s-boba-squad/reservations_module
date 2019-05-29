DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

USE reservations;

CREATE TABLE restaurants (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    resToday INT
);

CREATE TABLE availability (
    timeSlot DATETIME PRIMARY KEY,
    capacity INT,
    restaurantId INT,
    FOREIGN KEY (restaurantId)
        REFERENCES restaurants(id)
);


