"use strict";
import CommonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";


export default class LoginView extends CommonView {
	constructor(eventBus) {
		const loginFields = [
			{attrs: {
				type: "text",
				size: "128",
				name: "username",
				placeholder: "Enter your name",
				required: "required",
				class: "form-block__input",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "form-block__input",
			}},
			{attrs: {
				type: "submit",
				value: "submit",
				class: "form-block__button",
			}}
		];
		const form = new Form(loginFields);
		super({form});

		this.bus = eventBus;
		this.message = new Message();
		this.append(this.message);

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


	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}


