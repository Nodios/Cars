import React from 'react';

import style from '../style/VehicleModelListNavigation.module.css';

const VehicleModelListNavigation = function ({ goTo }) {
    return (
        <div className={style.container}>
            <button className={style.link} onClick={e => goTo('home')}>Home</button>
            <button className={style.link} onClick={e => goTo('vehicleMakes')}>Make</button>
            <button className={style.link} onClick={e => goTo('vehicleModelCreate')}>Create new</button>
        </div>
    )
};

export default VehicleModelListNavigation;