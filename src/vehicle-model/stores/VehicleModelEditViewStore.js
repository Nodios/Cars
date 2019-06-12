import { VehicleModelForm } from '../forms';
import {decorate, computed, action, observable} from 'mobx';
import _ from 'lodash';

class VehicleModelEditViewStore {
    isEdit = false;

    get vehicleMakes() {
        return this.vehicleMakeStore.find('', 1, 100, 'name', 'desc').items;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.vehicleModelStore = rootStore.vehicleModelModuleStore.vehicleModelStore;
        this.vehicleMakeStore = rootStore.vehicleMakeModuleStore.vehicleMakeStore;

        this.form = new VehicleModelForm({
            onSuccess: this.onSuccess,
            onError: this.onError
        });

        this.isEdit = !_.isEmpty(rootStore.routerStore.routerStore.routerState.params) ? true : false;
    }

    onSuccess(form) {
        const formModel = form.values();
        if(this.isEdit) {
            this.vehicleModelStore.create(formModel);
        }
        else {
            this.vehicleModelStore.update(formModel);
        }
    }

    onError(form) {

    }
}

export default decorate(VehicleModelEditViewStore, {
    isEdit: observable,
    onSuccess: action.bound,
    onError: action.bound,
    vehicleMakes: computed
});