CREATE TABLE restaurants
(
  id serial PRIMARY KEY,
  restaurant_name varchar(255),
  capacity int
);
COPY restaurants FROM '/Users/pikajoyce/reservations_module/restaurantdata.csv'
(FORMAT csv);

CREATE TABLE tables
(
  id serial PRIMARY KEY,
  tab_in_rest_id int,
  restaurant_id INTEGER REFERENCES restaurants(id),
  capacity int
);
COPY tables FROM '/Users/pikajoyce/reservations_module/tablesdata.csv'
(FORMAT csv);

CREATE TABLE reservations
(
  id serial PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  table_id INTEGER REFERENCES tables(id),
  date varchar(255),
  time varchar(255),
  party_size int,
  name varchar(255)
);
COPY reservations FROM '/Users/pikajoyce/reservations_module/reservationdata.csv'
(FORMAT csv);