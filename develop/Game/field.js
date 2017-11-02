'use strict';
import Cell from "./cell.js";

const sideOfCube = 90;
const sideOfCanvas = 850;
const indent = 150;

export default class Field {

	constructor (count, canvas, eventBus) {
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

		for(let i = 0; i < imgUrl.length; i++) {
			let img = new Image();
			imgs.push(img);
			img.onload = function () {
				ok++;
				if (ok >= imgUrl.length){
				}
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
		let startOfFieldX = sideOfCanvas/2 - sideOfCube/2;
		let startOfFieldY = indent + (sideOfCanvas-indent - sideOfCube*this.count)/2;
		let cubes = [];
		for (let i = 0; i < this.count; i++) {
			cubes[i] = [];
		}
		let diff = 0;
		for (let i = 0; i < this.count; i++) {
			let x = startOfFieldX + diff;
			let y = startOfFieldY + diff;
			for (let j = 0; j < this.count; j++) {
				cubes[i][j] = new Cell();
				cubes[i][j].setFigure(0);
				cubes[i][j].setBrightness(0);
				cubes[i][j].setId(i, j);
				cubes[i][j].setCoordinates(x, y);
				x -= sideOfCube/2+2;
				y += sideOfCube/2+2;
			}
			diff += sideOfCube/2+2;
		}
		return cubes;
	}

	drawField () {
		this.canvasForCubes.fillStyle = 'white';
		this.canvasForCubes.font = 'bold 30px sans-serif';
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				let br = this.arrayOfCubes[i][j].brightness;
				this.canvasForCubes.drawImage(this.massOfUrl[br], this.arrayOfCubes[i][j].x, this.arrayOfCubes[i][j].y);
				this.canvasForCubes.fillText(this.arrayOfCubes[i][j].idx + ";" + this.arrayOfCubes[i][j].idy, this.arrayOfCubes[i][j].x+sideOfCube/2-20, this.arrayOfCubes[i][j].y+sideOfCube/2);
			}
		}
	}

	clearField() {
		this.canvasForCubes.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	findById(idx, idy) {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].idx === idx && this.arrayOfCubes[i][j].idy === idy)
					return this.arrayOfCubes[i][j];
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
			this.canvasForCubes.fillText(arrayOfPlayers[i].username + " : " + this.arrayOfFigures[i+2], x, y);
			this.canvasForCubes.drawImage(this.massOfUrl[i+2], x - diff, y - diff/2-10, 35, 45);
			y += diff;
		}
		this.canvasForCubes.fillText("Ходит игрок : " + arrayOfPlayers[id].username, x, y);
	}

	gameOver(playerID) {
		let win = false;
		if (this.arrayOfFigures[playerID+2] > this.arrayOfFigures[playerID+3]) {
			win = true;
		}
		this.bus.emit("endOfGame", win);
		// if (win) alert("Вы выиграли!! :)");
		// else alert("Вы проиграли :(");
	}

	deleteFigure(idx, idy) {
		this.findById(idx, idy).setFigure(0);
	}

	drawFigures(idx, idy) {
		this.canvasForFigure.drawImage(this.massOfUrl[this.findById(idx, idy).figure], this.findById(idx, idy).x+5, this.findById(idx, idy).y-70);
	}

	drawAllFigures() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].figure > 1) {
					this.canvasForFigure.drawImage(this.massOfUrl[this.arrayOfCubes[i][j].figure], this.arrayOfCubes[i][j].x+5, this.arrayOfCubes[i][j].y-65);
				}
			}
		}
	}

	deleteAllFigure() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.arrayOfCubes[i][j].setFigure(0);
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
				if (Math.abs(idx2 - idx) >= 3
					|| Math.abs(idy2 - idy) >= 3
					|| this.arrayOfCubes[i][j].figure !== 0
				) {}
				else {
					this.arrayOfCubes[i][j].setBrightness(1);
				}
				this.findById(idx, idy).setBrightness(0);
			}
		}
	}

	deleteAllBrightCube () {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.arrayOfCubes[i][j].setBrightness(0);
			}
		}
	}
}
