'use strict';
//navigotor.online
//узнать про промис
import View from '../view/view';
import Form from '../../blocks/form/form.js';
import Message from '../../blocks/form/__message/form__message.js';
import updateFields from '../../templates/updateFields'


/**
 * Класс секции обновления данных пользователя
 * @module UpdateView
 */
export default class UpdateView extends View {
	constructor(eventBus, userService, router) {
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
		this.el.addEventListener('submit', (event) => {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;
			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData)
		}, true);
		this.bus.on('openUpdate', async () => {
			try {
				const resp = await this.userService.getDataFetch();
				if (resp.ok) {
					const username = this.form.fields[0].el;
					const email = this.form.fields[1].el;
					username.value = resp.json.username;
					email.value = resp.json.email;
				}
				else {
					this.setErrorText(resp.json.message);
				}
			}
			catch (err) {
				console.log(err.message);
			}
		});
		this.hide();
	}


	/**
	 * Функция вызываемаемая при отправке данных
	 * @param {*} formData - объект с данными для отправки запроса
	 * @returns {Promise.<void>} - вот тут надо прояснить вопрос обработки ошибки
	 */
	/**
	 *
	 * @param formData
	 * @returns {Promise.<void>}
	 */
	async onSubmit(formData) {
		let resp = {};
		try {
			resp = await this.userService.update(formData.username, formData.email,
				formData.password, formData.old_password);
			if (resp.ok) {
				const variable = 0;
				this.form.reset();
				this.message.clear();
				this.message.hide();
				this.bus.emit('auth', resp.json.username);
				this.router.goTo('/menu');
			}
			else {
				this.setErrorText(resp)//возвращаемый промис. че с ним делать?
			}
		}
		catch (err) {
			console.log(err.message);
		}
	}


	/**
	 * Функция вызываемаемая при отправке данных
	 * @param {*} err - объект с данными для отправки запроса
	 * @returns {Promise.<void>} - вот тут надо прояснить вопрос обработки ошибки
	 */
	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}