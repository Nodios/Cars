import {VehicleMakeStore} from './';

class VehicleMakeModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        this.vehicleMakeStore = new VehicleMakeStore(this);
    }
}

export default VehicleMakeModuleStore;