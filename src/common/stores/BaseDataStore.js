import { decorate, observable, action } from 'mobx';
import _ from 'lodash';

class BaseDataStore {
    data = [];

    constructor(moduleStore, data) {
        if (!data) {
            throw new Error("You need to pass data into BaseDataStore");
        }

        this.moduleStore = moduleStore;
        this.data = data;
    }

    find(searchString, page = 1, rpp = 10, orderBy, orderDirection) {
        let workData = _.cloneDeep(this.data);

        if (searchString != null && searchString !== '') {
            const loweredSearchString = searchString.toLowerCase();
            workData = workData.filter(model => model.name.toLowerCase().indexOf(loweredSearchString) > -1 || model.abrv.toLowerCase().indexOf(loweredSearchString) > -1);
        }

        let totalRecords = workData.length;

        // sort
        workData = _.orderBy(workData, [orderBy], [orderDirection]);

        // page
        workData = _(workData).drop((page - 1) * rpp).take(rpp).value();

        return {
            totalRecords: totalRecords,
            page: page,
            rpp: rpp,
            searchString: searchString,
            orderBy: orderBy,
            orderDirection: orderDirection,
            items: workData
        };
    }

    get(id) {
        return this.getPredicate(item => item.id === id);
    }

    getPredicate(predicate) {
        return this.data.find(predicate);
    }

    create(model) {
        const lastId = this.data.length > 0 ? _.maxBy(this.data, item => item.id).id : 0;

        model.id = lastId + 1;
        model.abrv = model.name.toLowerCase().replace(" ", "-").trim();

        this.data.push(model);
    }

    update(model) {
        const elemIdx = this.data.findIndex(item => item.id === model.id);

        if (elemIdx === -1) {
            return false;
        }

        this.data[elemIdx].name = model.name;

        return true;
    }

    delete(id) {
        const elem = this.data.find(e => e.id === id);

        let removed = false;
        if (elem) {
            removed = this.data.remove(elem); // will be true if item is removed
        }

        return removed;
    }
}

export default decorate(BaseDataStore, {
    data: observable,
    create: action.bound,
    update: action.bound,
    delete: action.bound,
});