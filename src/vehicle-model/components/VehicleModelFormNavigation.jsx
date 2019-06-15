import React from 'react';

const VehicleModelFormNavigation = function ({ goTo }) {
    return (
        <div>
            <button onClick={e => goTo('vehicleModels')}>Back</button>
        </div>
    )
}

export default VehicleModelFormNavigation;