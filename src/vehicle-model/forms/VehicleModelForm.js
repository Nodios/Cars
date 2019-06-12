import {BaseForm} from "../../common/forms";

const formFields = {
    name: {
        label: 'Name',
        type: 'text',
        rules: 'required'
    },
    makeId: {
        label: 'Make',
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