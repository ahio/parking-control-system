export default class Car {
    constructor(props) {
        this.type = props.type;
        this.id = Math.random().toFixed(5).toString().slice(2);
    }

    getCarType() {
        return this.type;
    }
};