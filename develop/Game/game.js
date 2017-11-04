'use strict';

import Field from "./field.js";
import Http from "../modules/http";

const x = 425;
const y = 230;
const sq = Math.sqrt(2)/2;
const side = 66;

const width = 6;
const height = 6;
const maxPlayers = 2;

const brightLevel = 1;

function* generatorId(array) {
	let i = 0;
	while (i < array.length) {
		yield array[i].playerID;
		i++;
		if (i === array.length)
			i = 0;
	}
}

export default class Game{
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

		this.xFirstPlay = this.yFirstPlay = this.xSecondPlay = this.ySecondPlay = -1;

		this.gen = 0;

		this.field = new Field(width, this.canvas, this.eventBus);
	}


	gameStart() {
		return new Promise(function (resolve, reject) {
			resolve(Http.FetchPost('/game/single/create', {width, height, maxPlayers})
				.then(function(resp) {
					this.gameID = resp.gameID;
					this.gameComplete();
					return resp;
				}.bind(this))
				.catch(function(err) {
					console.log(err.errormessage);
					console.log("err response status "  + err.errorMessage);
					throw new Error(err.errorMessage);
				}.bind(this)));
		}.bind(this));
	};


	gameComplete() {
	return Http.FetchGet('/game/complete?gameID=' + this.gameID)
		.then(function(resp) {
			this.players = resp.players;
			this.gen = generatorId(this.players);
			this.playerID = this.players[0].playerID;
			this.currentPlayerID = resp.currentPlayerID;
			this.gameOver = resp.gameOver;
			this.arrayOfFigures = resp.field;
			this.setFiguresByArray(this.arrayOfFigures);
			this.field.drawAllFigures();
			// this.field.drawCountOfFigure(this.players, this.currentPlayerID);
		}.bind(this))
		.catch(function (err) {
			this.user = null;
			console.log(err.statusText);
			throw new Error("Can not get response =(")
		}.bind(this))
	}


	gamePlay(x1, y1, x2, y2, currentPlayerID, exit) {
		this.exit = exit;
		let gameID = this.gameID;
		let playerID = this.playerID;
		return new Promise(function (resolve, reject) {
			resolve(Http.FetchPost('/game/play', {x1, x2, y1, y2, gameID, playerID, currentPlayerID})
				.then(function(resp) {
					this.players = resp.players;
					this.currentPlayerID = resp.currentPlayerID;
					this.gameOver = resp.gameOver;
					this.arrayOfFigures = resp.field;
					this.field.deleteAllFigure();
					this.field.clearFigures();
					this.setFiguresByArray(this.arrayOfFigures);
					this.field.drawAllFigures();
					// this.field.drawCountOfFigure(this.players, this.currentPlayerID);
					this.field.deleteAllBrightCube();
					this.field.drawField();
					if (this.gameOver === true) {
						this.field.gameOverSingle(this.playerID);
						debugger;
						setTimeout(() => {
							this.canvas.winDiv.hide();
							this.exit();
						}, 3000);

					}
					this.gameStatus(gameID, playerID, this.currentPlayerID, this.exit);
					return resp;
				}.bind(this))
				.catch(function(err) {
					console.log(err.errormessage);
					console.log("err response status "  + err.errorMessage);
					throw new Error(err.errorMessage);
				}.bind(this)));
		}.bind(this));
	}


	gameStatus(gameID, playerID, currentPlayerID, exit) {
		this.exit = exit;
		return new Promise(function (resolve, reject) {
			resolve(Http.FetchPost('/game/status', {gameID, playerID, currentPlayerID})
				.then(function(resp) {
					this.players = resp.players;
					this.currentPlayerID = resp.currentPlayerID;
					this.gameOver = resp.gameOver;
					this.arrayOfFigures = resp.field;
					this.field.deleteAllFigure();
					this.field.clearFigures();
					this.setFiguresByArray(this.arrayOfFigures);
					this.field.drawAllFigures();
					// this.field.drawCountOfFigure(this.players, this.currentPlayerID);

					if (this.gameOver === true) {
						this.field.gameOverSingle(this.playerID);
						debugger;
						setTimeout(() => {
							this.canvas.winDiv.hide();
							this.exit();
						}, 3000);
					}
					return resp;
				}.bind(this))
				.catch(function(err) {
					console.log(err.errormessage);
					console.log("err response status "  + err.errorMessage);
					throw new Error(err.errorMessage);
				}.bind(this)));
		}.bind(this));
	}


	start(exit) {
		this.exit = exit;
		this.field.deleteAllFigure();
		this.field.clearFigures();
		this.field.drawField();
		this.gameStart();

		this.canvasForClicks.addEventListener('click', {handleEvent: this.updateCanvas.bind(this), exit: this.exit}, false);
	}


	setFiguresByArray(array) {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
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

		if (XX < side*width && YY < side*height && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < width; i++) {
				if (XX > side*i)
					idx = i;
			}
			for (let i = 0; i < height; i++) {
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

				this.gamePlay(this.xFirstPlay, this.yFirstPlay, this.xSecondPlay, this.ySecondPlay, this.gen.next().value, this.exit);
			}
		}
	}
};