import React, { Component } from 'react';
import './App.css';

import {RouterShell} from './common/router';

import {Home} from './home/pages';
import {NotFound} from './not-found/pages';
import { VehicleModelList } from './vehicle-model/pages';
import { VehicleMakeList } from './vehicle-make/pages';

const viewMap = {
  vehicleModels: <VehicleModelList />,
  vehicleMakes: <VehicleMakeList />,
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
