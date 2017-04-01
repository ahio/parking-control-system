import React from 'react';
import ReactDOM from "react-dom";
import ParkingControlView from './components/parking-control';

window.parking = {
    busyByHandicapped: () => localStorage['parking.getBusyHandicappedSlots'],
    busyBySedan: () => localStorage['parking.getBusySedanSlots'],
    busyByTruck: () => localStorage['parking.getBusyTruckSlots'],
    getBusySlots: () => localStorage['parking.getBusySlots'],
    freeHandicapped: () => localStorage['parking.getFreeHandicappedSlots'],
    freeSedan: () => localStorage['parking.getFreeSedanSlots'],
    freeTruck: () => localStorage['parking.getFreeTruckSlots'],
    getFreeSlots: () => localStorage['parking.getFreeSlots']
};

ReactDOM.render(
    <ParkingControlView carSeats={30} />,
    document.getElementById('container')
);