import _ from 'lodash';
import { decorate, observable, action, computed } from 'mobx';


class TableStore {
    config = {
        // onSortChange: (sortChangeObj) => { },
        actions: null,
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
    rpp = 10;
    totalItems = 0;

    constructor(config = {}) {
        if (!config.columns) {
            throw new Error("Please provide columns")
        }

        const { columns, ...cfg } = config;

        this.columns = columns;
        _.merge(this.config, cfg);

        this.defaultFetch({ orderBy: this.sortColumn, orderDirection: this.sortDirection });
    }

    defaultFetch(filter = {}) {
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
        const {event, value} = searchObj;
        event.preventDefault();

        this.searchString = value;
    }

    onFilterChange(searchObj) {
        const { event, filterKey, value } = searchObj;

        this.filter[filterKey] = value;
    }

    onApplyFilter(event) {
        event.preventDefault();

        this.defaultFetch({
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
        const {event, page} = pageChangeObj;

        this.page = page;

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
    rpp: observable,
    defaultFetch: action.bound,
    onSortChange: action.bound,
    onSearchChange: action.bound,
    onFilterChange: action.bound,
    onApplyFilter: action.bound,
    onClearFilter: action.bound,
    onPageChange: action.bound,
});