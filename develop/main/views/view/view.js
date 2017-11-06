"use strict";
import Block from "../../blocks/block/block.js";


/**
 * Класс базовой вьюхи
 * @module ViewButton
 */
export default class View extends Block {
	/**
	 * @param {Block} blocks
	 * @constructor
	 */
	constructor(blocks) {
		const block = Block.Create('section', {}, ['view', 'view_theme']);

		super(block.el);

		this.elements = blocks;

		for (const _block in this.elements) {
			this.append(this.elements[_block]);
		}
	}


	/**
	 * Показывает вьюху
	 */
	show() {
		setTimeout(() => {this.el.style.setProperty("display", "flex");}, 170);
		setTimeout(() => {this.el.classList.remove("main_hidden");}, 130)
	}


	/**
	 * Скрывает вьюху
	 */
	hide() {
		this.el.classList.add("main_hidden",);
		setTimeout(() => {this.el.style.setProperty("display", "none");}, 170);
	}
}


