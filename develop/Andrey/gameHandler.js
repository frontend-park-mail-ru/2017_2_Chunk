'use strict';

import Field from "./field.js";

export default class Game{

	constructor(canvas1, canvas2) {
		window.onload = () => {
		// 	this.canvas1 = document.getElementById("1");
		// 	this.canvas2 = document.getElementById("2")
			this.canvasForCubes = canvas1.getContext();
			this.canvasForFigure = canvas2.getContext();
			// this.field = new Field(6, this.canvasForCubes, this.canvasForFigure);
		};
	}

	start(exit) {
		// this.field.drawField();
		this.exit = exit;
		setTimeout(() => {alert("go to menu!"); exit();}, 2000);
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