import React from 'react';
import { inject } from 'mobx-react';

class HeaderComponent extends React.Component {
    render() {
        const { goTo, navigationRenderer } = this.props;

        if(navigationRenderer) return navigationRenderer({goTo});

        return (
            <div>
                <button onClick={e => goTo('home')}>Home</button>
                <button onClick={e => goTo('vehicleModels')}>Models</button>
                <button onClick={e => goTo('vehicleMakes')}>Make</button>
            </div>
        )
    }
}

export default inject(i => ({
    goTo: i.rootStore.goTo
}))(HeaderComponent);