DROP DATABASE IF EXISTS reservations;

CREATE DATABASE reservations;

USE reservations;

CREATE TABLE restaurants (
    id VARCHAR(3) PRIMARY KEY,
    name VARCHAR(255),
    resToday INT
);

CREATE TABLE availability (
    timeSlot DATETIME,
    capacity INT,
    restaurantId VARCHAR(3),
    PRIMARY KEY (timeSlot, restaurantId),
    FOREIGN KEY (restaurantId)
        REFERENCES restaurants(id)
);


