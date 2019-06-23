import React, {Component} from 'react';
import {inject} from 'mobx-react';

import logo from '../../logo.svg';
import style from '../styles/Home.module.css';

class Home extends Component {
    render() {
        const {goTo} = this.props;
        return (
            <div className={style.app}>
                <header className={style.header}>
                    <img src={logo} className={style.logo} alt="logo"/>
                    <div className={style.linkWrapper}>
                        <button className={style.link} onClick={e => goTo('home')}>Home</button>
                        <button className={style.link} onClick={e => goTo('vehicleModels')}>Models</button>
                        <button className={style.link} onClick={e => goTo('vehicleMakes')}>Make</button>
                    </div>
                </header>
            </div>
        )
    }
}

export default inject(i => ({
    goTo: i.rootStore.goTo
}))(Home);