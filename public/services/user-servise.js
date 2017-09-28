(function () {
	'use strict';

	const Http = window.Http;

	/**
	 * Сервис для работы с юзерами
	 * @module UserService
	 */
	class UserService {
		constructor() {
			this.user = null;
			this.users = [];
		}

		/**
		 * Регистрирует нового пользователя
		 * @param {string} email
		 * @param {string} password
		 * @param {Function} callback
		 * @param {Function} confirm
		 */
		signup(email, password, confirm, callback) {
			//validation
			if (email.length < 4) {
				callback("Длина логина должна быть не меньше 4 символов!", null);
				return;
			}
			if (email.length > 12) {
				callback("Длина логина не должна превышать 12 символов!", null);
				return;
			}
			if (password.length < 6) {
				callback("Длина пароля должна быть не меньше 6 символов!", null);
				return;
			}
			if (password !== confirm) {
				callback("Пароли не совпадают!", null);
				return;
			}
			if (password === email) {
				callback("Логин и пароль не должны совпадать!", null);
				return;
			}
			Http.Post('/sign_up', {email, password}, callback);
		}


		/**
		 * Авторизация пользователя
		 * @param {string} email
		 * @param {string} password
		 * @param {Function} callback
		 */
		login(email, password, callback) {
			if (email.length < 4) {
				callback("Длина логина должна быть не меньше 4 символов!", null);
				return;
			}
			if (email.length > 12) {
				callback("Длина логина не должна превышать 12 символов!", null);
				return;
			}
			if (password.length < 6) {
				callback("Длина пароля должна быть не меньше 6 символов!", null);
				return;
			}
			if (password === email) {
				callback("Логин и пароль не могут совпадать!", null);
				return;
			}
			Http.Post('/sign_in', {email, password}, callback);
		}

		/**
		 * Проверяет, авторизован ли пользователь
		 * @return {boolean}
		 */
		isLoggedIn() {
			// this.getData();
			return !!this.user;//как эта хрень работает?
		}

		/**
		 * Загружает данные о текущем пользователе
		 * @param {Function} callback
		 * @param {boolean} [force=false] - игнорировать ли кэш?
		 */
		getData(callback, force = false) {
			if (this.isLoggedIn() && !force) {
				return callback(null, this.user);
			}

			Http.Get('/whoisit', function (err, userdata) {
				if (err) {
					return callback(err, userdata);
				}
				this.user = userdata.username;
				callback(null, userdata);
			}.bind(this));
		}

		logout() {
			if (this.isLoggedIn()) {
				this.user = null;
				this.users = [];
				this.delCookie();
			}
		}

		delCookie() {
			(function () {
				let xhr = new XMLHttpRequest();
				xhr.open('GET', '/exit', true);
				xhr.withCredentials = true;
				xhr.send();
			})();
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

	window.UserService = UserService;

})();