import { VehicleMakeForm } from '../forms';
import { decorate, computed, action } from 'mobx';
import _ from 'lodash';

class VehicleMakeEditViewStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.vehicleMakeStore = rootStore.vehicleMakeModuleStore.vehicleMakeStore;
        this.id = +rootStore.routerStore.routerStore.routerState.params.id;

        if (isNaN(this.id)) {
            rootStore.goTo('vehicleMakeCreate');
        }

        let vehicleMake = this.isEdit ? this.vehicleMakeStore.get(this.id) : null;

        if (this.isEdit && !vehicleMake) {
            rootStore.goTo('vehicleMakeCreate');
        }

        this.form = new VehicleMakeForm(vehicleMake, {
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
            this.vehicleMakeStore.create(formModel);
            this.rootStore.notificationService.success("Successfully created new make - " + formModel.name);
        }
        else {
            this.vehicleMakeStore.update(formModel);
            this.rootStore.notificationService.success("Successfully updated make - " + formModel.name);
        }

        this.rootStore.goTo('vehicleMakes')
    }

    onError(form) {
        const formModel = form.values();
        if (this.isEdit) {
            this.rootStore.notificationService.error("Could not update make - " + formModel.name);
        }
        else {
            this.rootStore.notificationService.error("Could not create new make.");
        }
    }
}

export default decorate(VehicleMakeEditViewStore, {
    onSuccess: action.bound,
    onError: action.bound,
    isEdit: computed
});