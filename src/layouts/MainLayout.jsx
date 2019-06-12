import React, { Component, Fragment } from 'react';
import {Header} from '../common/components'

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default MainLayout;