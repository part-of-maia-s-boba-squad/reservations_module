import React from 'react';
import ReactDOM from 'react-dom';
import Reservations from './components/reservations.jsx';

var path = window.location.pathname;

ReactDOM.render(<Reservations path={path}/>, document.getElementById('reservations'));