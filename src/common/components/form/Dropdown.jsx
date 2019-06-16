import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'mobx-react-form';
import { defaultTemplate } from '../../hoc';

class Dropdown extends React.Component {
    renderDropdownOptions() {
        const { field, options, dataKey, textKey } = this.props;

        if (options.length === 0) {
            return (
                <option disabled selected>No data.</option>
            )
        }

        return (
            <React.Fragment>
                <option disabled selected>{field.placeholder}</option>
                {options.map(o =>
                    <option value={o[dataKey]}>{o[textKey]}</option>
                )}
            </React.Fragment>
        );
    }

    render() {
        const { field } = this.props;
        return (
            <React.Fragment>
                <label htmlFor={field}>
                    {field.label}
                </label>
                <select {...field.bind()}>
                    {this.renderDropdownOptions()}
                </select>
                {field.error && <p>{field.error}</p>}
            </React.Fragment>
        );
    }
}

Dropdown.propTypes = {
    field: PropTypes.instanceOf(Field).isRequired,
    options: PropTypes.array,
    dataKey: PropTypes.string,
    textKey: PropTypes.string
};

Dropdown.defaultProps = {
    dataKey: 'id',
    textKey: 'name'
};

export default defaultTemplate(Dropdown);