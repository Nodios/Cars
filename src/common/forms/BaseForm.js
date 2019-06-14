import { Form as MobxForm } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs';

class BaseForm extends MobxForm {
    constructor(configuration, options) {
        super(configuration, options);
    }

    plugins() {
        return {
            dvr: dvr(validatorjs)
        };
    }
}

export default BaseForm;