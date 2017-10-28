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
		// const attrs = {
		//
		// 	};


		super(view);

		this.elements = blocks;

		// for (const attr in attrs) {
		// 	this.el.style.setProperty(attr, attrs[attr]);
		// }

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

		this.fields = [];
		fields.forEach(function (field) {
			const f = __WEBPACK_IMPORTED_MODULE_0__block_block__["default"].Create('input', field.attrs || {}, field.classes || []);
			this.fields.push(f);
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
/* 3 */
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

		this.el.classList.add("message");

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

requireAll(__webpack_require__(22));
requireAll(__webpack_require__(26));

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




const sideOfCube = 90;
const sideOfCanvas = 850;
const indent = 150;

class Field {

	constructor(count, canvas1, canvas2) {
		this.count = count;
		let imgUrl = [];
		imgUrl.push("images/cube.png");
		imgUrl.push("images/cubeBr.png");
		imgUrl.push("images/whitch90-130.png");
		imgUrl.push("images/jack90-130.png");

		let imgs = [];
		let ok = 0;

		// this.canvas1 = canvas1;
		this.canvasForCubes = canvas1;
		// this.canvas2 = canvas2;
		this.canvasForFigure = canvas2;

		// const canvas1 = document.getElementById("1");
		// const canvas2 = document.getElementById("2");
		// this.canvasForCubes = canvas1.getContext('2d');
		// this.canvasForFigure = canvas2.getContext('2d');


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
		for (let i = 0; i < this.count; i++) {
			let x = startOfFieldX + diff;
			let y = startOfFieldY + diff;
			for (let j = 0; j < this.count; j++) {
				cubes[i][j] = new __WEBPACK_IMPORTED_MODULE_0__cell_js__["default"]();
				cubes[i][j].setFigure(0);
				cubes[i][j].setBrightness(0);
				cubes[i][j].setId(i, j);
				cubes[i][j].setCoordinates(x, y);
				x -= sideOfCube / 2 + 2;
				y += sideOfCube / 2 + 2;
			}
			diff += sideOfCube / 2 + 2;
		}
		return cubes;
	}

	drawField() {
		this.canvasForCubes.fillStyle = 'white';
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let br = this.arrayOfCubes[i][j].brightness;
				this.canvasForCubes.drawImage(this.massOfUrl[br], this.arrayOfCubes[i][j].x, this.arrayOfCubes[i][j].y);
				this.canvasForCubes.font = 'bold 30px sans-serif';
				this.canvasForCubes.fillText(this.arrayOfCubes[i][j].idx + ";" + this.arrayOfCubes[i][j].idy, this.arrayOfCubes[i][j].x + sideOfCube / 2 - 20, this.arrayOfCubes[i][j].y + sideOfCube / 2);
			}
		}
	}

	clearField() {
		this.canvasForCubes.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
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
		this.canvasForFigure.drawImage(this.massOfUrl[this.findById(idx, idy).figure], this.findById(idx, idy).x + 5, this.findById(idx, idy).y - 70);
	}

	drawAllFigures() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].figure > 1) {
					this.canvasForFigure.drawImage(this.massOfUrl[this.arrayOfCubes[i][j].figure], this.arrayOfCubes[i][j].x + 5, this.arrayOfCubes[i][j].y - 65);
				}
			}
		}
	}

	clearFigures() {
		this.canvasForFigure.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	brightCubes(idx, idy) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field_js__ = __webpack_require__(7);




class Game {

	constructor(canvas1, canvas2) {
		// window.onload = () => {
		// 	this.canvas1 = document.getElementById("1");
		// 	this.canvas2 = document.getElementById("2")
		this.canvasForCubes = canvas1;
		this.canvasForFigure = canvas2;
		this.field = new __WEBPACK_IMPORTED_MODULE_0__field_js__["default"](6, this.canvasForCubes, this.canvasForFigure);
		// };
	}

	start(exit) {
		this.field.drawField();
		this.field.setFigure(2, 2, 3);
		this.field.setFigure(5, 5, 2);
		this.field.drawAllFigures();

		// this.exit = exit;
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Game;
;
// let canvasForClicks = document.getElementById("2");
// // let ctx = canvasForClicks.getContext('2d');
//
// let z = new Field(6);
// canvasForClicks.addEventListener('click', updateCanvas, false);
//
// const x = 425;
// const y = 230;
// const sq = Math.sqrt(2)/2;
// const side = 64;
//
// window.onload = function () {
// 	z.drawField();
// 	// z.setFigure(1, 2, 2);
// 	// z.setFigure(3, 1, 3);
// 	// z.setFigure(5, 5, 2);
// 	// z.setFigure(4, 3, 3);
// 	// z.setFigure(5, 2, 2);
// 	// z.setFigure(3, 4, 3);
// 	// z.drawAllFigures();
// 	// z.brightCubes(5, 4);
// 	// z.drawField();
// };
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
// 	let pos = findOffset(canvasForClicks);
//
// 	let mouseX = e.pageX - pos.x;
// 	let mouseY = e.pageY - pos.y;
//
// 	let XX = (mouseX - x + mouseY - y)*sq;
// 	let YY = (mouseY - mouseX + x - y)*sq;
//
// 	if (XX < side*6 && YY < side*6 && XX > 0 && YY > 0) {
// 		let idx;
// 		let idy;
// 		for (let i = 0; i < 6; i++) {
// 			if (XX > side*i)
// 				idx = i;
// 		}
// 		for (let i = 0; i < 6; i++) {
// 			if (YY > side*i)
// 				idy = i;
// 		}
// 		z.deleteAllBrightCube();
// 		z.brightCubes(idx, idy);
// 		z.drawField();
// 	}
// }
//
// // let canvas,ctx, mouseX = 999, mouseY = 999,circles = new Array();
// // let num = Math.floor(Math.random()*30-10)+10;
// //
// // function init(){
// // 	canvas = document.getElementById('2');
// // 	ctx = canvas.getContext('2d');
// //
// // 	for(let i=0; i < num; i++){
// // 		circles[i] = {
// // 			x: Math.floor(Math.random()*canvas.width),
// // 			y : Math.floor(Math.random()*canvas.height),
// // 			r : Math.floor(Math.random()*60-10)+10
// // 		}
// // 	}
// // 	drawCanvas();
// // 	canvas.addEventListener('mousemove',updateCanvas,false);
// //
// // }
// //
// // init();
// //
// // function findOffset(obj) {
// // 	let curX = 0;
// // 	let curY = 0;
// // 	if (obj.offsetParent) {
// // 		do {
// // 			curX += obj.offsetLeft;
// // 			curY += obj.offsetTop;
// // 		} while (obj = obj.offsetParent);
// // 		return {x:curX,y:curY};
// // 	}
// // }
// //
// // function updateCanvas(e){
// // 	let pos = findOffset(canvas);
// //
// // 	mouseX = e.pageX - pos.x;
// // 	mouseY = e.pageY - pos.y;
// //
// // 	ctx.clearRect(0,0,canvas.width,canvas.height);
// // 	drawCanvas();
// // }
// //
// //
// // function drawCanvas() {
// //
// // 	for(let i = 0; i < num; i++){
// // 		ctx.beginPath();
// // 		ctx.fillStyle = 'rgba(0,0,0,.5)';
// //
// // 		ctx.arc(circles[i].x,circles[i].y,circles[i].r,0,Math.PI*2,false);
// // 		if(ctx.isPointInPath(mouseX,mouseY)){
// // 			ctx.fillStyle = 'red';
// // 		}
// // 		ctx.fill();
// // 	}
// // }
//
//
//

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class MenuView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, router) {
		const menuElems = {
			profile: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', { 'data-section': 'profile' }, ['profile', 'auth'], ''),
			play: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'play', 'href': '/game' }, ['button', 'auth', 'menu__button'], 'Играть'),
			signup: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'signup', 'href': '/signup' }, ['button', 'unauth', 'menu__button'], 'Зарегистрироваться'),
			login: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'login', 'href': '/login' }, ['button', 'unauth', 'menu__button'], 'Вход'),
			update: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'update', 'href': '/update' }, ['button', 'auth', 'menu__button'], 'Настройки'),
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);






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

		this.form = form;
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
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth");
			this.router.goTo("/menu");
		}.bind(this)).catch(function (err) {
			this.setErrorText(err);
		}.bind(this));
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = signUpView;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);






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

		this.form = form;
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
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth");
			this.router.goTo("/menu");
		}.bind(this)).catch(function (err) {
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class backButtonView extends __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"] {
	constructor() {
		const backButton = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'href': '/menu' }, ["back__button"], 'Back');
		super(backButton.el);

		this.button = backButton;
		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = backButtonView;


/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_scoreBoard__ = __webpack_require__(16);
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);






class updateView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const updateFields = [{ attrs: {
				type: "text",
				size: "128",
				name: "username",
				placeholder: "name",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "email",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "new password",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "old_password",
				placeholder: "old password",
				required: "required",
				class: "form-block__input"
			} }, { attrs: {
				type: "submit",
				value: "submit",
				class: "form-block__button"
			} }];
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](updateFields);
		super({ form });

		this.form = form;

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

		this.bus.on("openUpdate", function () {
			this.userService.getDataFetch().then(function (resp) {
				const username = this.form.fields[0].el;
				const email = this.form.fields[1].el;
				username.value = resp.username;
				email.value = resp.email;
			}.bind(this)).catch(function (err) {
				this.setErrorText(err);
			}.bind(this));
		}.bind(this));
	}

	onSubmit(formData) {
		this.userService.update(formData.username, formData.email, formData.password, formData.old_password).then(function (resp) {
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth");
			this.router.goTo("/menu");
		}.bind(this)).catch(function (err) {
			this.setErrorText(err);
		}.bind(this));
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = updateView;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class CanvasView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor() {
		const canvas1 = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('canvas', { 'id': '1', 'width': '850', 'height': '850' }, ['canv1'], "");
		const canvas2 = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('canvas', { 'id': '2', 'width': '850', 'height': '850' }, ['canv2'], "");
		// canvas.style.setProperty("position", "absolute");
		super([canvas1, canvas2]);

		this.el.style.setProperty("border", "none");
		this.el.style.setProperty("background-image", "./image/cats.jpg");

		this.canvas1 = canvas1;
		this.canvas2 = canvas2;

		this.ctx1 = this.canvas1.el.getContext('2d');
		this.ctx2 = this.canvas2.el.getContext('2d');

		this.canvas1.el.style.setProperty("position", "absolute");
		this.canvas2.el.style.setProperty("position", "absolute");
		this.hide();
	}

	show() {
		setTimeout(() => {
			this.el.style.setProperty("display", "flex");
		}, 0);
		setTimeout(() => {
			this.el.classList.remove("hidden");
		}, 0);
	}

	hide() {
		this.el.classList.add("hidden");
		setTimeout(() => {
			this.el.style.setProperty("display", "none");
		}, 0);
	}

}
/* harmony export (immutable) */ __webpack_exports__["default"] = CanvasView;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(20);


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

			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/sign_up', { username, email, password }).then(function (resp) {
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
  */
	login(login, password) {
		return new Promise(function (resolve, reject) {
			if (login.length < 4) {
				throw new Error("Длина логина должна быть не меньше 4 символов!", null);
			}
			if (login.length > 12) {
				throw new Error("Длина логина не должна превышать 12 символов!", null);
			}
			if (password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!", null);
			}
			if (password === login) {
				throw new Error("Логин и пароль не могут совпадать!", null);
			}
			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/sign_in', { login, password }).then(function (resp) {
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
  * Обновляет данные существующего пользователя
  * @param {string} username
  * @param {string} email
  * @param {string} password
  * @param {string} old_password
  */
	update(username, email, password, old_password) {
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
			if (old_password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!");
			}
			if (password === username) {
				throw new Error("Логин и пароль не должны совпадать!");
			}
			if (old_password === username) {
				throw new Error("Логин и пароль не должны совпадать!");
			}

			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/update', { username, email, password, old_password }).then(function (resp) {
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
	async getDataFetch(force = false) {
		if (this.isLoggedIn() && !force) {
			return await new Promise(function (resolve, reject) {
				resolve(this.user);
			}.bind(this));
		}
		return await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/user/whoisit').then(function (resp) {
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
			__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/user/exit').catch(function (err) {
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


//в Fetch post не получается получить в ответ объект json c ошибкой
// const backendUrl = 'https://chunkgame.herokuapp.com';

const backendUrl = "https://backend-java-spring.herokuapp.com";
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
/* 21 */
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
			url: "/update",
			event: "openUpdate"
		}, {
			url: "/signup",
			event: "openSignUp"
		}, {
			url: "/login",
			event: "openLogin"
		}, {
			url: "/game",
			event: "openGame"
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

		let auth = this.userService.getDataFetch().then(async function (resp) {
			return await resp;
		}).catch(function (err) {
			return null;
		});
		if (auth !== null) {
			for (let i = 0; i < 5; i++) {
				if (location.pathname.match(this._routes[i].url_pattern)) {
					window.history.pushState({ page: this.routes[i].url }, this.routes[i].url, this.routes[i].url);
					this._routes[i].emit(this.routes[i].event);
					return;
				}
			}
			window.history.pushState({ page: this.routes[0].url }, this.routes[0].url, this.routes[0].url);
			this.goTo(this._routes[0].url_pattern);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Andrey/cell.js": 6,
	"./Andrey/field.js": 7,
	"./Andrey/gameHandler.js": 8,
	"./blocks/block/block.js": 0,
	"./blocks/form/form.js": 2,
	"./blocks/message/message.js": 3,
	"./configs/login-fields.js": 23,
	"./configs/signup-fields.js": 24,
	"./include.js": 5,
	"./main.js": 25,
	"./modules/eventBus.js": 4,
	"./modules/http.js": 20,
	"./modules/router.js": 21,
	"./services/user-service.js": 19,
	"./templates/scoreBoard.js": 16,
	"./views/backButtonView.js": 12,
	"./views/canvasView.js": 18,
	"./views/commonView.js": 1,
	"./views/loginView.js": 11,
	"./views/menuView.js": 9,
	"./views/profileView.js": 13,
	"./views/rulesView.js": 14,
	"./views/scoreboardView.js": 15,
	"./views/signUpView.js": 10,
	"./views/updateView.js": 17
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
webpackContext.id = 22;

/***/ }),
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menuView__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signUpView__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_loginView__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_profileView__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_rulesView__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_updateView__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_canvasView__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__blocks_block_block_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_user_service_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_eventBus__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_router__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Andrey_gameHandler__ = __webpack_require__(8);

/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */





























const userService = new __WEBPACK_IMPORTED_MODULE_10__services_user_service_js__["default"]();

const eventBus = new __WEBPACK_IMPORTED_MODULE_11__modules_eventBus__["default"]();

const router = new __WEBPACK_IMPORTED_MODULE_12__modules_router__["default"](eventBus, userService);

const app = new __WEBPACK_IMPORTED_MODULE_9__blocks_block_block_js__["default"](document.body);

const menuView = new __WEBPACK_IMPORTED_MODULE_0__views_menuView__["default"](eventBus, router);

const signUpView = new __WEBPACK_IMPORTED_MODULE_1__views_signUpView__["default"](eventBus, userService, router);

const loginView = new __WEBPACK_IMPORTED_MODULE_2__views_loginView__["default"](eventBus, userService, router);

const updateView = new __WEBPACK_IMPORTED_MODULE_7__views_updateView__["default"](eventBus, userService, router);

const backButtonView = new __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__["default"]();

const profileView = new __WEBPACK_IMPORTED_MODULE_4__views_profileView__["default"](eventBus);

const rulesView = new __WEBPACK_IMPORTED_MODULE_5__views_rulesView__["default"](eventBus);

const scoreboardView = new __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__["default"](eventBus, userService);

const canvas = new __WEBPACK_IMPORTED_MODULE_8__views_canvasView__["default"]();

const game = new __WEBPACK_IMPORTED_MODULE_13__Andrey_gameHandler__["default"](canvas.ctx1, canvas.ctx1);

const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backButtonView);
Views.push(profileView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(canvas);
// backButtonView.on("click", function(event) {
// 	window.history.back();
// 	event.preventDefault();
// 	eventBus.emit("openMenu");
// });

let counter = 0;

eventBus.on("openSignUp", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/signup");
	Views.forEach(view => {
		view.hide();
	});
	signUpView.show();
	backButtonView.show();
});

eventBus.on("openLogin", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	Views.forEach(view => {
		view.hide();
	});
	loginView.show();
	backButtonView.show();
});

eventBus.on("openUpdate", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	Views.forEach(view => {
		view.hide();
	});
	updateView.show();
	backButtonView.show();
});

eventBus.on("openRules", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/rules");
	Views.forEach(view => {
		view.hide();
	});
	rulesView.show();
	backButtonView.show();
});

eventBus.on("openMenu", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/menu");
	Views.forEach(view => {
		view.hide();
	});
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
	Views.forEach(view => {
		view.hide();
	});
	scoreboardView.show();
	backButtonView.show();
});

eventBus.on("openGame", function () {
	debugger;
	if (this.counter === 0) {
		document.location.href = "https://amigolandistr.com/ldownload/amigo_dexp.exe?amigo_install=1&partnerid=848000&ext_partnerid=dse.1%3A848001%2Cdse.2%3A848002%2Chp.1%3A848003%2Chp.2%3A848004%2Cpult.1%3A848005%2Cpult.2%3A848006%2Cvbm.1%3A848007%2Cvbm.2%3A848008%2Cany%3A848009&am_default=1&dse_install=1&hp_install=1&vbm_install=1&attr=900029aosg&rfr=900029&ext_params=old_mr1lad%3D59f3d441704a9916-2446909_2008196_48374651204-2446909_2008196_48374651204-2446909_2008196_48374651204%26old_mr1lext%3D2138_gclid%253DEAIaIQobChMIr9OTy4yS1wIVYRbTCh393A_-EAAYASAAEgLmXfD_BwE%2526url%253Dhttp%25253a%25252f%25252fdexp.amigo.mail.ru%2526_1larg_sub%253D48374651204%2526ext_partnerid%253Ddse.1%25253a848001%252Cdse.2%25253a848002%252Chp.1%25253a848003%252Chp.2%25253a848004%252Cpult.1%25253a848005%252Cpult.2%25253a848006%252Cvbm.1%25253a848007%252Cvbm.2%25253a848008%252Cany%25253a848009%2526partnerid%253D848000%26old_VID%3D32lWLp3cwC1d0000060C14nd%253A%253A178610991%253A";
		setTimeout(() => {
			document.location.href = "https://dexp.amigo.mail.ru/?context=prtnrs&_1lr=0-2446909_2008196_48374651204&source2=2138_gclid%3dCjwKCAjwssvPBRBBEiwASFoVd7oYdBEGmfvVx23YcIJB984HYqMOuZwH3cht1gwTgUaiUfE4ENc_sxoCXqMQAvD_BwE%26url%3dhttp%253a%252f%252fdexp.amigo.mail.ru%26_1larg_sub%3d48374651204%26ext_partnerid%3ddse.1%253a848001%2Cdse.2%253a848002%2Chp.1%253a848003%2Chp.2%253a848004%2Cpult.1%253a848005%2Cpult.2%253a848006%2Cvbm.1%253a848007%2Cvbm.2%253a848008%2Cany%253a848009%26partnerid%3d848000&gclid=CjwKCAjwssvPBRBBEiwASFoVd7oYdBEGmfvVx23YcIJB984HYqMOuZwH3cht1gwTgUaiUfE4ENc_sxoCXqMQAvD_BwE&url=http%3a%2f%2fdexp.amigo.mail.ru&ext_partnerid=dse.1%3a848001,dse.2%3a848002,hp.1%3a848003,hp.2%3a848004,pult.1%3a848005,pult.2%3a848006,vbm.1%3a848007,vbm.2%3a848008,any%3a848009&partnerid=848000"; // menuView.hide();
		}, 500);
	} else {
		backButtonView.hide();
		scoreboardView.hide();
		profileView.hide();
		loginView.hide();
		signUpView.hide();
		updateView.hide();
		canvas.show();
		game.start(() => router.goTo('/menu')); //выход в меню
	}
	this.counter += 1;
}.bind(this));

app.append(menuView).append(signUpView).append(loginView).append(backButtonView).append(profileView).append(rulesView).append(scoreboardView).append(canvas).append(updateView);

router.start();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Andrey/style.css": 27,
	"./blocks/message/message.css": 28,
	"./configs/login-fields.css": 29,
	"./configs/signup-fields.css": 30,
	"./views/viewsCss/backButton.css": 31,
	"./views/viewsCss/commonView.css": 32,
	"./views/viewsCss/form.css": 52,
	"./views/viewsCss/login.css": 33,
	"./views/viewsCss/menu.css": 34,
	"./views/viewsCss/section.css": 53,
	"./views/viewsCss/signUp.css": 35,
	"./views/viewsCss/view.css": 36
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
webpackContext.id = 26;

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

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=application.js.map