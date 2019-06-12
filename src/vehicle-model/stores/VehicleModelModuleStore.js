import {VehicleModelStore} from './';

class VehicleModelModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;

		this.vehicleModelStore = new VehicleModelStore(this);
	}
}

export default VehicleModelModuleStore;