import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultTemplate } from '../../hoc';
import { TableStore } from '../../stores/components';

class TableFilterComponent extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        const { value, name } = event.target;
        const {onSearchChange, onFilterChange} = this.props.tableStore;

        const filterFn = name === 'name' ? onSearchChange : onFilterChange;

        filterFn({
                event: event,
                filterKey: name,
                value: value
        });
    };

    render() {
        const { searchString } = this.props.tableStore;

        return (
            <form onSubmit={this.props.tableStore.onApplyFilter}>
                <input type="text" name="name" placeholder="Search" value={searchString} onChange={this.onChange} />

                <div>
                    {this.props.children && React.cloneElement(this.props.children, { onChange: this.onChange })}
                </div>

                <button type="submit">Search</button>
                <button type="button" onClick={this.props.tableStore.onClearFilter}>Clear</button>
            </form>
        )
    }
}

TableFilterComponent.propTypes = {
    tableStore: PropTypes.instanceOf(TableStore).isRequired
};

export default defaultTemplate(TableFilterComponent);