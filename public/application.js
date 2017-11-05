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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_eventBus__ = __webpack_require__(5);






class CommonView extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block_js__["default"] {
	constructor(blocks) {
		const view = document.createElement("section");

		super(view);

		this.elements = blocks;

		for (const block in this.elements) {
			this.append(this.elements[block]);
		}
	}

	show() {
		setTimeout(() => {
			this.el.style.setProperty("display", "flex");
		}, 170);
		setTimeout(() => {
			this.el.classList.remove("hidden");
		}, 130);
	}

	hide() {
		this.el.classList.add("hidden");
		setTimeout(() => {
			this.el.style.setProperty("display", "none");
		}, 170);
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


const backendUrl = "https://backend-java-spring.herokuapp.com";
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
		});
	}

	/**
  * Выполняет POST-запрос по указанному адресу
  * @param {Object} body - body-request
  * @param {string} address - адрес запроса
  */
	static FetchPost(address, body) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.set("Content-Type", "application/json; charset=utf-8");
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: myHeaders
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Http;

Http.BaseUrl = null;

/***/ }),
/* 5 */
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
	}

	emit(event, data) {
		this.listeners[event].forEach(listener => {
			listener(data);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = EventBus;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(__webpack_require__(27));
requireAll(__webpack_require__(29));

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cell_js__ = __webpack_require__(7);




const sideOfCube = 90;
const sideOfCanvas = 850;
const indent = 150;
const maxMove = 3;
const brightOn = 1;
const brightOff = 0;
const figureIndentX = 5;
const figureIndentY = -65;

class Field {

	constructor(count, canvas, eventBus) {
		this.count = count;
		let imgUrl = [];
		imgUrl.push("images/cube.png");
		imgUrl.push("images/cubeBr.png");
		imgUrl.push("images/whitch90-130.png");
		imgUrl.push("images/jack90-130.png");

		let imgs = [];
		let ok = 0;

		this.canvasForCubes = canvas.canvasForCubes;
		this.canvasForFigure = canvas.canvasForFigure;
		this.winDiv = canvas.winDiv;
		this.bus = eventBus;

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

		this.arrayOfFigures = [];
		for (let i = 0; i < imgUrl.length; i++) {
			this.arrayOfFigures[i] = 0;
		}

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
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let br = this.arrayOfCubes[i][j].brightness;
				this.canvasForCubes.drawImage(this.massOfUrl[br], this.arrayOfCubes[i][j].x, this.arrayOfCubes[i][j].y);
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

	resetArrayOfFigure() {
		for (let i = 0; i < this.arrayOfFigures.length; i++) {
			this.arrayOfFigures[i] = 0;
		}
	}

	setFigure(idx, idy, num) {
		this.findById(idx, idy).setFigure(num);
		this.arrayOfFigures[num]++;
	}

	drawCountOfFigure(arrayOfPlayers, id) {
		this.canvasForCubes.fillStyle = 'white';
		this.canvasForCubes.font = 'bold 20px sans-serif';
		let x = 60;
		let y = 30;
		let diff = 40;
		this.canvasForCubes.clearRect(0, 0, 400, 200);
		for (let i = 0; i < arrayOfPlayers.length; i++) {
			this.canvasForCubes.fillText(arrayOfPlayers[i].username + " : " + this.arrayOfFigures[i + 2], x, y);
			this.canvasForCubes.drawImage(this.massOfUrl[i + 2], x - diff, y - diff / 2 - 10, 35, 45);
			y += diff;
		}
		this.canvasForCubes.fillText("Ходит игрок : " + arrayOfPlayers[id].username, x, y);
	}

	gameOver(playerID) {
		let win = false;
		if (this.arrayOfFigures[playerID + 2] > this.arrayOfFigures[playerID + 3]) {
			win = true;
		}
		this.bus.emit("endOfGame", win);
	}

	deleteFigure(idx, idy) {
		this.findById(idx, idy).setFigure(0);
	}

	drawFigures(idx, idy) {
		this.canvasForFigure.drawImage(this.massOfUrl[this.findById(idx, idy).figure], this.findById(idx, idy).x + figureIndentX, this.findById(idx, idy).y + figureIndentY);
	}

	drawAllFigures() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].figure > 1) {
					this.drawFigures(i, j);
				}
			}
		}
	}

	deleteAllFigure() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.deleteFigure(i, j);
			}
		}
		this.resetArrayOfFigure();
	}

	clearFigures() {
		this.canvasForFigure.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	brightCubes(idx, idy) {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let idx2 = this.arrayOfCubes[i][j].idx;
				let idy2 = this.arrayOfCubes[i][j].idy;
				if (Math.abs(idx2 - idx) >= maxMove || Math.abs(idy2 - idy) >= maxMove || this.arrayOfCubes[i][j].figure !== 0) {} else {
					this.arrayOfCubes[i][j].setBrightness(brightOn);
				}
				this.findById(idx, idy).setBrightness(brightOff);
			}
		}
	}

	deleteAllBrightCube() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.arrayOfCubes[i][j].setBrightness(brightOff);
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Field;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__field_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_game_service_js__ = __webpack_require__(10);





const x = 425;
const y = 230;
const sq = Math.sqrt(2) / 2;
const side = 66;
const brightLevel = 1;

const width = 6;
const maxPlayers = 2;

function* generatorId(array) {
	let i = 0;
	while (i < array.length) {
		yield array[i].playerID;
		i++;
		if (i === array.length) i = 0;
	}
}

class Game {
	constructor(canvas, eventBus) {
		this.canvas = canvas;

		this.canvasForCubes = this.canvas.canvasForCubes;
		this.canvasForFigure = this.canvas.canvasForFigure;
		this.canvasForClicks = this.canvas.canvasForClicks;
		this.eventBus = eventBus;

		this.coordOfMove = {
			x1: -1,
			x2: -1,
			y1: -1,
			y2: -1
		};

		this.generatorID = 0;

		this.field = new __WEBPACK_IMPORTED_MODULE_0__field_js__["default"](width, this.canvas, this.eventBus);
		this.gameService = new __WEBPACK_IMPORTED_MODULE_1__services_game_service_js__["default"]();
	}

	async Start() {
		const хранилище = window.localStorage;
		if (!хранилище["gameID"]) {
			const response = await this.gameService.start(width, width, maxPlayers);
			this.gameService.gameData.gameID = response.json.gameID;
			хранилище.setItem("gameID", `${this.gameService.gameData.gameID}`);
		} else this.gameService.gameData.gameID = хранилище["gameID"];
		this.Complete();
	}

	async Complete() {
		const response = await this.gameService.complete(this.gameService.gameData.gameID);
		this.gameService.gameData.players = response.json.players;
		this.generatorID = generatorId(this.gameService.gameData.players);
		this.gameService.gameData.playerID = this.gameService.gameData.players[0].playerID;
		this.gameService.gameData.currentPlayerID = response.json.currentPlayerID;
		this.gameService.gameData.gameOver = response.json.gameOver;
		this.gameService.gameData.arrayOfFigures = response.json.field;
		this.setFiguresByArray(this.gameService.gameData.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.gameService.gameData.players, this.gameService.gameData.currentPlayerID);
	}

	async Play(coord, currentPlayerID, exit) {
		const gameID = this.gameService.gameData.gameID;
		const playerID = this.gameService.gameData.playerID;
		const response = await this.gameService.play(coord, gameID, playerID, currentPlayerID);
		this.stepProcessing(response, exit);
		this.Status(gameID, playerID, this.gameService.gameData.currentPlayerID, exit);
	}

	async Status(gameID, playerID, currentPlayerID, exit) {
		const response = await this.gameService.status(gameID, playerID, currentPlayerID);
		this.stepProcessing(response, exit);
	}

	stepProcessing(response, exit) {
		this.gameService.gameData.players = response.json.players;
		this.gameService.gameData.currentPlayerID = response.json.currentPlayerID;
		this.gameService.gameData.gameOver = response.json.gameOver;
		this.gameService.gameData.arrayOfFigures = response.json.field;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.setFiguresByArray(this.gameService.gameData.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.gameService.gameData.players, this.gameService.gameData.currentPlayerID);
		this.field.deleteAllBrightCube();
		this.field.drawField();
		if (this.gameService.gameData.gameOver === true) {
			const хранилище = window.localStorage;
			хранилище.removeItem("gameID");
			this.field.gameOver(this.gameService.gameData.playerID);
			setTimeout(() => {
				this.canvas.winDiv.hide();
				exit();
			}, 3000);
		}
	}

	startGame(exit) {
		this.exit = exit;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.field.drawField();
		this.Start();

		this.canvasForClicks.addEventListener('click', { handleEvent: this.updateCanvas.bind(this), exit: this.exit }, false);
	}

	setFiguresByArray(array) {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < width; j++) {
				let model = 0;
				if (array[i][j] >= 0) {
					model = array[i][j] + 2;
					this.field.setFigure(i, j, model);
				}
			}
		}
	}

	findOffset(obj) {
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

	updateCanvas(event) {
		let pos = this.findOffset(this.canvasForClicks);
		let mouseX = event.pageX - pos.x;
		let mouseY = event.pageY - pos.y;
		let XX = (mouseX - x + mouseY - y) * sq;
		let YY = (mouseY - mouseX + x - y) * sq;

		if (XX < side * width && YY < side * width && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < width; i++) {
				if (XX > side * i) idx = i;
				if (YY > side * i) idy = i;
			}

			if (this.field.findById(idx, idy).figure === this.gameService.gameData.currentPlayerID + 2) {
				this.field.deleteAllBrightCube();
				this.field.brightCubes(idx, idy);
				this.field.drawField();

				this.coordOfMove.x1 = idx;
				this.coordOfMove.y1 = idy;
			}
			if (this.field.findById(idx, idy).brightness === brightLevel) {
				this.coordOfMove.x2 = idx;
				this.coordOfMove.y2 = idy;

				this.Play(this.coordOfMove, this.generatorID.next().value, this.exit);
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Game;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(4);




class GameService {
    constructor() {
        this.response = {
            ok: false,
            json: {},
            message: ""
        };

        this.gameData = {
            gameID: 0,
            players: [],
            playerID: 0,
            currentPlayerID: 0,
            gameOver: false,
            arrayOfFigures: []
        };
    }

    async start(width, height, maxPlayers) {
        const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/game/single/create', { width, height, maxPlayers });
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }

    async complete(gameID) {
        const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/game/complete?gameID=' + gameID);
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }

    async play(coord, gameID, playerID, currentPlayerID) {
        const x1 = coord.x1;
        const x2 = coord.x2;
        const y1 = coord.y1;
        const y2 = coord.y2;
        const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/game/play', { x1, x2, y1, y2, gameID, playerID, currentPlayerID });
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }

    async status(gameID, playerID, currentPlayerID) {
        const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/game/status', { gameID, playerID, currentPlayerID });
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = GameService;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class MenuView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, router) {
		const menuElems = {
			profile: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', { 'data-section': 'profile' }, ['profile', 'auth'], ''),
			play: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'play', 'href': '/game' }, ['button', 'auth', 'menu__button'], 'Play'),
			signup: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'signup', 'href': '/signup' }, ['button', 'unauth', 'menu__button'], 'Sign up'),
			login: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'login', 'href': '/login' }, ['button', 'unauth', 'menu__button'], 'Login'),
			update: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'update', 'href': '/update' }, ['button', 'auth', 'menu__button'], 'Profile'),
			rules: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'rules', 'href': '/rules' }, ['button', "every-available", 'menu__button'], 'Rules'),
			scores: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'scores', 'href': '/scoreboard' }, ['button', 'every-available', 'menu__button'], 'Scoreboard'),
			exit: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'data-section': 'exit', 'href': '/exit' }, ['button', 'auth', 'menu__button'], 'Exit')
		};
		super(menuElems);

		this.bus = eventBus;

		this.bus.on("unauth", () => {
			for (let elem in this.elements) {
				if (!this.elements[elem].el.classList.contains("unauth") && !this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].hide();
				} else this.elements[elem].show();
			}
		});

		this.bus.on("auth", () => {
			for (let elem in this.elements) {
				if (!this.elements[elem].el.classList.contains("auth") && !this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].hide();
				} else this.elements[elem].show();
			}
		});

		this.bus.emit("unauth");
		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MenuView;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_signUpFileds__ = __webpack_require__(13);







class signUpView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](__WEBPACK_IMPORTED_MODULE_3__templates_signUpFileds__["default"]);
		super({ form });

		this.bus = eventBus;
		this.userService = userService;
		this.router = router;

		this.form = form;
		this.message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", event => {
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
		const resp = await this.userService.signup(formData.name, formData.email, formData.password, formData.confirm);
		if (resp.ok) {
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth", resp.json.username);
			this.router.goTo("/menu");
		} else {
			this.setErrorText(resp);
		}
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = signUpView;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const signUpFIelds = [{ attrs: {
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
		value: "Submit",
		class: "form-block__button"
	} }];

/* harmony default export */ __webpack_exports__["default"] = (signUpFIelds);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_loginFields__ = __webpack_require__(15);







class LoginView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](__WEBPACK_IMPORTED_MODULE_3__templates_loginFields__["default"]);
		super({ form });

		this.form = form;
		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", event => {
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
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth", resp.json.username);
			this.bus.emit("openMenu");
		} else {
			this.setErrorText(resp);
		}
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = LoginView;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const loginFields = [{
	attrs: {
		type: "text",
		size: "128",
		name: "username",
		placeholder: "Enter your name",
		required: "required",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "password",
		size: "128",
		name: "password",
		placeholder: "Enter password",
		required: "required",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "submit",
		value: "Submit",
		class: "form-block__button"
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (loginFields);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class backButtonView extends __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"] {
	constructor() {
		const backButton = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('a', { 'href': '/menu' }, ["back__button"], 'Menu');
		super(backButton.el);

		this.button = backButton;
		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = backButtonView;


/***/ }),
/* 17 */
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
/* 18 */
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

		this.bus.on("openRules", () => {
			this.show();
		});

		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = rulesView;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_scoreBoard__ = __webpack_require__(20);
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

		this.hide();
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
/* 20 */
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_updateFields__ = __webpack_require__(22);







class updateView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus, userService, router) {
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](__WEBPACK_IMPORTED_MODULE_3__templates_updateFields__["default"]);
		super({ form });

		this.form = form;
		this.bus = eventBus;
		this.router = router;
		this.userService = userService;

		this.message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.message.clear();
		this.message.hide();
		this.append(this.message);

		this.el.addEventListener("submit", event => {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;
			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			this.onSubmit(formData);
		}, true);

		this.bus.on("openUpdate", async () => {
			const resp = await this.userService.getDataFetch();
			if (resp.ok) {
				const username = this.form.fields[0].el;
				const email = this.form.fields[1].el;
				username.value = resp.json.username;
				email.value = resp.json.email;
			} else {
				this.setErrorText(resp.json.message);
			}
		});

		this.hide();
	}

	async onSubmit(formData) {
		const resp = await this.userService.update(formData.username, formData.email, formData.password, formData.old_password);
		if (resp.ok) {
			this.form.reset();
			this.message.clear();
			this.message.hide();
			this.bus.emit("auth", resp.json.username);
			this.router.goTo("/menu");
		} else {
			this.setErrorText(resp);
		}
	}

	setErrorText(err) {
		this.message.setText(err.message);
		this.message.show();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = updateView;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const updateFields = [{
	attrs: {
		type: "text",
		size: "128",
		name: "username",
		placeholder: "Name",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "email",
		size: "128",
		name: "email",
		placeholder: "Email",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "password",
		size: "128",
		name: "password",
		placeholder: "New password",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "password",
		size: "128",
		name: "old_password",
		placeholder: "Old password",
		required: "required",
		class: "form-block__input"
	}
}, {
	attrs: {
		type: "submit",
		value: "Submit",
		class: "form-block__button"
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (updateFields);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(0);





class CanvasView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus) {
		const canvas1 = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('canvas', { 'width': '850', 'height': '850' }, ['canv1'], "");
		const canvas2 = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('canvas', { 'width': '850', 'height': '850' }, ['canv2'], "");
		const winDiv = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', {}, ["winDiv"], "");

		super([canvas1, canvas2, winDiv]);

		this.el.style.setProperty("border", "none");
		this.el.style.setProperty("background-image", "./image/cats.jpg");

		this.canvas1 = canvas1;
		this.canvas2 = canvas2;
		this.winDiv = winDiv;
		this.winDiv.hide();

		this.canvasForClicks = this.canvas2.el;
		this.canvasForCubes = this.canvas1.el.getContext('2d');
		this.canvasForFigure = this.canvas2.el.getContext('2d');

		this.eventBus = eventBus;
		this.eventBus.on("endOfGame", win => {
			if (win) {
				this.winDiv.setText("You win! =)");
			} else {
				this.winDiv.setText("You lose! =(");
			}
			this.winDiv.show();
		});

		this.canvas1.el.style.setProperty("position", "absolute");
		this.canvas2.el.style.setProperty("position", "absolute");
		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = CanvasView;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(4);


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
	async signup(username, email, password, confirm) {
		const response = {
			ok: false,
			json: {},
			message: ""
		};
		if (username.length < 4) {
			response.message = "Длина логина должна быть не меньше 4 символов!";
			return response;
		}
		if (username.length > 12) {
			response.message = "Длина логина не должна превышать 12 символов!";
			return response;
		}
		if (password.length < 6) {
			response.message = "Длина пароля должна быть не меньше 6 символов!";
			return response;
		}
		if (password !== confirm) {
			response.message = "Пароли не совпадают!!!";
			return response;
		}
		if (password === username) {
			response.message = "Логин и пароль не должны совпадать!";
			return response;
		}

		const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/sign_up', { username, email, password });
		response.json = await resp.json();
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
  */
	async login(login, password) {
		const response = {
			ok: false,
			json: {},
			message: ""
		};
		if (login.length < 4) {
			response.message = "Длина логина должна быть не меньше 4 символов!";
			return response;
		}
		if (login.length > 12) {
			response.message = "Длина логина не должна превышать 12 символов!";
			return response;
		}
		if (password.length < 6) {
			response.message = "Попробуй еще раз! Используйте что-то поумнее";
			return response;
		}
		if (password === login) {
			response.message = "Логин и пароль не должны совпадать!";
			return response;
		}
		const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/sign_in', { login, password });
		response.json = await resp.json();
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
  * @param {string} old_password
  */
	async update(username, email, password, old_password) {
		//не парсит JSON
		const response = {
			ok: false,
			json: {},
			message: ""
		};
		if (username.length < 4) {
			response.message = "Длина логина должна быть не меньше 4 символов!";
			return response;
		}
		if (username.length > 12) {
			response.message = "Длина логина не должна превышать 12 символов!";
			return response;
		}
		if (password.length < 6) {
			response.message = "Длина пароля должна быть не меньше 6 символов!";
			return response;
		}
		if (old_password.length < 6) {
			response.message = "Длина пароля должна быть не меньше 6 символов!";
			return response;
		}
		if (password === username) {
			response.message = "Логин и пароль не должны совпадать!";
			return response;
		}
		if (old_password === username) {
			response.message = "Логин и пароль не должны совпадать!";
			return response;
		}

		const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/user/update', { login, password });
		response.json = await resp.json();
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
  * @return {Promise} - возвращает функцию колбек с результатом запроса или ошибкой
  */
	async getDataFetch(force = false) {
		//нужно ли возвращать проимс?
		const response = {
			ok: false,
			json: {},
			message: ""
		};

		if (this.isLoggedIn() && !force) {
			response.ok = true;
			response.json = this.user;
			return response;
		}

		const resp = await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/user/whoisit');
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
		if (this.isLoggedIn()) {
			this.user = null;
			this.users = [];
			__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/user/exit');
		}
	}

	/**
  * Запрашивает список пользователей
  */
	loadUsersList() {
		return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('');
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = UserService;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_routerFields__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block__ = __webpack_require__(0);





class Router {
	constructor(eventBus, userService) {
		this.routes = __WEBPACK_IMPORTED_MODULE_0__templates_routerFields__["default"];
		this.bus = eventBus;
		this.userService = userService;
		this.app = new __WEBPACK_IMPORTED_MODULE_1__blocks_block_block__["default"](document.body);

		//реагирует на любые клики. в том числе и сабмиты
		this.app.on("click", event => {
			const target = event.target;
			const type = target.tagName.toLowerCase();
			if (type === 'a') {
				event.preventDefault();
				this.goTo(target.href);
			}
		}, false);

		window.onpopstate = () => {
			console.log(location.pathname);
			this.changeState(location.pathname);
		};
	}

	async start() {
		this._routes = [];
		this.counter = 0;
		this.routes.forEach(route => {
			this._routes.push({
				url_pattern: route.url,
				emit: event => {
					this.bus.emit(event);
				}
			});
		});

		const resp = await this.userService.getDataFetch();
		if (resp.ok) {
			this.bus.emit("auth", resp.json.username);
			const slice_Routes = this._routes.slice(0, 6);
			this.findNewState(slice_Routes);
		} else {
			this.bus.emit("unauth");
			const slice_Routes = this._routes.slice(4);
			this.findNewState(slice_Routes);
		}
	}

	goTo(path) {
		const idx = this._routes.findIndex(_route => {
			return path.match(_route.url_pattern);
		});
		window.history.pushState({ page: this.routes[idx].url }, this.routes[idx].url, this.routes[idx].url);
		this._routes[idx].emit(this.routes[idx].event);
	}

	//для кнопки назад и вперед
	changeState(path) {
		const idx = this._routes.findIndex(_route => {
			return path.match(_route.url_pattern);
		});
		const _route = this._routes[idx];
		_route.emit(this.routes[idx].event);
	}

	findNewState(slice_Routes) {
		const idx = slice_Routes.findIndex(function (_route) {
			return location.pathname.match(_route.url_pattern);
		});
		if (idx > -1) {
			const _route = slice_Routes[idx];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(_route.url_pattern);
		} else {
			const _route = this._routes[0];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(this.routes[0].url);
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const fields = [{
	url: "/menu",
	event: "openMenu"
}, {
	url: "/exit",
	event: "exit"
}, {
	url: "/game",
	event: "openGame"
}, {
	url: "/update",
	event: "openUpdate"
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

/* harmony default export */ __webpack_exports__["default"] = (fields);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Game/cell.js": 7,
	"./Game/field.js": 8,
	"./Game/game.js": 9,
	"./blocks/block/block.js": 0,
	"./blocks/form/form.js": 2,
	"./blocks/message/message.js": 3,
	"./include.js": 6,
	"./main.js": 28,
	"./modules/eventBus.js": 5,
	"./modules/http.js": 4,
	"./modules/router.js": 25,
	"./services/game-service.js": 10,
	"./services/user-service.js": 24,
	"./templates/loginFields.js": 15,
	"./templates/routerFields.js": 26,
	"./templates/scoreBoard.js": 20,
	"./templates/signUpFileds.js": 13,
	"./templates/updateFields.js": 22,
	"./views/backButtonView.js": 16,
	"./views/canvasView.js": 23,
	"./views/commonView.js": 1,
	"./views/loginView.js": 14,
	"./views/menuView.js": 11,
	"./views/profileView.js": 17,
	"./views/rulesView.js": 18,
	"./views/scoreboardView.js": 19,
	"./views/signUpView.js": 12,
	"./views/updateView.js": 21
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
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menuView__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signUpView__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_loginView__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_profileView__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_rulesView__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_updateView__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_canvasView__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__blocks_block_block_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_user_service_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_eventBus__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Game_game__ = __webpack_require__(9);

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

const profileView = new __WEBPACK_IMPORTED_MODULE_4__views_profileView__["default"](eventBus);

const rulesView = new __WEBPACK_IMPORTED_MODULE_5__views_rulesView__["default"](eventBus);

const backButtonView = new __WEBPACK_IMPORTED_MODULE_3__views_backButtonView__["default"]();

const scoreboardView = new __WEBPACK_IMPORTED_MODULE_6__views_scoreboardView__["default"](eventBus, userService);

const canvas = new __WEBPACK_IMPORTED_MODULE_8__views_canvasView__["default"](eventBus);

const game = new __WEBPACK_IMPORTED_MODULE_13__Game_game__["default"](canvas, eventBus);

const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backButtonView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(canvas);

eventBus.on("openSignUp", function () {
	Views.forEach(view => {
		view.hide();
	});
	signUpView.show();
	backButtonView.show();
});

eventBus.on("openLogin", function () {
	Views.forEach(view => {
		view.hide();
	});
	loginView.show();
	backButtonView.show();
});

eventBus.on("openUpdate", function () {
	Views.forEach(view => {
		view.hide();
	});
	updateView.show();
	backButtonView.show();
});

eventBus.on("openRules", function () {
	Views.forEach(view => {
		view.hide();
	});
	rulesView.show();
	backButtonView.show();
});

eventBus.on("openMenu", function () {
	Views.forEach(view => {
		view.hide();
	});
	const browserStorage = window.localStorage;
	if (browserStorage["gameID"]) browserStorage.removeItem("gameID");
	menuView.show();
}.bind(this));

eventBus.on("exit", function () {
	userService.logout();
	eventBus.emit("unauth");
	router.goTo('/menu');
});

eventBus.on("openScoreboard", function () {
	Views.forEach(view => {
		view.hide();
	});
	scoreboardView.show();
	backButtonView.show();
});

eventBus.on("openGame", function () {
	Views.forEach(view => {
		view.hide();
	});
	backButtonView.show();
	canvas.show();
	game.startGame(() => router.goTo('/menu')); //выход в меню
});

app.append(menuView).append(signUpView).append(loginView).append(backButtonView).append(profileView).append(rulesView).append(scoreboardView).append(canvas).append(updateView);

router.start();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./views/viewsCss/backButton.css": 30,
	"./views/viewsCss/canvas.css": 31,
	"./views/viewsCss/form.css": 32,
	"./views/viewsCss/menu.css": 33,
	"./views/viewsCss/section.css": 34,
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
webpackContext.id = 29;

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

/***/ })
/******/ ]);
//# sourceMappingURL=application.js.map