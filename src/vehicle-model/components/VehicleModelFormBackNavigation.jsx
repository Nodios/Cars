import React from 'react';

const VehicleModelFormBackNavigation = function ({ goTo }) {
    return (
        <div>
            <button onClick={e => goTo('vehicleModels')}>Back</button>
        </div>
    )
}

export default VehicleModelFormBackNavigation;