'use strict';

/**
 * Базовые поля формы
 * @module loginFields
 */
const loginFields = [
	{
		attrs: {
			type: 'text',
			size: '128',
			name: 'username',
			placeholder: 'Name',
			required: 'required',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'password',
			placeholder: 'Password',
			required: 'required',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'submit',
			value: 'Submit',
			class: 'form__button button',
		}
	}
];

export default loginFields;
