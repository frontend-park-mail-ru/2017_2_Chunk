"use strict";

const updateFields = [
	{
		attrs: {
			type: "text",
			size: "128",
			name: "username",
			placeholder: "Name",
			class: "form-block__input",
		}
	},
	{
		attrs: {
			type: "email",
			size: "128",
			name: "email",
			placeholder: "Email",
			class: "form-block__input",
		}
	},
	{
		attrs: {
			type: "password",
			size: "128",
			name: "password",
			placeholder: "New password",
			class: "form-block__input",
		}
	},
	{
		attrs: {
			type: "password",
			size: "128",
			name: "old_password",
			placeholder: "Old password",
			required: "required",
			class: "form-block__input",
		}
	},
	{
		attrs: {
			type: "submit",
			value: "Submit",
			class: "form-block__button",
		}
	}
];

export default updateFields;