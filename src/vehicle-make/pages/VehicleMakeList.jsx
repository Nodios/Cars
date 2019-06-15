import React, { Component } from 'react';
import { defaultTemplate } from '../../common/hoc'
import { useStore } from '../../common/utils'

import { MainLayout } from '../../layouts';
import { VehicleMakeListViewStore } from '../stores';
import { Table, TableFilter } from '../../common/components';
import { VehicleMakeListNavigation } from '../components';

class VehicleMakeList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tableStore } = this.props.viewStore;

        return (
            <MainLayout navigationRenderer={(props) => <VehicleMakeListNavigation {...props} />}>
                <TableFilter tableStore={tableStore}>

                </TableFilter>
                <Table tableStore={tableStore} paging />
            </MainLayout>
        );
    }
}

export default useStore(rootStore => new VehicleMakeListViewStore(rootStore))(defaultTemplate(VehicleMakeList));