'use strict';
import Cell from "./cell.js";

let canvas1 = document.getElementById("1");
let canvasForCubes = canvas1.getContext('2d');
let canvas2 = document.getElementById("2");
let canvasForFigure = canvas2.getContext('2d');

const sideOfCube = 90;
const sideOfCanvas = 850;
const indent = 150;

export default class Field {

	constructor (count) {
		this.count = count;
		let imgUrl = [];
		imgUrl.push("images/cube.png");
		imgUrl.push("images/cubeBr.png");
		imgUrl.push("images/whitch90-130.png");
		imgUrl.push("images/jack90-130.png");

		let imgs = [];
		let ok = 0;

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
		// let id = 0;
		for (let i = 0; i < this.count; i++) {
			// id = (i+1)*10;
			let x = startOfFieldX + diff;
			let y = startOfFieldY + diff;
			for (let j = 0; j < this.count; j++) {
				cubes[i][j] = new Cell();
				cubes[i][j].setFigure(0);
				cubes[i][j].setBrightness(0);
				cubes[i][j].setId(i, j);
				// id++;
				cubes[i][j].setCoordinates(x, y);
				x -= sideOfCube/2+2;
				y += sideOfCube/2+2;
			}
			diff += sideOfCube/2+2;
		}
		return cubes;
	}

	drawField () {
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
				if (this.arrayOfCubes[i][j].idx === idx && this.arrayOfCubes[i][j].idy === idy)
					return this.arrayOfCubes[i][j];
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
		canvasForFigure.drawImage(this.massOfUrl[this.findById(idx, idy).figure], this.findById(idx, idy).x+5, this.findById(idx, idy).y-70);
	}

	drawAllFigures() {
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				if (this.arrayOfCubes[i][j].figure > 1) {
					canvasForFigure.drawImage(this.massOfUrl[this.arrayOfCubes[i][j].figure], this.arrayOfCubes[i][j].x+5, this.arrayOfCubes[i][j].y-65);
				}
			}
		}
	}

	clearFigures() {
		canvasForFigure.clearRect(0, 0, sideOfCanvas, sideOfCanvas);
	}

	test () {
		canvasForCubes.lineWidth = 2;
		canvasForCubes.strokeStyle = 'white';
		canvasForCubes.beginPath();
		canvasForCubes.rect(200,200,100,200);
		canvasForCubes.stroke();
		canvasForCubes.closePath();
		console.log(canvasForCubes.isPointInPath(250,250));
		console.log(canvasForCubes.isPointInPath(100,100))
	}

	brightCubes(idx, idy) {
		// let id1 = Math.floor(id/10);
		// let id2 = id % 10;
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
