import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';

import { RootStore } from './common/stores';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <React.Fragment>
            <App />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                closeOnClick
                pauseOnVisibilityChange
                pauseOnHover
            />
        </React.Fragment>
    </Provider>
    , document.getElementById('root'));
