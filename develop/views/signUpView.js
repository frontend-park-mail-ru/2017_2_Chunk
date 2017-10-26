"use strict";
import commonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";


export default class signUpView extends commonView {
	constructor(eventBus, userService, router) {
		const signUpFields = [
			{attrs: {
				type: "text",
				size: "128",
				name: "name",
				placeholder: "Enter your name",
				required: "required",
				class: "form-block__input ",
			}},
			{attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "Enter your email",
				required: "required",
				class: "form-block__input ",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "form-block__input ",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "confirm",
				placeholder: "Confirm password",
				required: "required",
				class: "form-block__input ",
			}},
			{attrs: {
				type: "submit",
				value: "submit",
				class: "form-block__button",
			}}
		];
		const form = new Form(signUpFields);
		super({form});

		this.bus = eventBus;
		this.userService = userService;
		this.router = router;

		this.hide();

		this.message = new Message();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", function(event) {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);

		}.bind(this), true)
	}


	onSubmit(formData) {
		this.userService.signup(formData.name, formData.email, formData.password, formData.confirm)
			.then(function(resp) {
				this.bus.emit("auth");
				this.router.goTo("/menu");
			}.bind(this))
			.catch(function(err) {
				debugger;
				console.log("some err with sign up");
				console.log("err: ", err.message);
				this.setErrorText(err)//нужно поставить ошибку из json
			}.bind(this));
	}


	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
