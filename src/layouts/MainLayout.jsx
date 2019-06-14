import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Header} from '../common/components'

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header navigationRenderer={this.props.navigationRenderer} />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

MainLayout.propTypes = {
    navigationRenderer: PropTypes.any
}

export default MainLayout;