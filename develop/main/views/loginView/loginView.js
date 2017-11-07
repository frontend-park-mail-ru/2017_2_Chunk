"use strict";

import CommonView from "../view/view";
import Form from "../../blocks/form/form.js";
import Message from "../../blocks/form/__message/form__message.js";
import loginFields from  "../../templates/loginFields";


/**
 * Класс секции логина
 * @module LoginView
 */
export default class LoginView extends CommonView {
	/**
	 * @constructor - конструктор секции логина
	 * @param {class} eventBus - общий для всех модулей объект класса
	 * @param {class} userService - общий для всех модулей объект класса
	 * @param {class} router - общий для всех модулей объект класса
	 */
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

			const fields = this.form.fields;

			for (let field in fields) {
				formData[fields[field].el.name] = fields[field].el.value;
			}
			this.onSubmit(formData);
		}, true);

		this.hide();
	}


	/**
	 * Функция вызываемаемая при отправке данных
	 * @param {*} formData - объект с данными для отправки запроса
	 * @returns {Promise.<void>} - вот тут надо прояснить вопрос обработки ошибки
	 */
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


	/**
	 * Выставляет сообщение об ошибке
	 * @param err
	 */
	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}


