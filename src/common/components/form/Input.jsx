import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'mobx-react-form';
import { defaultTemplate } from '../../hoc';

class Input extends React.Component {
    render() {
        const {field} = this.props;
        return (
            <React.Fragment>
                <label htmlFor={field}>
                    {field.label}
                </label>
                <input {...field.bind()} />
                {field.error && <p>{field.error}</p>}
            </React.Fragment>
        );
    }
}

Input.propTypes = {
    field: PropTypes.instanceOf(Field).isRequired
};

export default defaultTemplate(Input);