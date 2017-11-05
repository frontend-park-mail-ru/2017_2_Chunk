'use strict';

const signUpFIelds = [
	{attrs: {
		type: 'text',
		size: '128',
		name: 'name',
		placeholder: 'Enter your name',
		required: 'required',
		class: 'form-block__input ',
	}},
	{attrs: {
		type: 'email',
		size: '128',
		name: 'email',
		placeholder: 'Enter your email',
		required: 'required',
		class: 'form-block__input ',
	}},
	{attrs: {
		type: 'password',
		size: '128',
		name: 'password',
		placeholder: 'Enter password',
		required: 'required',
		class: 'form-block__input ',
	}},
	{attrs: {
		type: 'password',
		size: '128',
		name: 'confirm',
		placeholder: 'Confirm password',
		required: 'required',
		class: 'form-block__input ',
	}},
	{attrs: {
		type: 'submit',
		value: 'Submit',
		class: 'form-block__button',
	}}
];

export default signUpFIelds;
