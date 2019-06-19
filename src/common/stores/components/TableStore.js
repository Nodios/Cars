import _ from 'lodash';
import { decorate, observable, action, computed } from 'mobx';
import { mapColumns } from './utils';

class TableStore {
    config = {
        actions: null,
        pager: null,
        fetchFn: (filter) => { }
    };

    // populate this with additional filters
    filter = {
    };

    columns = [];
    data = [];
    searchString = "";
    sortColumn = 'id';
    sortDirection = 'asc';
    page = 1;
    _rpp = 10;
    totalItems = 0;

    constructor(config = {}) {
        if (!config.columns) {
            throw new Error("Please provide columns")
        }

        const { columns, ...cfg } = config;

        this.columns = mapColumns(columns);
        _.merge(this.config, cfg);

        this.onFilter({ orderBy: this.sortColumn, orderDirection: this.sortDirection });
    }

    get rpp() {
        if(this.config.pager != null && this.config.pager.rppOptions) {
            if(!this.config.pager.rppOptions.includes(this._rpp)) {
                return this.config.pager.rppOptions[0];
            }
            return this._rpp;
        }
        else {
            return this._rpp;
        }
    }

    onFilter(filter = {}) {
        const response = this.config.fetchFn(filter);

        this.totalItems = response.totalRecords;
        this.data = response.items;
    }

    onSortChange(sortChangeObj) {
        const { event, column, sortDir } = sortChangeObj;
        event.preventDefault();

        // new sort column, set default sort
        if (this.sortColumn !== column) {
            this.sortDirection = 'desc';
        }
        else {
            this.sortDirection = this.calculateSortDirection(sortDir);
        }

        this.sortColumn = column;

        this.onApplyFilter(event);
    }

    onSearchChange(searchObj) {
        const { event, value } = searchObj;
        event.preventDefault();

        this.searchString = value;
    }

    onFilterChange(searchObj) {
        const { event, filterKey, value } = searchObj;

        this.filter[filterKey] = value;
    }

    onApplyFilter(event) {
        event.preventDefault();

        this.onFilter({
            searchString: this.searchString,
            orderBy: this.sortColumn,
            orderDirection: this.sortDirection,
            page: this.page,
            rpp: this.rpp,
            filter: this.filter
        });
    }

    onClearFilter(event) {
        this.searchString = "";
        this.filter = {};

        this.onApplyFilter(event);
    }

    onPageChange(pageChangeObj) {
        const { event, page } = pageChangeObj;

        this.page = page;

        this.onApplyFilter(event);
    }

    onRppChange(rppChangeObj) {
        const {event, rpp} = rppChangeObj;

        this._rpp = +rpp;

        this.onApplyFilter(event);
    }

    calculateSortDirection(sortDirection) {
        // you can expand this to three state sort order
        if (sortDirection === 'asc') {
            return 'desc';
        }
        else {
            return 'asc';
        }
    }


}

export default decorate(TableStore, {
    totalItems: observable,
    columns: observable,
    data: observable,
    filter: observable,
    searchString: observable,
    sortColumn: observable,
    sortDirection: observable,
    page: observable,
    _rpp: observable,
    rpp: computed,
    onFilter: action.bound,
    onSortChange: action.bound,
    onSearchChange: action.bound,
    onFilterChange: action.bound,
    onApplyFilter: action.bound,
    onClearFilter: action.bound,
    onPageChange: action.bound,
    onRppChange: action.bound
});