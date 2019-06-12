import React from 'react';
import { defaultTemplate } from '../../common/hoc';
import { useStore } from '../../common/utils';
import { VehicleModelEditViewStore } from '../stores';

class VehicleModelEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSubmitButton(isEdit) {
        let buttonLabel = 'Create';
        if (isEdit) {
            buttonLabel = 'Edit'
        }

        return <button type="submit">{buttonLabel}</button>
    }

    render() {
        const { form, vehicleMakes, isEdit } = this.props.editViewStore;
        return (
            <div>
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
                </form>
            </div>
        );
    }
}

export default useStore(rootStore => new VehicleModelEditViewStore(rootStore), 'editViewStore')(defaultTemplate(VehicleModelEdit));