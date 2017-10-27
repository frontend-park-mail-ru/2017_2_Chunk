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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
  * Удаляет у текущего блока дочерний
  * @param {Block} block
  * @return {Block}
  */
	remove(block) {
		this.el.removeChild(block.el);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_eventBus__ = __webpack_require__(4);






class CommonView extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block_js__["default"] {
	constructor(blocks) {
		const view = document.createElement("section");
		const attrs = {
			"display": "flex",
			"flex-direction": "column",
			"align-items": "center",
			"justify-content": "center"
		};

		super(view);

		this.elements = blocks;

		for (const attr in attrs) {
			this.el.style.setProperty(attr, attrs[attr]);
		}

		for (const block in this.elements) {
			this.append(this.elements[block]);
		}
	}

	show() {
		setTimeout(() => {
			this.el.style.setProperty("display", "flex");
		}, 150);
		setTimeout(() => {
			this.el.classList.remove("hidden");
		}, 100);
	}

	hide() {
		this.el.classList.add("hidden");
		setTimeout(() => {
			this.el.style.setProperty("display", "none");
		}, 150);
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = CommonView;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(0);




/**
 * Базовый класс формы для отправки информационных сообщений в тело html документа
 * @module Message
 */
class Message extends __WEBPACK_IMPORTED_MODULE_0__block_block__["default"] {
	/**
  * Создает элемент div CSS класса message
  * @constructor
  */
	constructor() {
		const el = document.createElement('div');
		super(el);

		this.el.style.setProperty("text-align", "center");
		this.el.style.setProperty("font-size", "1.5em");

		// el.classList.add('message');
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(0);
/**
 * Базовый класс формы
 * @module Form
 */




class Form extends __WEBPACK_IMPORTED_MODULE_0__block_block__["default"] {
	/**
  * @param fields []- корневой элемент блока
  * @constructor
  */
	constructor(fields = []) {
		const el = document.createElement('form');
		super(el);

		fields.forEach(function (field) {
			const f = __WEBPACK_IMPORTED_MODULE_0__block_block__["default"].Create('input', field.attrs || {}, field.classes || []);
			this.append(f);
		}.bind(this));

		this.el.classList.add("form-block");
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


class EventBus {
	constructor() {
		this.listeners = {};
	}

	on(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		console.log("ON emitBus");
	}

	emit(event, data) {
		this.listeners[event].forEach(function (listener) {
			listener(data);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = EventBus;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(__webpack_require__(19));
requireAll(__webpack_require__(24));

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


class Cell {

	constructor() {}

	setCoordinates(x, y) {
		this.x = x;
		this.y = y;
	}

	setFigure(num) {
		this.figure = num;
	}

	setId(idx, idy) {
		this.idx = idx;
		this.idy = idy;
	}

	setBrightness(br) {
		this.brightness = br;
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Cell;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell_js__ = __webpack_require__(6);




let canvas1 = document.getElementById("1");
let canvasForCubes = canvas1.getContext('2d');
let canvas2 = document.getElementById("2");
let canvasForFigure = canvas2.getContext('2d');

const sideOfCube = 90;
const sideOfCanvas = 850;
const indent = 150;

class Field {

	constructor(count) {
		this.count = count;
		let imgUrl = [];
		imgUrl.push("images/cube.png");
		imgUrl.push("images/cubeBr.png");
		imgUrl.push("images/whitch90-130.png");
		imgUrl.push("images/jack90-130.png");

		let imgs = [];
		let ok = 0;

		for (let i = 0; i < imgUrl.length; i++) {
			let img = new Image();
			imgs.push(img);
			img.onload = function () {
				ok++;
				if (ok >= imgUrl.length) {}
			};
			img.src = imgUrl[i];
		}
		this.massOfUrl = [];
		this.massOfUrl = imgs;

		this.arrayOfCubes = this.setCoordinatesOnField();
	}

	setCoordinatesOnField() {
		let startOfFieldX = sideOfCanvas / 2 - sideOfCube / 2;
		let startOfFieldY = indent + (sideOfCanvas - indent - sideOfCube * this.count) / 2;
		let cubes = [];
		for (let i = 0; i < this.count; i++) {
			cubes[i] = [];
		}
		let diff = 0;
		// let id = 0;
		for (let i = 0; i < this.count; i++) {
			// id = (i+1)*10;
			let x = startOfFieldX + diff;
			let y = startOfFieldY + diff;
			for (let j = 0; j < this.count; j++) {
				cubes[i][j] = new __WEBPACK_IMPORTED_MODULE_0__cell_js__["default"]();
				cubes[i][j].setFigure(0);
				cubes[i][j].setBrightness(0);
				cubes[i][j].setId(i, j);
				// id++;
				cubes[i][j].setCoordinates(x, y);
				x -= sideOfCube / 2 + 2;
				y += sideOfCube / 2 + 2;
			}
			diff += sideOfCube / 2 + 2;
		}
		return cubes;
	}

	drawField() {
		canvasForCubes.fillStyle = 'white';
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let br = this.arrayOfCubes[i][j].brightness;
				canvasForCubes.drawImage(this.massOfUrl[br], this.arrayOfCubes[i][j].x, this.arrayOfCubes[i][j].y);
				canvasForCubes.font = 'bold 30px sans-serif';
				// canvasForCubes.fillText(this.arrayOfCubes[i][j].idx + ";" + this.arrayOfCubes[i][j].idy, this.arrayOfCubes[i][j].x+sideOfCube/2-20, this.arrayOfCubes[i][j].y+sideOfCube/2);
			}
		}
	}

	clearField() {
		canvasForCubes.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	findById(idx, idy) {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].idx === idx && this.arrayOfCubes[i][j].idy === idy) return this.arrayOfCubes[i][j];
			}
		}
	}

	setFigure(idx, idy, num) {
		this.findById(idx, idy).setFigure(num);
	}

	deleteFigure(idx, idy) {
		this.findById(idx, idy).setFigure(0);
	}

	drawFigures(idx, idy) {
		canvasForFigure.drawImage(this.massOfUrl[this.findById(idx, idy).figure], this.findById(idx, idy).x + 5, this.findById(idx, idy).y - 70);
	}

	drawAllFigures() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].figure > 1) {
					canvasForFigure.drawImage(this.massOfUrl[this.arrayOfCubes[i][j].figure], this.arrayOfCubes[i][j].x + 5, this.arrayOfCubes[i][j].y - 65);
				}
			}
		}
	}

	clearFigures() {
		canvasForFigure.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	test() {
		canvasForCubes.lineWidth = 2;
		canvasForCubes.strokeStyle = 'white';
		canvasForCubes.beginPath();
		canvasForCubes.rect(200, 200, 100, 200);
		canvasForCubes.stroke();
		canvasForCubes.closePath();
		console.log(canvasForCubes.isPointInPath(250, 250));
		console.log(canvasForCubes.isPointInPath(100, 100));
	}

	brightCubes(idx, idy) {
		// let id1 = Math.floor(id/10);
		// let id2 = id % 10;
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let idx2 = this.arrayOfCubes[i][j].idx;
				let idy2 = this.arrayOfCubes[i][j].idy;
				if (Math.abs(idx2 - idx) >= 3 || Math.abs(idy2 - idy) >= 3 || this.arrayOfCubes[i][j].figure !== 0) {} else {
					this.arrayOfCubes[i][j].setBrightness(1);
				}
				this.findById(idx, idy).setBrightness(0);
			}
		}
	}

	deleteAllBrightCube() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.arrayOfCubes[i][j].setBrightness(0);
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Field;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class MenuView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, router) {
		const menuElems = {
			profile: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', { 'data-section': 'profile' }, ['profile', 'auth'], ''),
			play: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'play', 'href': '/play' }, ['button', 'auth', 'menu__button'], 'Играть'),
			signup: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'signup', 'href': '/signup' }, ['button', 'unauth', 'menu__button'], 'Зарегистрироваться'),
			login: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'login', 'href': '/login' }, ['button', 'unauth', 'menu__button'], 'Вход'),
			settings: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'settings', 'href': '/settings' }, ['button', 'auth', 'menu__button'], 'Настройки'),
			rules: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'rules', 'href': '/rules' }, ['button', "every-available", 'menu__button'], 'Правила'),
			scores: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'scores', 'href': '/scoreboard' }, ['button', 'unauth', 'menu__button'], 'Таблица лидеров'),
			exit: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'exit', 'href': '/exit' }, ['button', 'auth', 'menu__button'], 'Выход')
		};
		super(menuElems);

		this.bus = eventBus;

		this.bus.on("unauth", function () {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("unauth") || this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].show();
				} else this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.on("auth", function () {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("auth") || this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].show();
				} else this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.emit("unauth");
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MenuView;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(2);






class signUpView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const signUpFields = [{ attrs: {
				type: "text",
				size: "128",
				name: "name",
				placeholder: "Enter your name",
				required: "required",
				class: "form-block__input "
			} }, { attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "Enter your email",
				required: "required",
				class: "form-block__input "
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "form-block__input "
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "confirm",
				placeholder: "Confirm password",
				required: "required",
				class: "form-block__input "
			} }, { attrs: {
				type: "submit",
				value: "submit",
				class: "form-block__button"
			} }];
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](signUpFields);
		super({ form });

		this.bus = eventBus;
		this.userService = userService;
		this.router = router;

		this.hide();

		this.message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", function (event) {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);
		}.bind(this), true);
	}

	onSubmit(formData) {
		this.userService.signup(formData.name, formData.email, formData.password, formData.confirm).then(function (resp) {
			console.dir(resp);
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth");
			this.router.goTo("/menu");
		}.bind(this)).catch(function (err) {
			console.log("some err with sign up");
			console.log("err: ", err.message);
			this.setErrorText(err); //нужно поставить ошибку из json
		}.bind(this));
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = signUpView;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(2);






class LoginView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const loginFields = [{ attrs: {
				type: "text",
				size: "128",
				name: "username",
				placeholder: "Enter your name",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "submit",
				value: "submit",
				class: "form-block__button"
			} }];
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](loginFields);
		super({ form });

		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.hide();

		this.el.addEventListener("submit", function (event) {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);
		}.bind(this), true);
	}

	onSubmit(formData) {
		this.userService.login(formData.username, formData.password).then(function (resp) {
			console.dir(resp);
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth");
			this.router.goTo("/menu");
		}.bind(this)).catch(function (err) {
			console.log("some err with sign up");
			console.log("err: ", err.message);
			this.setErrorText(err); //нужно поставить ошибку из json
		}.bind(this));
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = LoginView;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class backButtonView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor() {
		const backButton = {
			back: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'href': '/menu' }, ["back__button"], 'Back')
		};
		super(backButton);

		this.el.style.setProperty("align-items", "flex-start");
		this.el.style.setProperty("border", "none");

		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = backButtonView;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class profileView extends __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"] {
	constructor(eventBus) {
		const profile = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', {}, ['userData', 'auth', 'profile']);
		super(profile.el);

		this.bus = eventBus;
		this.bus.on("unauth", () => {
			this.hide();
		});
		this.bus.on("auth", username => {
			this.setText(username);
			this.show();
		});

		this.hide();
	}

	render(username) {
		this.setText(username);
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = profileView;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class rulesView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(emitBus) {
		const rules = {
			back: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', {}, ['rulesText', 'back'], 'text Text text')
		};

		super(rules);

		this.bus = emitBus;

		this.hide();

		this.bus.on("openRules", () => {
			this.show();
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = rulesView;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_scoreBoard__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commonView__ = __webpack_require__(1);





class ScoreboardView extends __WEBPACK_IMPORTED_MODULE_1__commonView__["default"] {
	constructor(EventBus, UserService) {
		super();

		this.bus = EventBus;
		// this.userService = UserService;

		this.bus.on("openScoreboard", () => {
			const users = [{ name: 'Igor', score: '1904' }, { name: 'Sasha', score: '2010' }];
			this.update(users);
			this.show();
		});
	}

	update(users = []) {
		console.log('Scoreboard.update', users[0]);
		this.clear();
		const scoreboardTemplate = new __WEBPACK_IMPORTED_MODULE_0__templates_scoreBoard__["default"]();
		this.el.innerHTML = scoreboardTemplate.template({ users });
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = ScoreboardView;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


class scoreboardTemplate {
	constructor() {
		this.pug_match_html = /["&<>]/;
	}

	pug_escape(e) {
		var a = "" + e,
		    t = this.pug_match_html.exec(a);
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
	}

	template(locals) {
		var pug_html = "",
		    pug_mixins = {},
		    pug_interp;
		;var locals_for_with = locals || {};
		(function (users) {
			pug_html = pug_html + "\u003Cdiv class=\"scoreboard__fields\"\u003E";
			// iterate users
			;(function () {
				var $$obj = users;
				if ('number' == typeof $$obj.length) {
					for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Cdiv\u003E\u003Cspan\u003E" + this.pug_escape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + this.pug_escape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
					}
				} else {
					var $$l = 0;
					for (var pug_index0 in $$obj) {
						$$l++;
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Cdiv\u003E\u003Cspan\u003E" + this.pug_escape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003Cspan\u003E" + this.pug_escape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
					}
				}
			}).call(this);

			pug_html = pug_html + "\u003C\u002Fdiv\u003E";
		}).call(this, "users" in locals_for_with ? locals_for_with.users : typeof users !== "undefined" ? users : undefined);
		;
		return pug_html;
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = scoreboardTemplate;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(17);


//по урлу exit не поулчается выйти



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
  * @param {string} username
  * @param {string} email
  * @param {string} password
  * @param {string} confirm
  */
	signup(username, email, password, confirm) {
		//не парсит JSON
		return new Promise(function (resolve, reject) {
			if (username.length < 4) {
				throw new Error("Длина логина должна быть не меньше 4 символов!");
			}
			if (username.length > 12) {
				throw new Error("Длина логина не должна превышать 12 символов!");
			}
			if (password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!");
			}
			if (password !== confirm) {
				throw new Error("Пароли не совпадают!!!");
			}
			if (password === username) {
				throw new Error("Логин и пароль не должны совпадать!");
			}

			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/sign_up', { username, email, password }).then(function (resp) {
				console.log("good response status" + resp.username);
				return resp;
			}.bind(this)).catch(function (err) {
				//не могу достать errorMessage
				console.info(err);
				console.log("err response status " + err.errorMessage);
				throw new Error(err.errorMessage);
			}.bind(this)));
		});
	}

	/**
  * Авторизация пользователя
  * @param {string} login
  * @param {string} password
  * @param {Function} callback
  */
	login(login, password) {
		return new Promise(function (resolve, reject) {
			if (login.length < 4) {
				throw new Error("Длина логина должна быть не меньше 4 символов!", null);
				return;
			}
			if (login.length > 12) {
				throw new Error("Длина логина не должна превышать 12 символов!", null);
				return;
			}
			if (password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!", null);
				return;
			}
			if (password === login) {
				throw new Error("Логин и пароль не могут совпадать!", null);
				return;
			}
			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/sign_in', { login, password }).then(function (resp) {
				console.log("good response status" + resp.username);
				return resp;
			}.bind(this)).catch(function (err) {
				//не могу достать errorMessage
				console.log(err.errormessage);
				console.log("err response status " + err.errorMessage);
				throw new Error(err.errorMessage);
			}.bind(this)));
		});
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
  * @return {Promise} - возвращает функцию колбек с результатом запроса или ошибкой
  */
	getDataFetch(force = false) {
		if (this.isLoggedIn() && !force) {
			return new Promise(function (resolve, reject) {
				resolve(this.user);
			}.bind(this));
		}
		return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/whoisit').then(function (resp) {

			this.user = resp;
			return this.user;
		}.bind(this)).catch(function (err) {
			this.user = null;
			console.log(err.statusText);
			throw new Error("Can not get response =(");
		}.bind(this));
	}

	/**
  * Разлогинивает
  */
	logout() {
		if (this.isLoggedIn()) {
			this.user = null;
			this.users = [];
			__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/exit').catch(function (err) {
				//получить ошибки с сервера
				console.log(err.errorMessage); //удаляет куку на клиенте, но при запросе на whoiit возвращает пользователя
			});
		}
	}

	loadUsersList() {
		return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('');
	}

	/**
  * Загружает список всех пользователей
  * @param callback
  */
	// loadUsersList(callback) {
	// 	Http.Get('/users', function (err, users) {
	// 		if (err) {
	// 			return callback(err, users);
	// 		}
	//
	// 		this.users = users;
	//
	// 		if (this.isLoggedIn()) {
	// 			this.users = this.users.map(user => {
	// 				if (user.email === this.user.email) {
	// 					user.me = user;
	// 				}
	// 				return user;
	// 			});
	// 		}
	//
	// 		callback(null, this.users);
	// 	}.bind(this));
	// }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = UserService;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


//в Fetch post не получается получить в ответ объект json c ошибкой
// const backendUrl = 'https://chunkgame.herokuapp.com';

const backendUrl = "https://backend-java-spring.herokuapp.com/user";
const baseUrl = `${window.location.protocol}//${window.location.host}`;

console.log("baseUrl = ", baseUrl);
/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

class Http {
	//что попадает в throw response
	/**
  * Выполняет GET-запрос по указанному адресу
  * @param {string} address - адрес запроса
  */
	static FetchGet(address) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", 'application/json; charset=utf-8');
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: myHeaders
		}).then(function (response) {
			let json = response.json();
			if (response.status >= 400) {
				return json.then(resp => {
					throw resp;
				});
			}
			return json;
		});
	}

	/**
  * Выполняет POST-запрос по указанному адресу
  * @param {Object} body - body-request
  * @param {string} address - адрес запроса
  */

	//Не получается получить из json errMessage.
	static async FetchPost(address, body) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.set("Content-Type", "application/json; charset=utf-8");
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: myHeaders
			// headers: {
			// 	'Content-Type': 'application/json; charset=utf-8'
			// }
		}).then(function (response) {
			let json = response.json();
			if (response.status >= 400) {
				return json.then(resp => {
					throw resp;
				});
			}
			return json;
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Http;

Http.BaseUrl = null;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__ = __webpack_require__(0);




class Router {
	constructor(eventBus, userService) {
		this.routes = [{
			url: "/menu",
			event: "openMenu"
		}, {
			url: "/exit",
			event: "exit"
		}, {
			url: "/scoreboard",
			event: "openScoreboard"
		}, {
			url: "/rules",
			event: "openRules"
		}, {
			url: "/signup",
			event: "openSignUp"
		}, {
			url: "/login",
			event: "openLogin"
		}];

		this.bus = eventBus;
		this.userService = userService;
		this.app = new __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["default"](document.body);

		//реагирует на любые клики. в том числе и сабмиты
		this.app.on("click", event => {
			const target = event.target;
			const type = target.tagName.toLowerCase();
			if (type === 'a') {
				event.preventDefault();
				this.goTo(target.href);
				return;
			}
		}, false);

		window.onpopstate = function () {
			console.log(location.pathname);
			this.changeState(location.pathname);
			return;
		}.bind(this);
	}

	start() {
		this._routes = [];
		this.routes.forEach(function (route) {
			this._routes.push({
				url_pattern: route.url,
				emit: function (event) {
					this.bus.emit(event);
				}.bind(this)
			});
		}.bind(this));

		let auth = this.userService.isLoggedIn();

		if (auth) {
			for (let i = 0; i < 4; i++) {
				if (location.pathname.match(this._routes[i].url_pattern)) {
					window.history.pushState({ page: this.routes[number].url }, route.url_pattern, route.url_pattern);
					this._routes[i].emit(this.routes[i].event);
					return;
				}
			}
			window.history.pushState({ page: this.routes[0].url }, this.routes[0].url, this.routes[0].url);
			this._routes[0].emit(this._routes[0].event);
		} else {
			this._routes.forEach(function (route, number) {
				if (location.pathname.match(route.url_pattern)) {
					//match вернет null при отсутсвии совпадения
					window.history.pushState({ page: this.routes[number].url }, route.url_pattern, route.url_pattern);
					route.emit(this.routes[number].event);
				}
			}.bind(this));
		}
	}

	goTo(path) {
		this._routes.forEach((route, number) => {
			if (path.match(route.url_pattern)) {
				window.history.pushState({ page: "bla" }, "bla", route.url_pattern);
				route.emit(this.routes[number].event);
				return;
			}
		});
	}

	//для кнопки назад и вперед
	changeState(path) {
		this._routes.forEach((route, number) => {
			if (path.match(route.url_pattern)) {
				route.emit(this.routes[number].event);
				return;
			}
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Andrey/cell.js": 6,
	"./Andrey/field.js": 7,
	"./Andrey/gameHandler.js": 20,
	"./blocks/block/block.js": 0,
	"./blocks/form/form.js": 3,
	"./blocks/message/message.js": 2,
	"./configs/login-fields.js": 21,
	"./configs/signup-fields.js": 22,
	"./include.js": 5,
	"./main.js": 23,
	"./modules/eventBus.js": 4,
	"./modules/http.js": 17,
	"./modules/router.js": 18,
	"./services/user-service.js": 16,
	"./templates/scoreBoard.js": 15,
	"./views/backButtonView.js": 11,
	"./views/commonView.js": 1,
	"./views/loginView.js": 10,
	"./views/menuView.js": 8,
	"./views/profileView.js": 12,
	"./views/rulesView.js": 13,
	"./views/scoreboardView.js": 14,
	"./views/signUpView.js": 9
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
webpackContext.id = 19;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field_js__ = __webpack_require__(7);



let canvasForClicks = document.getElementById("2");
// let ctx = canvasForClicks.getContext('2d');

let z = new __WEBPACK_IMPORTED_MODULE_0__field_js__["default"](6);
canvasForClicks.addEventListener('click', updateCanvas, false);

const x = 425;
const y = 230;
const sq = Math.sqrt(2) / 2;
const side = 64;

window.onload = function () {
	z.drawField();
	// z.setFigure(1, 2, 2);
	// z.setFigure(3, 1, 3);
	// z.setFigure(5, 5, 2);
	// z.setFigure(4, 3, 3);
	// z.setFigure(5, 2, 2);
	// z.setFigure(3, 4, 3);
	// z.drawAllFigures();
	// z.brightCubes(5, 4);
	// z.drawField();
};

function findOffset(obj) {
	let curX = 0;
	let curY = 0;
	if (obj.offsetParent) {
		do {
			curX += obj.offsetLeft;
			curY += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curX, y: curY };
	}
}

function updateCanvas(e) {
	let pos = findOffset(canvasForClicks);

	let mouseX = e.pageX - pos.x;
	let mouseY = e.pageY - pos.y;

	let XX = (mouseX - x + mouseY - y) * sq;
	let YY = (mouseY - mouseX + x - y) * sq;

	if (XX < side * 6 && YY < side * 6 && XX > 0 && YY > 0) {
		let idx;
		let idy;
		for (let i = 0; i < 6; i++) {
			if (XX > side * i) idx = i;
		}
		for (let i = 0; i < 6; i++) {
			if (YY > side * i) idy = i;
		}
		z.deleteAllBrightCube();
		z.brightCubes(idx, idy);
		z.drawField();
	}
}

// let canvas,ctx, mouseX = 999, mouseY = 999,circles = new Array();
// let num = Math.floor(Math.random()*30-10)+10;
//
// function init(){
// 	canvas = document.getElementById('2');
// 	ctx = canvas.getContext('2d');
//
// 	for(let i=0; i < num; i++){
// 		circles[i] = {
// 			x: Math.floor(Math.random()*canvas.width),
// 			y : Math.floor(Math.random()*canvas.height),
// 			r : Math.floor(Math.random()*60-10)+10
// 		}
// 	}
// 	drawCanvas();
// 	canvas.addEventListener('mousemove',updateCanvas,false);
//
// }
//
// init();
//
// function findOffset(obj) {
// 	let curX = 0;
// 	let curY = 0;
// 	if (obj.offsetParent) {
// 		do {
// 			curX += obj.offsetLeft;
// 			curY += obj.offsetTop;
// 		} while (obj = obj.offsetParent);
// 		return {x:curX,y:curY};
// 	}
// }
//
// function updateCanvas(e){
// 	let pos = findOffset(canvas);
//
// 	mouseX = e.pageX - pos.x;
// 	mouseY = e.pageY - pos.y;
//
// 	ctx.clearRect(0,0,canvas.width,canvas.height);
// 	drawCanvas();
// }
//
//
// function drawCanvas() {
//
// 	for(let i = 0; i < num; i++){
// 		ctx.beginPath();
// 		ctx.fillStyle = 'rgba(0,0,0,.5)';
//
// 		ctx.arc(circles[i].x,circles[i].y,circles[i].r,0,Math.PI*2,false);
// 		if(ctx.isPointInPath(mouseX,mouseY)){
// 			ctx.fillStyle = 'red';
// 		}
// 		ctx.fill();
// 	}
// }

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menuView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signUpView__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_loginView__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_profileView__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_rulesView__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__blocks_block_block_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_service_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_eventBus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__blocks_message_message__ = __webpack_require__(2);

/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

























const userService = new __WEBPACK_IMPORTED_MODULE_8__services_user_service_js__["default"]();

const eventBus = new __WEBPACK_IMPORTED_MODULE_9__modules_eventBus__["default"]();

const router = new __WEBPACK_IMPORTED_MODULE_10__modules_router__["default"](eventBus, userService);

const app = new __WEBPACK_IMPORTED_MODULE_7__blocks_block_block_js__["default"](document.body);

const menuView = new __WEBPACK_IMPORTED_MODULE_0__views_menuView__["default"](eventBus, router);

const signUpView = new __WEBPACK_IMPORTED_MODULE_1__views_signUpView__["default"](eventBus, userService, router);

const loginView = new __WEBPACK_IMPORTED_MODULE_2__views_loginView__["default"](eventBus, userService, router);

const backButtonView = new __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__["default"]();

const profileView = new __WEBPACK_IMPORTED_MODULE_4__views_profileView__["default"](eventBus);

const rulesView = new __WEBPACK_IMPORTED_MODULE_5__views_rulesView__["default"](eventBus);

const scoreboardView = new __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__["default"](eventBus, userService);

// backButtonView.on("click", function(event) {
// 	window.history.back();
// 	event.preventDefault();
// 	eventBus.emit("openMenu");
// });


eventBus.on("openSignUp", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/signup");
	menuView.hide();
	signUpView.show();
	backButtonView.show();
	loginView.hide();
	scoreboardView.hide();
});

eventBus.on("openLogin", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	menuView.hide();
	signUpView.hide();
	backButtonView.show();
	loginView.show();
	rulesView.hide();
});

eventBus.on("openRules", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/rules");
	menuView.hide();
	signUpView.hide();
	backButtonView.show();
	loginView.hide();
	rulesView.show();
});

eventBus.on("openMenu", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/menu");
	signUpView.hide();
	backButtonView.hide();
	loginView.hide();
	rulesView.hide();
	scoreboardView.hide();
	menuView.show();

	userService.getDataFetch().then(function (resp) {
		console.log(resp);
		eventBus.emit("auth", resp.username);
	}).catch(function (err) {
		const user = { username: null };
		profileView.render(user.username);
		profileView.hide();
		console.log(err.message);
	});
}.bind(this));

//отследить ексепшены при отсутствии интернета
eventBus.on("exit", function () {
	userService.logout();
	profileView.hide();
	eventBus.emit("unauth");
	router.goTo('/menu');
});

eventBus.on("openScoreboard", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/scoreboard");
	menuView.hide();
	backButtonView.show();
	scoreboardView.show();
});

app.append(menuView).append(signUpView).append(loginView).append(backButtonView).append(profileView).append(rulesView).append(scoreboardView);

router.start();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Andrey/style.css": 25,
	"./blocks/message/index.css": 26,
	"./configs/login-fields.css": 27,
	"./configs/signup-fields.css": 28,
	"./views/viewsCss/backButton.css": 29,
	"./views/viewsCss/commonView.css": 30,
	"./views/viewsCss/login.css": 31,
	"./views/viewsCss/menu.css": 32,
	"./views/viewsCss/signUp.css": 33,
	"./views/viewsCss/view.css": 34
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
webpackContext.id = 24;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=application.js.map