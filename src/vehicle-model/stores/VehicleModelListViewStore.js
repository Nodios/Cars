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
                    key: 'make.name'
                }
            ],
            actions: {
                onEdit: this.onEdit,
                onDelete: this.onDelete
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
        })
    }

    onEdit({ event, datum }) {
        event.preventDefault();
    }

    onDelete({ event, datum }) {
        event.preventDefault();
        this.vehicleModelStore.delete(datum.id);
    }
}

export default decorate(VehicleModelListViewStore, {
    onEdit: action.bound,
    onDelete: action.bound
});