"use strict";
import CommonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";


export default class LoginView extends CommonView {
	constructor(eventBus, userService, router) {
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
		this.router = router;
		this.userService = userService;

		this.message = new Message();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.hide();

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


	onSubmit(formData)
	{
		this.userService.login(formData.username, formData.password)
			.then(function (resp) {
				console.dir(resp);
				this.message.clear();
				this.message.hide();
				this.bus.emit("auth");
				this.router.goTo("/menu");
			}.bind(this))
			.catch(function (err) {
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


