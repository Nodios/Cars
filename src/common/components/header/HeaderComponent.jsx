import React from 'react';
import { inject } from 'mobx-react';

class HeaderComponent extends React.Component {
    render() {
        const { goTo } = this.props;
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