export default class Car {
    constructor(props) {
        this.type = props.type;
    }

    getCarType() {
        return this.type;
    }
};