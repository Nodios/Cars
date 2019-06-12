import { decorate, observable, action } from 'mobx';
import _ from 'lodash';

import BaseDataStore from '../../common/stores/BaseDataStore';

const data = [
    { id: 1, name: 'Focus', abrv: 'focus', makeId: 1 },
    { id: 2, name: 'Focus ST', abrv: 'focus-st', makeId: 1 },
    { id: 3, name: 'Focus RS', abrv: 'focus-rs', makeId: 1 },
    { id: 4, name: 'C-Max', abrv: 'c-max', makeId: 1 },
    { id: 5, name: 'S-Max', abrv: 's-max', makeId: 1 },
    { id: 6, name: 'Fiesta', abrv: 'fiesta', makeId: 1 },
    { id: 7, name: 'Fiesta ST', abrv: 'fiesta-st', makeId: 1 },
    { id: 8, name: 'Octavia', abrv: 'octavia', makeId: 2 },
    { id: 9, name: 'Superb', abrv: 'superb', makeId: 2 },
    { id: 10, name: 'Golf', abrv: 'golf', makeId: 3 },
    { id: 11, name: 'Golf Plus', abrv: 'golf-plus', makeId: 3 },
    { id: 12, name: 'Arteon', abrv: 'arteon', makeId: 3 },
    { id: 13, name: 'Passat', abrv: 'passat', makeId: 3 },
    { id: 13, name: 'Polo', abrv: 'polo', makeId: 3 },
    { id: 15, name: 'Passat CC', abrv: 'passat-cc', makeId: 3 },
    { id: 16, name: 'A4', abrv: 'a4', makeId: 4 },
    { id: 17, name: 'A4', abrv: 'a4', makeId: 4 },
    { id: 18, name: 'A6', abrv: 'a6', makeId: 4 },
    { id: 19, name: 'A4 Avant', abrv: 'a4-avant', makeId: 4 },
    { id: 20, name: 'A6 Avant', abrv: 'a6-avant', makeId: 4 },
];

class VehicleModelStore extends BaseDataStore {
    constructor(moduleStore) {
        super(moduleStore, data);
    }

    // we must override this in order to be able to change makeId
    update(model) {
        const modelIdx = this.data.findIndex(item => item.id === model.id);

        if (modelIdx === -1) {
            return false;
        }

        this.data[modelIdx].name = model.name;
        this.data[modelIdx].makeId = model.makeId;

        return true;
    }
}

export default decorate(VehicleModelStore, {
    update: action.bound
});