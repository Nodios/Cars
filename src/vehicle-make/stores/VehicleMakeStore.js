import _ from 'lodash';

import BaseDataStore from '../../common/stores/BaseDataStore';

const data = [
    { id: 1, name: 'Ford', abrv: 'ford' },
    { id: 2, name: 'Škoda', abrv: 'skoda' },
    { id: 3, name: 'VolksWagen', abrv: 'vw' },
    { id: 4, name: 'Audi', abrv: 'audi' },
];


class VehicleMakeStore extends BaseDataStore {
    constructor(moduleStore) {
        super(moduleStore, data);
    }
}

export default VehicleMakeStore;
