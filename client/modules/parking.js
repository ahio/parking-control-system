export default class ParkingControl {
    constructor(name, types) {
        this.name = name;
        this.cars = [];
        this._initCarTypes(types);
    }

    _initCarTypes(types) {
        this.carSeats = {};
        for (let type in types) {
            this.carSeats[type] = Number(types[type]) || 0;
        }
    }

    getCarsTypes() {
        return Object.keys(this.carSeats);
    }

    addCar({id, type}) {
        const availableSeats = this.carSeats[type];

        if (!availableSeats) {
            alert(`There no more free seats for ${type} cars`);
            return false;
        }

        this.cars.push({id, type});
        this.carSeats[type] = availableSeats - 1;
    }

    availableSeats(type) {
        return type ? this.carSeats[type] : this.carSeats;
    }
};