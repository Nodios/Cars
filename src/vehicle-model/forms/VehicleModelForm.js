import {BaseForm} from "../../common/forms";

const fields = ['name', 'makeId'];
const labels = {
    name: 'Name',
    makeId: 'Make'
};
const placeholders = {
    name: 'Enter name',
    makeId: 'Select make'
};

class VehicleModelForm extends BaseForm {
    constructor(values, hooks) {
        super({fields, labels, placeholders, values}, {hooks})
    }
}

export default VehicleModelForm;