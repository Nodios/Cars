import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Header} from '../common/components'

import style from './styles/MainLayout.module.css';

class MainLayout extends Component {
    render() {
        return (
            <div className={style.container}>
                <Header navigationRenderer={this.props.navigationRenderer} />
                <div className={style.pageContainer}>
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