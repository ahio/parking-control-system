import React from "react";
import ParkingControl from '../modules/parking';
import Car from '../modules/car';
import {Button} from 'react-bootstrap';

const carTypes = {
    truck: 10,
    handicapped: 5,
    sedan: 15
};

export default class ParkingControlView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parking: null,
            cars: []
        };

        this.handleAddCarClick = this._handleAddCarClick.bind(this);
    }

    componentWillMount() {
        const parking = new ParkingControl("A", carTypes);
        this.setState({parking});
    }

    _handleAddCarClick(event, type) {
        event.preventDefault();

        const cars = this.state.cars.slice();
        const newCar = new Car({type});
        console.log('added car with type', newCar.getCarType());
        this.state.parking.addCar({id: newCar.id, type: newCar.type});
        cars.push(newCar);
        this.setState({cars});
    }

    render() {
        console.log(this.state.parking.availableSeats());
        const carTypes = this.state.parking.getCarsTypes();


        return (
            <div>
                <div>Add cars on parking</div>
                <div>
                    {carTypes.map((type, index) => {
                        return (
                            <span key={index}>
                                <Button onClick={(e) => this.handleAddCarClick(event, type)}>Add {type}</Button>
                            </span>
                            )
                    })}
                </div>
            </div>
        );
    }
}