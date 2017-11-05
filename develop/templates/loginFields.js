'use strict';

const loginFields = [
	{
		attrs: {
			type: 'text',
			size: '128',
			name: 'username',
			placeholder: 'Enter your name',
			required: 'required',
			class: 'form-block__input',
		}
	},
	{
		attrs: {
			type: 'password',
			size: '128',
			name: 'password',
			placeholder: 'Enter password',
			required: 'required',
			class: 'form-block__input',
		}
	},
	{
		attrs: {
			type: 'submit',
			value: 'Submit',
			class: 'form-block__button',
		}
	}
];

export default loginFields;
