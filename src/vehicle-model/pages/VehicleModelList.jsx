import React, { Component } from 'react';
import { defaultTemplate } from '../../common/hoc'
import { useStore } from '../../common/utils'

import { MainLayout } from '../../layouts';
import { VehicleModelListViewStore } from '../stores';
import { Table, TableFilter } from '../../common/components';

import { VehicleModelListNavigation } from '../components';

class VehicleModelList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tableStore, onCreate } = this.props.viewStore;

        return (
            <MainLayout navigationRenderer={(props) => <VehicleModelListNavigation {...props} />}>
                <TableFilter tableStore={tableStore}>

                </TableFilter>
                <Table tableStore={tableStore} paging />
            </MainLayout>
        );
    }
}

export default useStore(rootStore => new VehicleModelListViewStore(rootStore))(defaultTemplate(VehicleModelList));