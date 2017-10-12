'use strict';

/**
 * Поля для формы регистрации
 *@module loginFilds
 */
const signupFields = [
	{
		attrs: {
			type: 'email',
			name: 'email',
			placeholder: 'Введите ваш E-Mail',
			required: 'required',
			class: 'sign_up_input',
		},
	},
	{
		attrs: {
			type: 'text',
			name: 'password',
			placeholder: 'Придумайте пароль длиннее 4 символов',
			required: 'required',
			pattern: '^\\S{4,}$',
			class: 'sign_up_input',
		},
	},
	{
		attrs: {
			type: 'text',
			name: 'confirm',
			placeholder: 'Повторите пароль',
			required: 'required',
			pattern: '^\\S{4,}$',
			class: 'sign_up_input',
		},
	},
	{
		attrs: {
			type: 'submit',
			value: 'Регистрация',
			class: 'sign_up_input',
		},
	},
];

export default signupFields;