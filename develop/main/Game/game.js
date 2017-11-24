'use strict';

import Field from './field.js';
import GameService from '../services/game-service.js';


const x = 425;
const y = 230;
const sq = Math.sqrt(2) / 2;
const side = 66;
const brightLevel = 1;

const width = 6;
const maxPlayers = 2;

/**
 * Генерирует id следующего игрока
 * @param {*} array[] - массив игроков
 * @yield {number} playerID - id следующего игрока
 */
function* generatorId(array) {
	let i = 1;
	while (i < array.length) {
		yield array[i].playerID;
		i++;
		if (i === array.length) { i = 0; }
	}
}

/**
 * Класс для обработки игровой механики
 * @module Game
 */
export default class Game {
	/**
	 * @param {HTMLElement} canvas - HTML элемент для рисования
	 * @param {EventBus} eventBus - объект класса для работы с событиями
	 * @constructor
	 */
	constructor(canvas, eventBus) {
		this.canvas = canvas;

		this.canvasForCubes = this.canvas.canvasForCubes;
		this.canvasForFigure = this.canvas.canvasForFigure;
		this.canvasForClicks = this.canvas.canvasForClicks;

		this.canvasForClicks.addEventListener('click', {
			handleEvent: this.updateCanvas.bind(this),
			exit: this.exit
		}, false);

		this.eventBus = eventBus;

		this.coordOfMove = {
			x1: -1,
			x2: -1,
			y1: -1,
			y2: -1,
		};

		this.generatorID = 0;

		this.field = new Field(width, this.canvas, this.eventBus);
		this.gameService = new GameService();
	}

	/**
	 * Создает игру
	 */
	async Start() {
		const response = await this.gameService.start(width, width, maxPlayers);
		this.Complete();
	}

	/**
	 * Проверяет готовность игры
	 */
	async Complete() {
		const response = await this.gameService.complete();
		this.generatorID = generatorId(response.players);
		this.generatorID.next();
		this.field.setFiguresByArray(response.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(response);
	}

	/**
	 * Отправляет ход игрока
	 */
	async Play(coord, currentPlayerID) {
		const response = await this.gameService.play(coord, currentPlayerID);
		this.stepProcessing(response);
		this.Status();
	}

	/**
	 * Принимает ход противника
	 */
	async Status() {
		const response = await this.gameService.status();
		this.stepProcessing(response);
	}

	/**
	 * Обработка хода
	 */
	stepProcessing(response) {
		this.field.stepProcessing(response);
		if (response.gameOver === true) {
			const хранилище = window.localStorage;
			хранилище.removeItem('gameID');
			this.field.gameOver(response.playerID);
			setTimeout(() => {
				this.canvas.winDiv.hide();
				this.exit();
			}, 3000);
		}
	}

	/**
	 * Начало игры
	 */
	startGame(exit) {
		this.exit = exit;
		this.field.startGame();
		this.Start();
	}

	/**
	 * Определяет координаты клика мышкой
	 * @param {HTMLelement} obj - елемент, в котором определяются координаты
	 * @return {*} - объект, содержащий x и y координаты клика
	 */
	findOffset(obj) {
		let curX = 0;
		let curY = 0;
		if (obj.offsetParent) {
			do {
				curX += obj.offsetLeft;
				curY += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return {x: curX, y: curY};
		}
	}

	/**
	 * Обновление поля после клика мышкой и отправка хода игрока
	 * @param {event} event - событие "click"
	 */
	updateCanvas(event) {
		const pos = this.findOffset(this.canvasForClicks);
		const mouseX = event.pageX - pos.x;
		const mouseY = event.pageY - pos.y;
		const XX = (mouseX - x + mouseY - y) * sq;
		const YY = (mouseY - mouseX + x - y) * sq;

		if (XX < side * width && YY < side * width && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < width; i++) {
				if (XX > side * i) { idx = i; }
				if (YY > side * i) { idy = i; }
			}
			const currentPlayerID = this.generatorID.next().value;

			if (this.field.findById(idx, idy).figure === currentPlayerID + 2) {
				this.field.bright(idx, idy);

				this.coordOfMove.x1 = idx;
				this.coordOfMove.y1 = idy;
			}
			if (this.field.findById(idx, idy).brightness === brightLevel) {
				this.coordOfMove.x2 = idx;
				this.coordOfMove.y2 = idy;

				this.Play(this.coordOfMove, currentPlayerID);
			}
		}
	}
}
