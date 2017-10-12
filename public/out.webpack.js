var lib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/**
 * Базовый класс блока
 * @module Block
 */

class Block {
	/**
  * @param {HTMLElement} el - корневой элемент блока
  * @constructor
  */
	constructor(el) {
		this.el = el;
	}

	/**
  * Фабричный метод, который ползволяет удобро создавать блоки с заданными характеристиками
  * @param {string} [tagName='div'] - tagName блока
  * @param {*} [attrs={}] - объект с атрибутами блока
  * @param {string[]} [classes=[]] - список имён классов
  * @param {string|null} [text=null] - опциональный текст блока
  * @return {Block}
  * @constructor
  */
	static Create(tagName = 'div', attrs = {}, classes = [], text = null) {
		const el = document.createElement(tagName);
		classes.forEach(function (className) {
			el.classList.add(className);
		});
		for (let name in attrs) {
			el.setAttribute(name, attrs[name]);
		}
		if (text) {
			el.textContent = text;
		}
		return new Block(el);
	}

	/**
  * Установить новый текст для блока
  * @param {string} text
  */
	setText(text) {
		this.el.textContent = text;
	}

	/**
  * Очищает содержимое блока
  */
	clear() {
		this.el.innerHTML = '';
	}

	/**
  * Скрывает блок
  */
	hide() {
		this.el.setAttribute('hidden', 'hidden');
	}

	/**
  * Отображает блок
  */
	show() {
		this.el.removeAttribute('hidden');
	}

	/**
  * Добавляет к текущему блоку дочерний
  * @param {Block} block
  * @return {Block}
  */
	append(block) {
		this.el.appendChild(block.el);
		return this;
	}

	/**
  * Позволяет подписаться на событие
  * @param {string} event
  * @param {EventListener} callback
  * @return {function(this:Block)} - функция отписки от события
  */
	on(event, callback) {
		this.el.addEventListener(event, callback);
		return () => {
			this.el.removeEventListener(event, callback);
		};
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Block;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(__webpack_require__(10));
requireAll(__webpack_require__(13));

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_index__ = __webpack_require__(0);
/**
 * Базовый класс формы
 * @module Form
 */




class Form extends __WEBPACK_IMPORTED_MODULE_0__block_index__["default"] {
	/**
  * @param Fields []- корневой элемент блока
  * @constructor
  */
	constructor(fields = []) {
		const el = document.createElement('form');
		super(el);

		fields.forEach(function (field) {
			const f = __WEBPACK_IMPORTED_MODULE_0__block_index__["default"].Create('input', field.attrs || {}, field.classes || []);
			this.append(f);
		}.bind(this));
	}

	/**
  * Вызывается при отправке формы
  * @param {Function} callback - колбек функция
  */
	onSubmit(callback) {
		this.el.addEventListener('submit', event => {
			event.preventDefault();
			const formdata = {};
			const elements = this.el.elements;
			//запись элементов формы в formdata
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}

			callback(formdata);
		});
	}

	/**
  * Сбрасывает атрибуты HTMLElement
  */
	reset() {
		this.el.reset();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Form;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_index__ = __webpack_require__(0);




/**
 * Базовый класс формы для отправки информационных сообщений в тело html документа
 * @module Message
 */
class Message extends __WEBPACK_IMPORTED_MODULE_0__block_index__["default"] {
	/**
  * Создает элемент div CSS класса message
  * @constructor
  */
	constructor() {
		const el = document.createElement('div');
		el.classList.add('message');
		super(el);
	}

	/**
  * Сбрасывает атрибуты HTMLElement
  */
	reset() {
		this.el.reset();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Message;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_scoreBoard_js__ = __webpack_require__(5);




/**
 * Модуль для получения шаблона таблицы рекордов с пользователями
 * @Module Scoreboard
 */



class Scoreboard extends __WEBPACK_IMPORTED_MODULE_0__block_index_js__["default"] {
	/**
  * HTMLElement el - корневой элемент блока
  * @constructor
  */
	constructor() {
		const el = document.createElement('table');
		super(el);
	}

	/**
  * Позволяет записать в шаблон таблицы рекордов пользователей users
  * шаблон вместе с данными записывается в this.el в виде готового HTML блока 'table'
  * инициализированного в конструкторе
  * @param users[]- массив пользователей
  */
	update(users = []) {
		console.log('Scoreboard.update', users[0]);
		this.clear();
		this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_1__templates_scoreBoard_js__["default"].template({ users });
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Scoreboard;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const ScoreboardTemplate = {
	pugEscape: function pugEscape(e) {
		var a = "" + e,
		    t = this.pugMatchHtml.exec(a);
		if (!t) return e;
		var r,
		    c,
		    n,
		    s = "";
		for (r = t.index, c = 0; r < a.length; r++) {
			switch (a.charCodeAt(r)) {
				case 34:
					n = "&quot;";
					break;
				case 38:
					n = "&amp;";
					break;
				case 60:
					n = "&lt;";
					break;
				case 62:
					n = "&gt;";
					break;
				default:
					continue;
			}
			c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
		}
		return c !== r ? s + a.substring(c, r) : s;
	},

	pugMatchHtml: /["&<>]/,

	template: function template(locals) {
		var pug_html = "",
		    pug_mixins = {},
		    pug_interp;
		;var locals_for_with = locals || {};
		(function (users) {
			pug_html = pug_html + "\u003Cthead\u003E\u003Ctr\u003E\u003Cth\u003EEmail\u003C\u002Fth\u003E\u003Cth\u003EScores\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E";
			// iterate users
			;(function () {
				var $$obj = users;
				if ('number' == typeof $$obj.length) {
					for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				} else {
					var $$l = 0;
					for (var pug_index0 in $$obj) {
						$$l++;
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				}
			}).call(this);

			pug_html = pug_html + "\u003C\u002Ftbody\u003E";
		}).call(this, "users" in locals_for_with ? locals_for_with.users : typeof users !== "undefined" ? users : undefined);
		;
		return pug_html;
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ScoreboardTemplate);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/**
 * Поля для формы логина
 *@module loginFilds
 */

const loginFields = [{
	attrs: {
		type: 'email',
		name: 'email',
		placeholder: 'Введите ваш E-Mail',
		required: 'required',
		class: 'login_input'
	}
}, {
	attrs: {
		type: 'password',
		name: 'password',

		placeholder: 'Введите пароль',
		required: 'required',
		class: 'login_input'
	}
}, {
	attrs: {
		type: 'submit',
		value: 'Log In',
		class: 'login_input'
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (loginFields);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/**
 * Поля для формы регистрации
 *@module loginFilds
 */

const signupFields = [{
	attrs: {
		type: 'email',
		name: 'email',
		placeholder: 'Введите ваш E-Mail',
		required: 'required',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'text',
		name: 'password',
		placeholder: 'Придумайте пароль длиннее 4 символов',
		required: 'required',
		pattern: '^\\S{4,}$',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'text',
		name: 'confirm',
		placeholder: 'Повторите пароль',
		required: 'required',
		pattern: '^\\S{4,}$',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'submit',
		value: 'Регистрация',
		class: 'sign_up_input'
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (signupFields);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(9);




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
  * @param {string} confirm
  */
	signup(email, password, confirm) {
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

			let username = email;
			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/sign_up', { username, email, password }));
		});
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
		__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/sign_in', { email, password }, callback);
	}

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
	getData(callback, force = false) {
		if (this.isLoggedIn() && !force) {
			return callback(null, this.user);
		}

		__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/whoisit');
	}

	/**
  * Проверяет, авторизован ли пользователь
  * @param force - пременная для принудительной отправки гет запроса если true
  * @return {Promise} - возвращает функцию колбек с результатом запроса или ошибкой
  */
	getDataFetch(force = false) {
		debugger;
		if (this.isLoggedIn() && !force) {
			return new Promise(function (resolve, reject) {
				resolve(this.user);
			});
		}
		return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/whoisit').then(function (resp) {
			this.user = resp.username;
			return resp;
		}.bind(this));
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
		__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Get('/users', function (err, users) {
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
/* harmony export (immutable) */ __webpack_exports__["default"] = UserService;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });



// const backendUrl = 'https://chunkgame.herokuapp.com';

const backendUrl = "";
const baseUrl = `${window.location.protocol}//${window.location.host}`;

console.log("baseUrl = ", baseUrl);
/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

class Http {
	/**
  * Выполняет GET-запрос по указанному адресу
  * @param {string} address - адрес запроса
  * @param {Function} callback - функция-коллбек
  */
	static Get(address, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', backendUrl + address, true);
		xhr.withCredentials = true;

		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;
			if (+xhr.status >= 400) {
				return callback(xhr, null);
			}

			callback(null, JSON.parse(xhr.responseText));
		};

		xhr.send();
	}

	/**
  * Выполняет POST-запрос по указанному адресу
  * @param {string} address - адрес запроса
  * @param {*} body - тело запроса (объект)
  * @param {Function} callback - функция-коллбек
  */
	static Post(address, body, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', backendUrl + address, true);
		xhr.withCredentials = true;
		xhr.timeout = 15000;
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;
			if (+xhr.status >= 400) {
				return callback(JSON.parse(xhr.responseText).errorMessage, null);
			}
			callback(null, xhr);
		};

		xhr.send(JSON.stringify(body));
	}

	/**
  * Выполняет GET-запрос по указанному адресу
  * @param {string} address - адрес запроса
  */
	static FetchGet(address) {
		const url = backendUrl + address;
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		}).then(function (response) {
			if (response.status >= 400) {
				throw response;
			}
			return response.json();
		});
	}

	/**
  * Выполняет POST-запрос по указанному адресу
  * @param {Object} body - body-request
  * @param {string} address - адрес запроса
  */
	static FetchPost(address, body) {
		const url = backendUrl + address;
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Http;

Http.BaseUrl = null;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./blocks/block/index.js": 0,
	"./blocks/form/index.js": 2,
	"./blocks/message/index.js": 3,
	"./blocks/scoreboard/index.js": 4,
	"./configs/login-fields.js": 6,
	"./configs/signup-fields.js": 7,
	"./include.js": 1,
	"./main.js": 11,
	"./modules/http.js": 9,
	"./services/user-service.js": 8,
	"./templates/scoreBoard.js": 5,
	"./templates/scoreBoardOld.js": 12
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_scoreboard_index_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_form_index_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blocks_message_index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configs_login_fields__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configs_signup_fields__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_service_js__ = __webpack_require__(8);


/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */









const userService = new __WEBPACK_IMPORTED_MODULE_6__services_user_service_js__["default"]();

const app = new __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"](document.body);
const title = __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('a', {}, ['application-header'], 'Tower Defence');

const sections = {
	back: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['back-section', 'section']),
	menu: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['menu-section', 'section']),
	login: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['login-section', 'section']),
	signup: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['signup-section', 'section']),
	scores: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['scores-section', 'section']),
	profile: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('section', {}, ['profile-section', 'section']),
	hide() {
		this.back.hide();
		this.menu.hide();
		this.login.hide();
		this.signup.hide();
		this.scores.hide();
		this.profile.hide();
	}
};

sections.hide();

app.append(title).append(sections.back).append(sections.menu).append(sections.login).append(sections.signup).append(sections.scores).append(sections.profile);

/**
 * Открывает меню логина
 */
function openLogin() {
	if (!sections.login.ready) {
		sections.login.loginform = new __WEBPACK_IMPORTED_MODULE_2__blocks_form_index_js__["default"](__WEBPACK_IMPORTED_MODULE_4__configs_login_fields__["default"]);
		sections.signup.message = new __WEBPACK_IMPORTED_MODULE_3__blocks_message_index_js__["default"]();

		sections.login.loginform.onSubmit(function (formdata) {
			sections.signup.message.clear();
			sections.signup.message.hide();
			userService.login(formdata.email, formdata.password, function (err, resp) {
				if (err) {
					sections.signup.message.setText(err);
					sections.signup.message.show();
					return;
				}

				sections.login.loginform.reset();
				userService.getDataFetch(function (err, resp) {
					if (err) {
						sections.signup.message.setText(err);
						sections.signup.message.show();
						return;
					}
					openMenu();
				}, true);
			});
		});
		sections.login.append(sections.signup.message).append(__WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('h2', {}, ['section_title'], 'Войдите')).append(sections.login.loginform);
		sections.signup.message.hide();
		sections.login.ready = true;
	}
	sections.hide();
	backToPrevPage('signup');
	if (userService.isLoggedIn()) {
		return openMenu();
	}
	sections.login.show();
}

/**
 * Открывает меню регистрации
 */
function openSignup() {
	if (!sections.signup.ready) {
		sections.signup.signupform = new __WEBPACK_IMPORTED_MODULE_2__blocks_form_index_js__["default"](__WEBPACK_IMPORTED_MODULE_5__configs_signup_fields__["default"]);
		sections.signup.message = new __WEBPACK_IMPORTED_MODULE_3__blocks_message_index_js__["default"](); //в случае ошибки block.show()text = err_message
		sections.signup.signupform.onSubmit(function (formdata) {
			sections.signup.message.clear();
			sections.signup.message.hide();

			//отслыаем данные на сервер
			userService.signup(formdata.email, formdata.password, formdata.confirm).then(function (resp) {
				sections.signup.signupform.reset();

				//получаем данные пользователя
				userService.getDataFetch().then(function (res) {
					console.log(res);
					openMenu();
				}).catch(function (err) {
					sections.signup.message.setText(err.message);
					sections.signup.message.show();
				});
			}).catch(function (err) {
				sections.signup.message.setText(err.message);
				sections.signup.message.show();
			});
		});
		sections.signup.append(sections.signup.message).append(__WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('h2', {}, ['section_title'], 'Зарегистрируйтесь')).append(sections.signup.signupform);
		sections.signup.message.hide();
		sections.signup.ready = true;
	}
	sections.hide();
	backToPrevPage('signup');

	if (userService.isLoggedIn()) {
		return openMenu();
	}
	sections.signup.show();
}

/**
 * Додавбляет кнопку назад
 */
function backToPrevPage(current_page) {
	if (!sections.back.ready) {
		sections.back.items = {
			back: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'back' }, ['button', 'back'], 'Назад')
		};
		sections.back.on('click', function (event) {
			event.preventDefault();
			const target = event.target;
			const section = target.getAttribute('data-section');
			if (section === 'back') {
				switch (current_page) {
					case 'signup':
						{

							openMenu();
							break;
						}
					case 'login':
						{
							openMenu();
							break;
						}
				}
			}
		});
		sections.back.append(sections.back.items.back);
		sections.back.ready = true;
	}
	sections.back.hide();

	if (current_page === 'signup' || current_page === 'login') {
		sections.back.show();
	}
}

/**
 * Открывает таблицу рекордов
 */
function openScores() {
	sections.hide();
	sections.scores.scoreboard = new __WEBPACK_IMPORTED_MODULE_1__blocks_scoreboard_index_js__["default"]();
	sections.scores.scoreboard.update([{ name: 'Igor', score: '100' }, { name: 'Nikita', score: '120' }, { name: 'Lena', score: '130' }]);
	sections.scores.append(__WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('h2', {}, [], 'Список лидеров')).append(sections.scores.scoreboard);
	sections.scores.show();
}

/**
 * Открывает основное меню
 */
function openMenu() {
	if (!sections.menu.ready) {
		sections.menu.items = {
			profile: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('div', { 'data-section': 'profile' }, ['profile', 'auth'], 'dfdfgdf'),
			play: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'play' }, ['button', 'auth'], 'Играть'),
			signup: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'signup' }, ['button', 'unauth'], 'Зарегистрироваться'),
			login: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'login' }, ['button', 'unauth'], 'Вход'),
			settings: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'settings' }, ['button', 'auth'], 'Настройки'),
			rules: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'rules' }, ['button', 'unauth'], 'Правила'),
			scores: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'scores' }, ['button', 'unauth'], 'Таблица лидеров'),
			exit: __WEBPACK_IMPORTED_MODULE_0__blocks_block_index_js__["default"].Create('button', { 'data-section': 'exit' }, ['button', 'auth'], 'Выход')
		};

		sections.menu.on('click', function (event) {
			event.preventDefault();
			const target = event.target;
			const section = target.getAttribute('data-section');
			switch (section) {
				case 'login':
					openLogin();
					break;
				case 'signup':
					openSignup();
					break;
				case 'scores':
					openScores();
					break;
				case 'profile':
					openProfile();
					break;
				case 'exit':
					userService.logout();
					openMenu();
					break;
			}
		});
		sections.menu.append(sections.menu.items.profile).append(sections.menu.items.play).append(sections.menu.items.signup).append(sections.menu.items.login).append(sections.menu.items.settings).append(sections.menu.items.rules).append(sections.menu.items.scores).append(sections.menu.items.exit);
		sections.menu.ready = true;
	}
	sections.hide();

	if (userService.isLoggedIn()) {
		userService.getData(function (err, resp) {
			sections.menu.items.profile.setText(resp);
		});
		sections.menu.items.profile.show();
		sections.menu.items.play.show();
		sections.menu.items.login.hide();
		sections.menu.items.signup.hide();
		sections.menu.items.settings.show();
		sections.menu.items.rules.show();
		sections.menu.items.scores.show();
		sections.menu.items.exit.show();
	} else {
		sections.menu.items.profile.hide();
		sections.menu.items.play.hide();
		sections.menu.items.login.show();
		sections.menu.items.signup.show();
		sections.menu.items.settings.hide();
		sections.menu.items.rules.show();
		sections.menu.items.scores.show();
		sections.menu.items.exit.hide();
	}
	sections.menu.show();
}

/**
 * Открытие меню по клиу на заголовок
 */
title.on('click', openMenu);
openMenu();

/**
 * Получает данные пользователя
 */
userService.getData(function (err, resp) {
	if (err) {
		return;
	}
	openMenu();
}, true);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// (function () {
// 	'use strict';
//
// 	window.ScoreboardTemplateOld = {
// 		pugEscape: function pug_escape(e) {
// 			var a = "" + e, t = this.pugMatchHtml.exec(a);
// 			if (!t) return e;
// 			var r, c, n, s = "";
// 			for (r = t.index, c = 0; r < a.length; r++) {
// 				switch (a.charCodeAt(r)) {
// 					case 34:
// 						n = "&quot;";
// 						break;
// 					case 38:
// 						n = "&amp;";
// 						break;
// 					case 60:
// 						n = "&lt;";
// 						break;
// 					case 62:
// 						n = "&gt;";
// 						break;
// 					default:
// 						continue
// 				}
// 				c !== r && (s += a.substring(c, r)), c = r + 1, s += n
// 			}
// 			return c !== r ? s + a.substring(c, r) : s
// 		},
// 		pug_match_html: /["&<>]/,
// 		template: function template(locals) {
// 			var pug_html = "", pug_mixins = {}, pug_interp;
// 			;var locals_for_with = (locals || {});
// 			(function (name) {
// 				pug_html = pug_html + "\u003Cdiv\u003E\u003Cp\u003E" + (this.pugEscape(null == (pug_interp = name) ? "" : pug_interp)) + "'s Pug source code!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
// 			}.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined));
// 			;
// 			return pug_html;
// 		}
// 	}
//
// })();
//
//

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./CSS/index.css": 14,
	"./CSS/new.css": 15,
	"./blocks/form/index.css": 16,
	"./blocks/message/index.css": 17,
	"./configs/login-fields.css": 18,
	"./configs/signup-fields.css": 19
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 13;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=out.webpack.js.map