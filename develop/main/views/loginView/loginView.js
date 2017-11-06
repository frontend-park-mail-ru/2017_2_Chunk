"use strict";

import CommonView from "../view/view";
import Form from "../../blocks/form/form.js";
import Message from "../../blocks/form/__message/form__message.js";
import loginFields from  "../../templates/loginFields";


export default class LoginView extends CommonView {
	constructor(eventBus, userService, router) {
		const form = new Form(loginFields);
		super({form});

		this.form = form;
		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new Message();

		this.append(this.message);

		this.el.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = {};
			debugger;
			const fields = this.form.fields;

			for (let field in fields) {
				formData[fields[field].el.name] = fields[field].el.value;
			}
			this.onSubmit(formData);
		}, true);

		this.hide();
	}


	async onSubmit(formData) {
		const resp = await this.userService.login(formData.username, formData.password);
		if (resp.ok) {
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth", resp.json.username);
			this.bus.emit("openMenu");
		}
		else {
			this.setErrorText(resp);
		}
	}


	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}


