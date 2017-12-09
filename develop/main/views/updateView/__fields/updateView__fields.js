'use strict';


/**
 * Поля формы обновления данных пользователя
 * @module updateField
 */
const updateFields = [
	{
		attrs: {
			type: 'text',
			size: '128',
			name: 'username',
			placeholder: 'Name',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'email',
			size: '128',
			name: 'email',
			placeholder: 'Email',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'password',
			placeholder: 'New password',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'old_password',
			placeholder: 'Old password',
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

export default updateFields;
