import React from 'react';

const VehicleMakeFormNavigation = function ({ goTo }) {
    return (
        <div>
            <button onClick={e => goTo('vehicleMakes')}>Back</button>
        </div>
    )
}

export default VehicleMakeFormNavigation;