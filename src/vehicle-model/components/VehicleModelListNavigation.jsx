import React from 'react';

const VehicleModelListNavigation = function ({ goTo }) {
    return (
        <div>
            <button onClick={e => goTo('home')}>Home</button>
            <button onClick={e => goTo('vehicleMakes')}>Make</button>
            
            <button onClick={e => goTo('vehicleModelCreate')}>Create new</button>
        </div>
    )
}

export default VehicleModelListNavigation;