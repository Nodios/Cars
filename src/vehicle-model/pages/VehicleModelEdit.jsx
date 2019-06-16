import React from 'react';
import { MainLayout } from '../../layouts';
import { defaultTemplate } from '../../common/hoc';
import { useStore } from '../../common/utils';
import { Input, Dropdown } from '../../common/components';
import { VehicleModelEditViewStore } from '../stores';

import { VehicleModelFormNavigation } from '../components';

class VehicleModelEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSubmitButton() {
        const { isEdit } = this.props.editViewStore;
        let buttonLabel = 'Create';
        if (isEdit) {
            buttonLabel = 'Save'
        }

        return <button type="submit">{buttonLabel}</button>
    }

    render() {
        const { form, vehicleMakes, rootStore: { goTo } } = this.props.editViewStore;
        return (
            <MainLayout navigationRenderer={(props) => <VehicleModelFormNavigation {...props} />}>
                <form onSubmit={form.onSubmit}>
                    <Input field={form.$('name')} />

                    <Dropdown field={form.$('makeId')} options={vehicleMakes} />

                    {this.renderSubmitButton()}
                    <button type="button" onClick={e => goTo('vehicleModels')}>Cancel</button>
                </form>
            </MainLayout>
        );
    }
}

export default useStore(rootStore => new VehicleModelEditViewStore(rootStore), 'editViewStore')(defaultTemplate(VehicleModelEdit));