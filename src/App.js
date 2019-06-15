import React, { Component } from 'react';
import './App.css';

import {RouterShell} from './common/router';

import {Home} from './home/pages';
import {NotFound} from './not-found/pages';
import { VehicleModelList, VehicleModelEdit  } from './vehicle-model/pages';
import { VehicleMakeList, VehicleMakeEdit } from './vehicle-make/pages';

const viewMap = {
  vehicleModels: <VehicleModelList />,
  vehicleModelCreate: <VehicleModelEdit />,
  vehicleModelEdit: <VehicleModelEdit />,
  vehicleMakes: <VehicleMakeList />,
  vehicleMakeCreate: <VehicleMakeEdit />,
  vehicleMakeEdit: <VehicleMakeEdit />,
  home: <Home />,
  notFound: <NotFound />
};

class App extends Component {
  render() {
    return (
      <div>
        <RouterShell viewMap={viewMap} />
      </div>
    );
  }
}

export default App;
