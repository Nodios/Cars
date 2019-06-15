import React from 'react';

const VehicleMakeListNavigation = function ({ goTo }) {
    return (
        <div>
            <button onClick={e => goTo('home')}>Home</button>
            <button onClick={e => goTo('vehicleModels')}>Models</button>

            <button onClick={e => goTo('vehicleMakeCreate')}>Create new</button>
        </div>
    )
}

export default VehicleMakeListNavigation;