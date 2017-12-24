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


	getText() {
		const text = this.fields.el.getElementsByClassName('messengerView__inputField__form__input__text')[0];
		return text.value;
	}


	clear() {
		const text = this.fields.el.getElementsByClassName('messengerView__inputField__form__input__text')[0];
		text.value = '';
	}
}

