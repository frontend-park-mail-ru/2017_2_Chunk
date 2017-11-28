// 'use strict';
//
// export default class LogicSource {
// 	constructor(arrayOfPlane, gamers) {
// 		this.arrayOfField = arrayOfPlane;
// 		this.planeSize = arrayOfPlane.length;
// 		this.countPlayers = gamers.length;
// 	}
//
// 	findMaxFiguresCount(array) {
// 		let max = 0;
// 		let maxI = 0;
// 		for (let i = 0; i < array.length; i++) {
// 			if (array[i] > max) {
// 				max = array[i];
// 				maxI = i;
// 			}
// 		}
// 		return maxI;
// 	}
//
// 	countFigure() {
// 		const countFigure = [];
// 		for (let i = 0; i < this.countPlayers; i++) {
// 			countFigure[i] = 0;
// 		}
// 		for (let i = 0; i < this.planeSize; i++) {
// 			for (let j = 0; j < this.planeSize; j++) {
// 				if (this.arrayOfField[i][j].figure > 0) {
// 					countFigure[this.arrayOfField[i][j].figure - 1]++;
// 				}
// 			}
// 		}
// 		console.log(countFigure);
// 		return countFigure;
// 	}
// }