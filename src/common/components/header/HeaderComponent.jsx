import React from 'react';
import { inject } from 'mobx-react';
import style from './HeaderComponent.module.css';

class HeaderComponent extends React.Component {
    render() {
        const { goTo, navigationRenderer } = this.props;

        if(navigationRenderer) return navigationRenderer({goTo});

        return (
            <div className={style.header}>
                <button className={style.link} onClick={e => goTo('home')}>Home</button>
                <button className={style.link} onClick={e => goTo('vehicleModels')}>Models</button>
                <button className={style.link} onClick={e => goTo('vehicleMakes')}>Make</button>
            </div>
        )
    }
}

export default inject(i => ({
    goTo: i.rootStore.goTo
}))(HeaderComponent);