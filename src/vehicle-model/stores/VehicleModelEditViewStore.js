import { VehicleModelForm } from '../forms';

class VehicleModelEditViewStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        this.form = new VehicleModelForm({
            onSuccess: (form) => { },
            onError: (form) => { }
        });
    }
}

export default VehicleModelEditViewStore;