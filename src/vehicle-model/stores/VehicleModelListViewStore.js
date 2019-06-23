import { decorate, action } from 'mobx';
import { TableStore } from '../../common/stores/components';

class VehicleModelListViewStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.vehicleModelStore = rootStore.vehicleModelModuleStore.vehicleModelStore;
        this.vehicleMakeStore = rootStore.vehicleMakeModuleStore.vehicleMakeStore;

        this.tableStore = new TableStore({
            columns: [
                {
                    header: 'Id',
                    key: 'id'
                },
                {
                    header: 'Name',
                    key: 'name'
                },
                {
                    header: 'Abbreviation',
                    key: 'abrv'
                },
                {
                    header: 'Make',
                    key: 'make.name',
                    orderKey: 'makeId'
                }
            ],
            actions: {
                onEdit: this.onEdit,
                onDelete: this.onDelete
            },
            pager: {
                rppOptions: [5, 10, 15]
            },
            fetchFn: (filter) => {
                const { searchString, page, rpp, orderBy, orderDirection } = filter;
                const items = this.vehicleModelStore.find(searchString, page, rpp, orderBy, orderDirection);

                const mappedItems = items.items.map(i => {
                    return {
                        ...i,
                        make: this.vehicleMakeStore.get(i.makeId)
                    };
                });

                return {
                    ...items,
                    items: mappedItems
                };
            }
        });
    }

    onCreate(event) {
        event.preventDefault();

        this.rootStore.goTo('vehicleModelCreate');
    }

    onEdit({ event, datum }) {
        event.preventDefault();

        this.rootStore.goTo('vehicleModelEdit', {id: datum.id});
    }

    onDelete({ event, datum }) {
        event.preventDefault();
        const result = this.vehicleModelStore.delete(datum.id);
        if (result) {
            this.rootStore.notificationService.success("Successfully deleted " + datum.name);
        } else {
            this.rootStore.notificationService.error("Could not delete " + datum.name);
        }

        this.tableStore.onFilter();
    }
}

export default decorate(VehicleModelListViewStore, {
    onCreate: action.bound,
    onEdit: action.bound,
    onDelete: action.bound
});