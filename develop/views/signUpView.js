"use strict";
import commonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";


export default class signUpView extends commonView {
	constructor() {
		const loginFields = [
			{attrs: {
				type: "text",
				size: "128",
				name: "name",
				placeholder: "Enter your name",
				required: "required",
				class: "login-input",
			}},
			{attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "Enter your email",
				required: "required",
				class: "login-input",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "login-input",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "confirm",
				placeholder: "Confirm password",
				required: "required",
				class: "login-input",
			}},
			{attrs: {
				type: "submit",
				value: "submit",
				class: "login-input button",
			}}
		];
		const form = new Form(loginFields);
		super({form});

		const err_message = new Message();
		this.append(err_message);

		this.hide();
	}

	onSubmit(callback) {
		this.el.addEventListener("submit", function(event) {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			callback(formData);
		}.bind(this))
	}
}
