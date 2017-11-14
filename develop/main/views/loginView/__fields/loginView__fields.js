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
			placeholder: 'Enter your name',
			required: 'required',
			class: 'form__input view__view-button_theme-black-orange',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'password',
			placeholder: 'Enter password',
			required: 'required',
			class: 'form__input view__view-button_theme-black-orange',
		}
	},
	{
		attrs: {
			type: 'submit',
			value: 'Submit',
			class: 'form__button view__view-button_theme-black-orange',
		}
	}
];

export default loginFields;
