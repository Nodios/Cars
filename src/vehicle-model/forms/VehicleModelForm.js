import {BaseForm} from "../../common/forms";

const formFields = {
    name: {
        label: 'Name',
        placeholer: 'Enter name',
        type: 'text',
        rules: 'required'
    },
    makeId: {
        label: 'Make',
        placeholer: 'Select make',
        type: 'number',
        rules: 'required'
    }
}

class VehicleModelForm extends BaseForm {
    constructor(hooks) {
        super(formFields, hooks)
    }
}

export default VehicleModelForm;