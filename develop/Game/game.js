'use strict';

import Field from "./field.js";
import GameService from "../services/game-service.js";

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

		this.canvasForClicks.addEventListener('click', {handleEvent: this.updateCanvas.bind(this), exit: this.exit}, false);
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
		this.canvasForClicks.addEventListener('click', this.updateCanvas, false);
    }


	async Start() {
		const хранилище = window.localStorage;
		debugger;
		if (!хранилище["gameID"]) {
            const response = await this.gameService.start(width, width, maxPlayers);
            хранилище.setItem("gameID", `${response.gameData.gameID}`);
        }
        else
        	this.gameService.gameData.gameID = хранилище["gameID"];
		this.Complete();
	}


	async Complete() {
		const response = await this.gameService.complete();
		this.generatorID = generatorId(response.gameData.players);
		this.setFiguresByArray(response.gameData.arrayOfFigures);
		this.field.drawAllFigures();
		this.field.drawCountOfFigure(response.gameData);
	}


	async Play(coord, currentPlayerID) {
        const response = await this.gameService.play(coord, currentPlayerID);
		this.stepProcessing(response);
		this.Status();
	}


	async Status() {
        const response = await this.gameService.status();
		this.stepProcessing(response);
	}


	stepProcessing(response) {
		this.field.stepProcessing(response);
		if (response.gameData.gameOver === true) {
			const хранилище = window.localStorage;
			хранилище.removeItem("gameID");
			this.field.gameOver(response.gameData.playerID);
			setTimeout(() => {
				this.canvas.winDiv.hide();
				this.exit();
			}, 3000);
		}
	}


	startGame(exit) {
		this.exit = exit;
		this.field.startGame();
		this.Start();

<<<<<<< HEAD

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
=======
>>>>>>> 49a7344bfdea554dd164f25cee59b7cd0addef07
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


	updateCanvas(event){
		let pos = this.findOffset(this.canvasForClicks);
		let mouseX = event.pageX - pos.x;
		let mouseY = event.pageY - pos.y;
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

			if (this.field.findById(idx, idy).figure === this.gameService.gameData.currentPlayerID+2) {
				this.field.bright(idx, idy);

				this.coordOfMove.x1 = idx;
				this.coordOfMove.y1 = idy;
			}
			if (this.field.findById(idx, idy).brightness === brightLevel) {
				this.coordOfMove.x2 = idx;
				this.coordOfMove.y2 = idy;

				const currentPlayerID = this.generatorID.next().value;

<<<<<<< HEAD
				debugger;
				this.Play(this.coordOfMove, currentPlayerID, this.exit);
=======
				this.Play(this.coordOfMove, currentPlayerID);
>>>>>>> 49a7344bfdea554dd164f25cee59b7cd0addef07
			}
		}
	}
}
