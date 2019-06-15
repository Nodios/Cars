import { BaseForm } from "../../common/forms";

const fields = ['name'];
const labels = {
    name: 'Name'
};
const placeholders = {
    name: 'Enter name'
};

class VehicleMakeForm extends BaseForm {
    constructor(values, hooks) {
        super({fields, labels, placeholders, values}, {hooks});
    }
}

export default VehicleMakeForm;