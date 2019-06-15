import { action, computed, decorate } from 'mobx';
import { RouterStore } from '../router';
import { VehicleModelModuleStore } from '../../vehicle-model/stores';
import { VehicleMakeModuleStore } from '../../vehicle-make/stores';
import { NotificationService } from '../notifications';

class RootStore {
    constructor() {
        this.routerStore = new RouterStore(this);
        this.notificationService = new NotificationService();

        this.vehicleMakeModuleStore = new VehicleMakeModuleStore(this);
        this.vehicleModelModuleStore = new VehicleModelModuleStore(this);
    }

    goTo(routeName, params, queryParams) {
        this.routerStore.goTo(routeName, params, queryParams);
    }
}

export default decorate(RootStore, {
    goTo: action.bound
});