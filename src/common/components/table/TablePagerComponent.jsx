import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from '../../hoc';

class TablePagerComponent extends Component {
    constructor(props) {
        super(props);
    }

    onPageChange(pageChangeObj) {
        const { event, page } = pageChangeObj;
        event.preventDefault();

        this.props.onChange({ event, page });
    }

    renderPreviousPage() {
        const page = this.props.page;
        const previousPage = page - 1;

        if (page === 1) return null;

        return <li key="previous-page" onClick={e => this.onPageChange({ event: e, page: previousPage })}>
            <button>◄◄</button>
        </li>
    }

    renderNextPage() {
        const { page, rpp, totalItems } = this.props;
        const nextPage = page + 1;

        const totalPages = Math.ceil(totalItems / rpp);
        if (page === totalPages) return null;

        return <li key="next-page" onClick={e => this.onPageChange({ event: e, page: nextPage })}>
            <button>►►</button>
        </li>
    }

    buildPages() {
        const { rpp, totalItems } = this.props;
        let pages = [];

        pages.push(this.renderPreviousPage());

        const totalPages = Math.ceil(totalItems / rpp);
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={(this.props.page === i ? 'active' : '')} onClick={e => this.onPageChange({ event: e, page: i })}>{i}</li>
            );
        }

        pages.push(this.renderNextPage());

        return pages;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.buildPages()}
                </ul>
            </div>
        )
    }
}

TablePagerComponent.propTypes = {
    page: PropTypes.number,
    rpp: PropTypes.number,
    totalItems: PropTypes.number,
    onChange: PropTypes.func
};

TablePagerComponent.defaultProps = {
    page: 1,
    rpp: 10,
    totalItems: 0,
    onChange: () => { }
};

export default defaultTemplate(TablePagerComponent);