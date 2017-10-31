"use strict";

import CommonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";

export default class updateView extends CommonView {
	constructor(eventBus, userService, router) {
		const updateFields = [
			{attrs: {
				type: "text",
				size: "128",
				name: "username",
				placeholder: "Name",
				required: "",
				class: "form-block__input",
			}},
			{attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "Email",
				required: "",
				class: "form-block__input",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "New password",
				required: "",
				class: "form-block__input",
			}},
			{attrs: {
				type: "password",
				size: "128",
				name: "old_password",
				placeholder: "Old password",
				required: "required",
				class: "form-block__input",
			}},
			{attrs: {
				type: "submit",
				value: "Submit",
				class: "form-block__button",
			}}
		];
		const form = new Form(updateFields);
		super({form});

		this.form = form;

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
		}.bind(this), true);

		this.bus.on("openUpdate", function() {
			this.userService.getDataFetch()
				.then(function(resp) {
					const username = this.form.fields[0].el;
					const email = this.form.fields[1].el;
					username.value = resp.username;
					email.value = resp.email;
				}.bind(this))
				.catch(function(err) {
					this.setErrorText(err)
				}.bind(this))
		}.bind(this));
	}


	onSubmit(formData) {
		this.userService.update(formData.username, formData.email, formData.password, formData.old_password)
			.then(function (resp) {
				this.form.reset();
				this.message.clear();
				this.message.hide();
				this.bus.emit("auth");
				this.router.goTo("/menu");
			}.bind(this))
			.catch(function (err) {
				this.setErrorText(err)
			}.bind(this));
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}