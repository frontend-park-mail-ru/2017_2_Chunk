'use strict';

/**
 * Базовый класс ячейки игрового поля
 * @module Cell
 */
export default class Cell {
	constructor() {
	}

	/**
	 * Установка координат ячейки
	 * @param {number} x - координата х
	 * @param {number} y - координата у
	 */
	setCoordinates(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Устновка фигуры для ячейки
	 * @param {number} num - номер фигуры
	 */
	setFigure(num) {
		this.figure = num;
	}

	/**
	 * Присовение id ячейке
	 * @param {number} idx - id по оси х
	 * @param {number} idy - id по оси у
	 */
	setId(idx, idy) {
		this.idx = idx;
		this.idy = idy;
	}

	/**
	 * Устновка яркости для ячейке
	 * @param {number} br - уровень яркости
	 */
	setBrightness(br) {
		this.brightness = br;
	}
}
