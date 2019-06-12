import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { RouterView } from 'mobx-state-router';

class RouterShell extends React.Component {
    render() {
        return (
            <RouterView routerStore={this.props.routerStore.routerStore} viewMap={this.props.viewMap}></RouterView>
        );
    }
}

export default inject(i => ({
    routerStore: i.rootStore.routerStore
}))(RouterShell);