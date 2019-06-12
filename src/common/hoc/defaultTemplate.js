import {observer} from 'mobx-react';

export default function(Component) {
	return observer(Component);
}