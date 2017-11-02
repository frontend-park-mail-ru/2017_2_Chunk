"use strict";

import CommonView from "./commonView";
import Form from "../blocks/form/form.js";
import Message from "../blocks/message/message.js";
import loginFields from  "../templates/loginFields";


export default class LoginView extends CommonView {
	constructor(eventBus, userService, router) {
		const form = new Form(loginFields);
		super({form});

		this.form = form;
		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new Message();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);
		}, true);

		this.hide();
	}


	async onSubmit(formData) {
		const resp = await this.userService.login(formData.username, formData.password);
		if (resp.ok) {
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


