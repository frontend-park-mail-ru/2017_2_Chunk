'use strict';

import Http from "../modules/http";

/**
 * Сервис для работы с юзерами
 * @module UserService
 */
export default class UserService {
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
	signup(username, email, password, confirm) {
		//validation
		return new Promise(function (resolve, reject) {
			if (email.length < 4) {
				throw new Error("Длина логина должна быть не меньше 4 символов!");
			}
			if (email.length > 12) {
				throw new Error("Длина логина не должна превышать 12 символов!");
			}
			if (password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!");
			}
			if (password !== confirm) {
				throw new Error("Пароли не совпадают!!!");
			}
			if (password === email) {
				throw new Error("Логин и пароль не должны совпадать!");
			}

			resolve(Http.FetchPost('/sign_up', {username, email, password}));
		});
	}

	// /**
	//  * Авторизация пользователя
	//  * @param {string} email
	//  * @param {string} password
	//  * @param {Function} callback
	//  */
	// login(email, password, callback) {
	// 	if (email.length < 4) {
	// 		callback("Длина логина должна быть не меньше 4 символов!", null);
	// 		return;
	// 	}
	// 	if (email.length > 12) {
	// 		callback("Длина логина не должна превышать 12 символов!", null);
	// 		return;
	// 	}
	// 	if (password.length < 6) {
	// 		callback("Длина пароля должна быть не меньше 6 символов!", null);
	// 		return;
	// 	}
	// 	if (password === email) {
	// 		callback("Логин и пароль не могут совпадать!", null);
	// 		return;
	// 	}
	// 	Http.Post('/sign_in', {email, password}, callback);
	// }

	/**
	 * Проверяет, авторизован ли пользователь
	 * @return {boolean}
	 */
	isLoggedIn() {
		return !!this.user;
	}

	/**
	 * Загружает данные о текущем пользователе
	 * @param {Function} callback
	 * @param {boolean} [force=false] - игнорировать ли кэш?
	 */
	// getData(callback, force = false) {
	// 	if (this.isLoggedIn() && !force) {
	// 		return callback(null, this.user);
	// 	}
	//
	// 	Http.FetchGet('/whoisit');
	// }

	/**
	 * Проверяет, авторизован ли пользователь
	 * @param force - пременная для принудительной отправки гет запроса если true
	 * @return {Promise} - возвращает функцию колбек с результатом запроса или ошибкой
	 */
	async getDataFetch(force = false) {
		if (this.isLoggedIn() && !force) {
			return new Promise(function(resolve, reject) {
				resolve(this.user);
			});
		}

		return await Http.FetchGet('/whoisit')
			.then(function(resp) {
				this.user = resp;
				return this.user;
			}.bind(this))
			.catch(function (err) {
				this.user = null;
				console.log(err.statusText);
				throw new Error("Can not get response =(")
			}.bind(this))
	}


	/**
	 * Разлогинивает куки
	 */
	logout() {
		if (this.isLoggedIn()) {
			this.user = null;
			this.users = [];
			this.delCookie();
		}
	}

	/**
	 * Разлогинивает пользователя удаляя куку
	 */
	async delCookie() {
		await Http.FetchGet('/exit')
			.catch(function (err) {
				console.log(err.errorMessage);
			});
	}

	/**
	 * Загружает список всех пользователей
	 * @param callback
	 */
	loadUsersList(callback) {
		Http.Get('/users', function (err, users) {
			if (err) {
				return callback(err, users);
			}

			this.users = users;

			if (this.isLoggedIn()) {
				this.users = this.users.map(user => {
					if (user.email === this.user.email) {
						user.me = true;
					}
					return user;
				});
			}

			callback(null, this.users);
		}.bind(this));
	}
}
