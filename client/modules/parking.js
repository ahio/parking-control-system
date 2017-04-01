export default class ParkingControl {
    constructor(name, types) {
        this.name = name;
        this.cars = [];
        this._initParkingSlots(types);
    }

    _initParkingSlots(types) {
        this.parkingSlots = [];
        this.carsTypes = [];
        for (let slot in types) {
            this.carsTypes.push(slot);
            const slotsCount = Number(types[slot]) || 0;
            for (let i = 0; i < slotsCount; i++) {
                this.parkingSlots.push({type: slot, id: Math.random().toFixed(6).toString().slice(2), available: true})
            }
        }
    }

    getCarsTypes() {
        return this.carsTypes;
    }

    addCar({id, type}) {
        const slot = this._checkForFreeSlot(type);

        if (!slot) {
            alert(`There no more free seats for ${type} cars`);
            return false;
        }

        this.cars.push({id, type, parkingSlotId: slot.id});
        this.parkingSlots = this.parkingSlots.map((s) => {
            if (s.id === slot.id)
                s.available = false;

            return s;
        });

        this._updateAvailableSlots();
        return slot.id;
    }

    availableSeats(type) {
        return type ? this.parkingSlots[type] : this.parkingSlots;
    }

    _checkForFreeSlot(type) {
        return this.parkingSlots.filter((slot) => {
            if (slot.available) {
                if (type === 'sedan') {
                    return slot.type === 'sedan' || slot.type === 'truck';
                } else if (type === 'truck') {
                    return slot.type === 'truck'
                } else {
                    return true;
                }
            }

            return false;
        })[0];
    }

    _updateAvailableSlots() {
        const slots = {
            getFreeSlots: 0,
            getFreeSedanSlots: 0,
            getFreeTruckSlots: 0,
            getFreeHandicappedSlots: 0,
            getBusySlots: 0,
            getBusySedanSlots: 0,
            getBusyTruckSlots: 0,
            getBusyHandicappedSlots: 0
        };

        this.parkingSlots.forEach((s) => {
            slots[s.available ? 'getFreeSlots' : 'getBusySlots'] += 1;

            if (s.type === 'sedan') {
                slots[s.available ? 'getFreeSedanSlots' : 'getBusySedanSlots'] += 1;
            } else if(s.type === 'truck') {
                slots[s.available ? 'getFreeTruckSlots' : 'getBusyTruckSlots'] += 1;
            } else {
                slots[s.available ? 'getFreeHandicappedSlots' : 'getBusyHandicappedSlots'] += 1;
            }
        });

        for(let field in slots) {
            localStorage.setItem(`parking.${field}`, slots[field]);
        }
    }
};