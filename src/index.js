import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';

import './index.css';
import App from './App';

import {RootStore} from './common/stores';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <App />
    </Provider>
    , document.getElementById('root'));
