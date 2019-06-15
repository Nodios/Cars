import { VehicleModelForm } from '../forms';
import { decorate, computed, action, observable } from 'mobx';
import _ from 'lodash';

class VehicleModelEditViewStore {
    get vehicleMakes() {
        return this.vehicleMakeStore.find('', 1, 100, 'name', 'desc').items;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.vehicleModelStore = rootStore.vehicleModelModuleStore.vehicleModelStore;
        this.vehicleMakeStore = rootStore.vehicleMakeModuleStore.vehicleMakeStore;

        this.id = +rootStore.routerStore.routerStore.routerState.params.id;

        // invalid id - navigate to create
        if (isNaN(this.id)) {
            rootStore.goTo('vehicleModelCreate')
        }

        let vehicleModel = this.isEdit ? this.vehicleModelStore.get(this.id) : null

        // valid id, but not existing data - navigate to create
        if (this.isEdit && !vehicleModel) {
            rootStore.goTo('vehicleModelCreate')
        }

        this.form = new VehicleModelForm(vehicleModel, {
            onSuccess: this.onSuccess,
            onError: this.onError
        });
    }

    get isEdit() {
        return !!this.id && !isNaN(this.id);
    }

    onSuccess(form) {
        const formModel = form.values();
        if (!this.isEdit) {
            this.vehicleModelStore.create(formModel);
            this.rootStore.notificationService.success("Successfully created new model - " + formModel.name);
        }
        else {
            this.vehicleModelStore.update(formModel);
            this.rootStore.notificationService.success("Successfully updated model - " + formModel.name);
        }

        this.rootStore.goTo('vehicleModels')
    }

    onError(form) {
        const formModel = form.values();
        if (this.isEdit) {
            this.rootStore.notificationService.error("Could not update model - " + formModel.name);
        }
        else {
            this.rootStore.notificationService.error("Could not create new model.");
        }
    }
}

export default decorate(VehicleModelEditViewStore, {
    onSuccess: action.bound,
    onError: action.bound,
    vehicleMakes: computed,
    isEdit: computed
});