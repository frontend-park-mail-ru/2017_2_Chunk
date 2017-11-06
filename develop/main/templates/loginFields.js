'use strict';

const loginFields = [
	{
		attrs: {
			type: 'text',
			size: '128',
			name: 'username',
			placeholder: 'Enter your name',
			required: 'required',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'password',
			placeholder: 'Enter password',
			required: 'required',
			class: 'form__input',
		}
	},
	{
		attrs: {
			type: 'submit',
			value: 'Submit',
			class: 'form__button',
		}
	}
];

export default loginFields;
