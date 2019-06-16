import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { defaultTemplate } from '../../hoc';
import { TableStore } from '../../stores/components';

import TablePager from './TablePagerComponent';
import TableEmptyState from './TableEmptyStateComponent';

const SORT_ARROWS = {
    NEUTRAL: '',
    ASC: '↑',
    DESC: '↓'
}

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeader() {
        const { columns, onSortChange, sortDirection, sortColumn, config: {actions} } = this.props.tableStore;
        const colHeaders = columns.map(i => ({ header: i.header, key: i.key, orderKey: i.orderKey })).filter(i => i);

        function renderSortDirectionArrow(sortDir) {
            let arrow;
            switch (sortDir) {
                case 'asc':
                    arrow = SORT_ARROWS.ASC;
                    break;
                case 'desc':
                    arrow = SORT_ARROWS.DESC;
                    break;
                default:
                    arrow = SORT_ARROWS.NEUTRAL;
                    break;
            }

            return (<span>{arrow}</span>);
        }

        return (
            <tr>
                {colHeaders.map((ch, i) =>
                    <th key={i} onClick={e => onSortChange({ event: e, column: ch.orderKey, sortDir: sortDirection })}>
                        {ch.header}
                        {sortColumn === ch.orderKey && renderSortDirectionArrow(sortDirection)}
                    </th>
                )}
                {(this.props.actionComponent || actions) && <th>Actions</th>}
            </tr>
        );
    }

    renderActionsComponent(datum) {
        const {actionComponent, tableStore: {config: {actions}}} = this.props;

        if(actionComponent) {
            return <td>{React.cloneElement(actionComponent, datum)}</td>
        }

        if(!actions) return null;
        if(!actions.onEdit && !actions.onDelete) return null;

        return (
            <td>
                {actions.onEdit && <button type="button" onClick={e => actions.onEdit({event: e, datum: datum})} title="Edit">✎</button>}
                {actions.onDelete && <button type="button" onClick={e => actions.onDelete({event: e, datum: datum})} title="Delete">✖</button>}
            </td>
        )
    }

    renderBody() {
        const { columns, data } = this.props.tableStore;
        const colKeys = columns.map(i => i.key).filter(i => i);

        if(data.length === 0) {
            return <TableEmptyState />
        }

        return data.map((datum, datumIdx) =>
            <tr key={datumIdx}>
                {colKeys.map((ck, ckIdx) =>
                    <td key={'d' + datumIdx + 'c' + ckIdx}>{_.get(datum, ck)}</td>
                )}
                {this.renderActionsComponent(datum)}
            </tr>
        )
    }

    renderPager() {
        const {paging, tableStore} = this.props;

        // paging disabled
        if(!paging) return null;

        return <TablePager page={tableStore.page} rpp={tableStore.rpp} totalItems={tableStore.totalItems} onChange={tableStore.onPageChange} />;
    }

    render() {

        return (
            <React.Fragment>
                <table>
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                </table>
                {this.renderPager()}
            </React.Fragment>
        );
    }
}

TableComponent.propTypes = {
    tableStore: PropTypes.instanceOf(TableStore).isRequired,
    actionComponent: PropTypes.element,
    paging: PropTypes.bool
}

export default defaultTemplate(TableComponent);