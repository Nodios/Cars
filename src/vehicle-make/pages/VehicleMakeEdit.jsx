import React from 'react';
import { MainLayout } from '../../layouts';
import { defaultTemplate } from '../../common/hoc';
import { useStore } from '../../common/utils';
import { VehicleMakeEditViewStore } from '../stores';

import {VehicleMakeFormNavigation} from '../components';

class VehicleMakeEdit extends React.Component {
    renderSubmitButton() {
        const {isEdit} = this.props.editViewStore;
        let buttonLabel = 'Create';
        if (isEdit) {
            buttonLabel = 'Save'
        }

        return <button type="submit">{buttonLabel}</button>
    }

    render() {
        const { form, rootStore: { goTo } } = this.props.editViewStore;
        return (
            <MainLayout navigationRenderer={(props) => <VehicleMakeFormNavigation {...props} />}>
                <form onSubmit={form.onSubmit}>
                    <label htmlFor={form.$('name')}>
                        {form.$('name').label}
                    </label>
                    <input {...form.$('name').bind()} />

                    {this.renderSubmitButton()}
                    <button type="button" onClick={e => goTo('vehicleModels')}>Cancel</button>
                </form>
            </MainLayout>
        );
    }
}

export default useStore(rootStore => new VehicleMakeEditViewStore(rootStore), 'editViewStore')(defaultTemplate(VehicleMakeEdit));