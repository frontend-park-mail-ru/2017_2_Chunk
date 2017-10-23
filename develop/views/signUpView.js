"use strict";
import commonView from "./commonView";
import Form from "../blocks/form/form.js";

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
				type: "text",
				size: "128",
				name: "email",
				placeholder: "Enter your email",
				required: "required",
				class: "login-input",
			}},
			{attrs: {
				type: "email",
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
				type: "button",
				size: "128",
				name: "submit",
				value: "submit",
				class: "login-input button",
			}}
		];
		const form = new Form(loginFields);
		super({form});

		this.hide();

	}
}
