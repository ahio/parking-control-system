export default class ParkingControl {
    constructor(name, types) {
        this.name = name;
        this.cars = [];
        this._initParkingSlots(types);
    }

    _initParkingSlots(types) {
        this.parkingSlots = [];
        this.slotTypes = {};
        for (let slot in types) {
            this.slotTypes[slot] = [];
            const slotsCount = Number(types[slot]) || 0;
            for (let i = 0; i < slotsCount; i++) {
                const id = Math.random().toFixed(6).toString().slice(2);
                this.parkingSlots.push({type: slot, id, available: true});
                this.slotTypes[slot].push(id);
            }
        }
    }

    getSlotTypes() {
        return Object.keys(this.slotTypes);
    }

    addCar({id, type}) {
        const slot = this._checkForFreeSlot(type);

        if (!slot) {
            alert(`There no more free seats for ${type} cars`);
            return false;
        }

        this.cars.push({id, type, parkingSlotId: slot.id});
        this.parkingSlots = this.parkingSlots.map((s) => {
            if (s.id === slot.id) {
                s.available = false;

                const slotIdIndex = this.slotTypes[type].indexOf(slot.id);
                this.slotTypes[type].splice(slotIdIndex, 1);
            }

            return s;
        });

        this._updateAvailableSlots();
        return slot.id;
    }

    availableSeats(type) {
        return type ? this.parkingSlots[type] : this.parkingSlots;
    }

    _checkForFreeSlot(type) {
        return this._checkSlotForType(type) || type === 'sedan' && this._checkSlotForType('truck') ||
            type === 'handicapped' && (this._checkSlotForType('sedan') || this._checkSlotForType('truck'));
    }

    _checkSlotForType(type) {
        return this.parkingSlots.filter((slot) => slot.available && type === slot.type)[0];
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