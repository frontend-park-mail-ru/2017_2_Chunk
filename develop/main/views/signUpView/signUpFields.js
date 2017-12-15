'use strict';


/**
 * Поля формы регистрации
 * @module signUpFields
 */
const signUpFields = [
	{attrs: {
		type: 'text',
		size: '128',
		name: 'name',
		placeholder: 'Name',
		required: 'required',
		class: 'form__input view__view-button_theme-black-orange',
	}},
	{attrs: {
		type: 'email',
		size: '128',
		name: 'email',
		placeholder: 'Email',
		required: 'required',
		class: 'form__input',
	}},
	{attrs: {
		type: 'password',
		size: '128',
		name: 'password',
		placeholder: 'Password',
		required: 'required',
		class: 'form__input view__view-button_theme-black-orange',
	}},
	{attrs: {
		type: 'password',
		size: '128',
		name: 'confirm',
		placeholder: 'Confirm password',
		required: 'required',
		class: 'form__input',
	}},
	{attrs: {
		type: 'submit',
		value: 'Submit',
		class: 'form__button button',
	}}
];

export default signUpFields;
