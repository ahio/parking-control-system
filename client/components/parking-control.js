import React from "react";
import ParkingControl from '../modules/parking';
import Car from '../modules/car';

export default class ParkingControlView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };

        this.handleAddCarClick = this._handleAddCarClick.bind(this);
    }

    _handleAddCarClick(event, type) {
        event.preventDefault();
    }

    render() {
        console.log(this.state.cars);
        return (
            <div>
                initial parking system
            </div>
        );
    }
}