import { decorate, action } from 'mobx';
import { TableStore } from '../../common/stores/components';

class VehicleMakeListViewStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
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
                }
            ],
            actions: {
                onEdit: this.onEdit,
                onDelete: this.onDelete
            },
            fetchFn: (filter) => {
                const { searchString, page, rpp, orderBy, orderDirection } = filter;
                const items = this.vehicleMakeStore.find(searchString, page, rpp, orderBy, orderDirection);

                return items;
            }
        })
    }

    onEdit({ event, datum }) {
        event.preventDefault();

        this.rootStore.goTo('vehicleMakeEdit', {id: datum.id});
    }

    onDelete({ event, datum }) {
        event.preventDefault();
        const result = this.vehicleMakeStore.delete(datum.id);
        if (result) {
            this.rootStore.notificationService.success("Successfully deleted " + datum.name);
        } else {
            this.rootStore.notificationService.error("Could not delete " + datum.name);
        }

        this.tableStore.onFilter();
    }
}

export default decorate(VehicleMakeListViewStore, {
    onEdit: action.bound,
    onDelete: action.bound
});