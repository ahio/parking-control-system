import React from 'react';
import ReactDOM from "react-dom";
import ParkingControlView from './components/parking-control';

ReactDOM.render(
    <ParkingControlView carSeats={30} />,
    document.getElementById('container')
);