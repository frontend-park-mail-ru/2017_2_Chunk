'use strict';
import Http from '../modules/http';
import eventBus from '../modules/eventBus';


/**
 * Сервис для работы с юзерами
 * @module UserService
 */
export default new class UserService {
	constructor() {
		this.user = null;
		this.users = [];
	}


	/**
	 * Регистрирует нового пользователя
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 * @param {string} confirm
	 */
	async signup(username, email, password, confirm) {
		const response = {
			ok: false,
			json: {},
			message: '',
		};
		if (username.length < 4) {
			response.message = 'Длина логина должна быть не меньше 4 символов!';
			return response;
		}
		if (username.length > 12) {
			response.message = 'Длина логина не должна превышать 12 символов!';
			return response;
		}
		if (password.length < 6) {
			response.message = 'Длина пароля должна быть не меньше 6 символов!';
			return response;
		}
		if (password !== confirm) {
			response.message = 'Пароли не совпадают!!!';
			return response;
		}
		if (password === username) {
			response.message = 'Логин и пароль не должны совпадать!';
			return response;
		}
		if (!navigator.onLine) {
			response.message = 'Internet connections error!';
			return response;
		}

		eventBus.emit('waitingBackend');
		const resp = await Http.fetchPost('/user/sign_up', {username, email, password});
		response.json = await resp.json();
		eventBus.emit('backendResponseReceived');

		if (resp.status >= 400) {
			response.message = response.json.errorMessage;
			return response;
		}
		response.ok = true;
		this.user = response.json;
		return response;
	}


	/**
	 * Авторизация пользователя
	 * @param {string} login
	 * @param {string} password
	 * @return {*} response - объект ответа
	 */
	async login(login, password) {
		const response = {
			ok: false,
			json: {},
			message: '',
		};
		if (password.length < 6) {
			response.message = 'Попробуй еще раз! Используйте что-то поумнее';
			return response;
		}
		if (password === login) {
			response.message = 'Логин и пароль не должны совпадать!';
			return response;
		}
		if (!navigator.onLine) {
			response.message = 'Internet connections error!';
			return response;
		}
		eventBus.emit('waitingBackend');
		const resp = await Http.fetchPost('/user/sign_in', {login, password});
		response.json = await resp.json();
		eventBus.emit('backendResponseReceived');
		if (resp.status >= 400) {
			response.message = response.json.errorMessage;
			return response;
		}
		response.ok = true;
		this.user = response.json;
		return response;
	}


	/**
	 * Обновляет данные существующего пользователя
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 * @param {string} oldPassword
	 * @return {*} response - объект ответа
	 */
	async update(username, email, password, oldPassword) { // не парсит JSON
		const response = {
			ok: false,
			json: {},
			message: '',
		};
		if (password.length < 6) {
			response.message = 'Длина пароля должна быть не меньше 6 символов!';
			return response;
		}
		if (!navigator.onLine) {
			response.message = 'Internet connections error!';
			return response;
		}
		eventBus.emit('waitingBackend');
		const resp = await Http.fetchPost('/user/update', {username, email, password, oldPassword});
		response.json = await resp.json();
		eventBus.emit('backendResponseReceived');

		if (resp.status >= 400) {
			response.message = response.json.errorMessage;
			return response;
		}
		response.ok = true;
		this.user = response.json;
		return response;
	}


	/**
	 * Проверяет, авторизован ли пользователь
	 * @return {boolean}
	 */
	isLoggedIn() {
		return !!this.user;
	}


	/**
	 * Проверяет, авторизован ли пользователь
	 * @param force - пременная для принудительной отправки гет запроса если true
	 * @return {*} response - объект ответа
	 */
	async getDataFetch(force = false) { // нужно ли возвращать проимс?
		const response = {
			ok: false,
			json: {},
			message: '',
		};
		if (this.isLoggedIn() && !force) {
			response.ok = true;
			response.json = this.user;
			return response;
		}
		if (!navigator.onLine) {
			response.message = 'Internet connections error!';
			return response;
		}
		const resp = await Http.fetchGet('/user/whoisit');
		response.json = await resp.json();
		if (resp.status >= 400) {
			this.user = null;
			this.users = [];
			response.message = response.json.errorMessage;
			return response;
		}
		response.ok = true;
		this.user = response.json;
		return response;
	}


	/**
	 * Разлогинивает
	 */
	logout() {
		if (navigator.onLine) {
			if (this.isLoggedIn()) {
				this.user = null;
				this.users = [];
				Http.fetchGet('/user/exit');
			}
		}
	}


	/**
	 * Запрашивает список пользователей
	 */
	loadUsersList() {
		return Http.fetchGet('');
	}
};
