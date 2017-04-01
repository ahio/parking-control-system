export default class Car {
    constructor(props) {
        this.type = props.type;
        this.id = Math.random().toFixed(5).toString().slice(2);
        this.slotId = null;
    }

    getCarType() {
        return this.type;
    }

    setParkingSlot(slotId) {
        this.slotId = slotId;
    }
};