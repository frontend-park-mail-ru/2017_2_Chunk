'use strict';

import Field from "./field.js";
import GameService from "./game-service.js";

const x = 425;
const y = 230;
const sq = Math.sqrt(2)/2;
const side = 66;
const brightLevel = 1;

const width = 6;
const maxPlayers = 2;

function* generatorId(array) {
	let i = 0;
	while (i < array.length) {
		yield array[i].playerID;
		i++;
		if (i === array.length)
			i = 0;
	}
}

export default class Game {
	constructor(canvas, eventBus) {
		this.canvas = canvas;

		this.canvasForCubes = this.canvas.canvasForCubes;
		this.canvasForFigure = this.canvas.canvasForFigure;
		this.canvasForClicks = this.canvas.canvasForClicks;
		this.eventBus = eventBus;

		this.gameID = 0;
		this.players = [];
		this.playerID = 0;
		this.currentPlayerID = 0;
		this.gameOver = false;
		this.arrayOfFigures = [];

		this.xFirstPlay = -1;
		this.yFirstPlay = -1;
		this.xSecondPlay = -1;
		this.ySecondPlay = -1;

		this.gen = 0;

		this.field = new Field(width, this.canvas, this.eventBus);
		this.fetchService = new GameService();
	}


	async Start() {
		this.response = await this.fetchService.start(width, width, maxPlayers);
		this.gameID = this.response.json.gameID;
		this.Complete();
	}


	async Complete() {
		this.response = await this.fetchService.complete(this.gameID);
		this.players = this.response.json.players;
		this.gen = generatorId(this.players);
		this.playerID = this.players[0].playerID;
		this.currentPlayerID = this.response.json.currentPlayerID;
		this.gameOver = this.response.json.gameOver;
		this.arrayOfFigures = this.response.json.field;
		this.setFiguresByArray(this.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.players, this.currentPlayerID);
	}


	async Play(x1, y1, x2, y2, currentPlayerID, exit) {
		let gameID = this.gameID;
		let playerID = this.playerID;
		this.response = await this.fetchService.play(x1, x2, y1, y2, gameID, playerID, currentPlayerID);
		this.stepProcessing(this.response, exit);
		this.Status(gameID, playerID, this.currentPlayerID, exit);
	}


	async Status(gameID, playerID, currentPlayerID, exit) {
		this.response = await this.fetchService.status(gameID, playerID, currentPlayerID);
		this.stepProcessing(this.response, exit);
	}


	stepProcessing(response, exit) {
		this.players = this.response.json.players;
		this.currentPlayerID = this.response.json.currentPlayerID;
		this.gameOver = this.response.json.gameOver;
		this.arrayOfFigures = this.response.json.field;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.setFiguresByArray(this.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(this.players, this.currentPlayerID);
		this.field.deleteAllBrightCube();
		this.field.drawField();
		if (this.gameOver === true) {
			this.field.gameOver(this.playerID);
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

		this.canvasForClicks.addEventListener('click', {handleEvent: this.updateCanvas.bind(this), exit: this.exit}, false);
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
			return {x:curX,y:curY};
		}
	}


	updateCanvas(e){
		let pos = this.findOffset(this.canvasForClicks);
		let mouseX = e.pageX - pos.x;
		let mouseY = e.pageY - pos.y;
		let XX = (mouseX - x + mouseY - y)*sq;
		let YY = (mouseY - mouseX + x - y)*sq;

		if (XX < side*width && YY < side*width && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < width; i++) {
				if (XX > side*i)
					idx = i;
				if (YY > side*i)
					idy = i;
			}

			if (this.field.findById(idx, idy).figure === this.currentPlayerID+2) {
				this.field.deleteAllBrightCube();
				this.field.brightCubes(idx, idy);
				this.field.drawField();

				this.xFirstPlay = idx;
				this.yFirstPlay = idy;
			}
			if (this.field.findById(idx, idy).brightness === brightLevel) {
				this.xSecondPlay = idx;
				this.ySecondPlay = idy;

				this.Play(this.xFirstPlay, this.yFirstPlay, this.xSecondPlay, this.ySecondPlay, this.gen.next().value, this.exit);
			}
		}
	}
};