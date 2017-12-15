import inputField from './messengerView__inputField.pug';
import Block from '../../../blocks/block/block';

export default new class InputField {
	constructor() {
		const templatePug = inputField;
		const templateText = templatePug();
		this.fields = Block.create('div', {}, ['messengerView__inputField',
			'messengerView__inputField__container']);
		this.fields.el.innerHTML = templateText;
	};
}

