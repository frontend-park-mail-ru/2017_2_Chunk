'use strict';
/**
 * Поля для формы логина
 *@module loginFilds
 */
const loginFields = [
	{
		attrs: {
			type: 'email',
			name: 'email',
			placeholder: 'Введите ваш E-Mail',
			required: 'required',
			class: 'login_input',
		},
	},
	{
		attrs: {
			type: 'password',
			name: 'password',

			placeholder: 'Введите пароль',
			required: 'required',
			class: 'login_input',
		},
	},
	{
		attrs: {
			type: 'submit',
			value: 'Log In',
			class: 'login_input',
		},
	},
];

export default loginFields;
