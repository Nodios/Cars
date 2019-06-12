import React, { Component } from 'react';
import {inject} from 'mobx-react';

import logo from '../../logo.svg';

class Home extends Component {
    render() {
        const { goTo } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                <a className="App-link" onClick={e => goTo('home')}>Home</a>
                <a className="App-link" onClick={e => goTo('vehicleModels')}>Models</a>
                <a className="App-link" onClick={e => goTo('vehicleMakes')}>Make</a>
                </header>
            </div>
        )
    }
}

export default inject(i => ({
    goTo: i.rootStore.goTo
}))(Home);