'use strict';

import Field from "./field.js";
import Http from "../modules/http";

const x = 425;
const y = 230;
const sq = Math.sqrt(2)/2;
const side = 64;

export default class Game{

	constructor(canvas1, canvas2) {
		this.canvas1 = canvas1;
		this.canvasForCubes = canvas1.ctx;
		this.canvas2 = canvas2;
		this.canvasForFigure = canvas2.ctx;
		this.field = new Field(6, this.canvasForCubes, this.canvasForFigure);
	}

	gameStart () {
		return new Promise(function (resolve, reject) {
			// if (login.length < 4) {
			// 	throw new Error("Длина логина должна быть не меньше 4 символов!", null);
			// 	return;
			// }
			// if (login.length > 12) {
			// 	throw new Error("Длина логина не должна превышать 12 символов!", null);
			// 	return;
			// }
			// if (password.length < 6) {
			// 	throw new Error("Длина пароля должна быть не меньше 6 символов!", null);
			// 	return;
			// }
			// if (password === login) {
			// 	throw new Error("Логин и пароль не могут совпадать!", null);
			// 	return;
			// }
			let width = 5;
			let height = 5;
			let maxPlayers = 2;
			resolve(Http.FetchPost('/game/single/create', {width, height, maxPlayers})
				.then(function(resp) {
					let ID = resp.ID;
					alert(ID);
					alert(resp);
					return resp;
				}.bind(this))
				.catch(function(err) {//не могу достать errorMessage
					console.log(err.errormessage);
					console.log("err response status "  + err.errorMessage);
					throw new Error(err.errorMessage);
				}.bind(this)));
		})
	}

	start(exit) {
		this.field.drawField();
		this.field.setFigure(2, 2, 3);
		this.field.setFigure(5, 5, 2);
		this.field.drawAllFigures();
		this.gameStart();
		// this.canvas2.addEventListener('click', this.updateCanvas, false);

		// this.exit = exit;
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
		let pos = this.findOffset(this.canvasForFigure);

		let mouseX = e.pageX - pos.x;
		let mouseY = e.pageY - pos.y;

		let XX = (mouseX - x + mouseY - y)*sq;
		let YY = (mouseY - mouseX + x - y)*sq;

		if (XX < side*6 && YY < side*6 && XX > 0 && YY > 0) {
			let idx;
			let idy;
			for (let i = 0; i < 6; i++) {
				if (XX > side*i)
					idx = i;
			}
			for (let i = 0; i < 6; i++) {
				if (YY > side*i)
					idy = i;
			}
			this.field.deleteAllBrightCube();
			this.field.brightCubes(idx, idy);
			this.field.drawField();
		}
	}
};
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