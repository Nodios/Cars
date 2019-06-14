import React from 'react';
import {MainLayout} from '../../layouts';
import { defaultTemplate } from '../../common/hoc';
import { useStore } from '../../common/utils';
import { VehicleModelEditViewStore } from '../stores';

import {VehicleModelFormBackNavigation} from '../components';

class VehicleModelEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSubmitButton(isEdit) {
        let buttonLabel = 'Create';
        if (isEdit) {
            buttonLabel = 'Save'
        }

        return <button type="submit">{buttonLabel}</button>
    }

    render() {
        const { form, vehicleMakes, isEdit, rootStore: {goTo} } = this.props.editViewStore;
        return (
            <MainLayout navigationRenderer={(props) => <VehicleModelFormBackNavigation {...props} />}>
                <form onSubmit={form.onSubmit}>
                    <label htmlFor={form.$('name')}>
                        {form.$('name').label}
                    </label>
                    <input {...form.$('name').bind()} />

                    <label htmlFor={form.$('makeId')}>
                        {form.$('makeId').label}
                    </label>
                    <select {...form.$('makeId').bind()}>
                        {vehicleMakes.map(vm =>
                            <option value={vm.id}>{vm.name}</option>
                        )}
                    </select>

                    {this.renderSubmitButton(isEdit)}
                    <button type="button" onClick={e => goTo('vehicleModels')}>Cancel</button>
                </form>
            </MainLayout>
        );
    }
}

export default useStore(rootStore => new VehicleModelEditViewStore(rootStore), 'editViewStore')(defaultTemplate(VehicleModelEdit));