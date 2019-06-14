const faker = require('faker');

// INSERT INTO reservations (id, restaurant_id, table_id, date, time, party_size, name) VALUES (25001760, 10000000, 2, '2019-06-17', '20:00:00', 4, 'Winnie Fong');
const makeReservation = (context, events, done) => {
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
  const times = ['17:00:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00'];
  const tableId = Math.floor(Math.random() * (10 - 1) + 1);
  const date = function () {
    const index = Math.floor(Math.random() * (30 - 0) + 0);
    return dates[index];
  };
  const time = function () {
    var index = Math.floor(Math.random() * (6 - 0) + 0);
    return times[index];
  };
  const partySize = Math.floor(Math.random() * (9 - 1) + 1);
  const name = faker.name.findName();

  context.vars.date = date;
  context.vars.time = time;
  context.vars.name = name;
  context.vars.partySize = partySize;
  context.vars.tableId = tableId;
  return done();
}

module.exports = { makeReservation }