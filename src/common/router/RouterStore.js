import { RouterStore as MobxStateRouter, RouterState, HistoryAdapter } from 'mobx-state-router';
import {decorate, action} from 'mobx';
import {createBrowserHistory} from 'history';
import { routes } from './routes';

const history = createBrowserHistory();

const notFound = new RouterState('notFound');

class RouterStore {
    constructor(rootStore) {
        this.rootStore = rootStore;

        this.routerStore = new MobxStateRouter(this, routes, notFound, { routeName: 'home' })

        this.historyAdapter = new HistoryAdapter(this.routerStore, history);
        this.historyAdapter.observeRouterStateChanges();
    }

    goTo(route, params = {}, queryParams = {}) {
        this.routerStore.goTo(route, params, queryParams);
    }
}

export default decorate(RouterStore, {
    goTo: action.bound
});
