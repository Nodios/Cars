import { RouterStore as MobxStateRouter, RouterState, HistoryAdapter } from 'mobx-state-router';
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

        this.goTo = this.goTo.bind(this);
    }

    goTo(route, params = {}, queryParams = {}) {
        this.routerStore.goTo(route, params, queryParams);
    }
}

export default RouterStore;
