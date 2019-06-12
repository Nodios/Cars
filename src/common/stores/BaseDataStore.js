import { decorate, observable, action } from 'mobx';
import _ from 'lodash';

class BaseDataStore {
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
        const lastId = _.maxBy(this.data, item => item.id);

        model.id = lastId + 1;

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
        var elemIndex = this.data.findIndex(e => e.id === id);

        if (elemIndex > -1) {
            this.data.splice(elemIndex, 1);
        }
    }
}

export default decorate(BaseDataStore, {
    data: observable,
    create: action.bound,
    update: action.bound,
    delete: action.bound,
});