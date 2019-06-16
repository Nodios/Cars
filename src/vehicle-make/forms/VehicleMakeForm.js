import { BaseForm } from "../../common/forms";

const fields = ['name'];
const labels = {
    name: 'Name'
};
const placeholders = {
    name: 'Enter name'
};

const rules = {
    name: 'required'
}

class VehicleMakeForm extends BaseForm {
    constructor(values, hooks) {
        super({fields, labels, placeholders, rules, values}, {hooks});
    }
}

export default VehicleMakeForm;