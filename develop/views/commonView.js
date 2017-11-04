"use strict";
import Block from "../blocks/block/block.js";

import EventBus from "../modules/eventBus"

export default class CommonView extends Block {
	constructor(blocks) {
		const view = document.createElement("section");

		super(view);

		this.elements = blocks;

		for (const block in this.elements) {
			this.append(this.elements[block]);
		}
	}


	show() {
		setTimeout(() => {this.el.style.setProperty("display", "flex");}, 170);
		setTimeout(() => {this.el.classList.remove("hidden");}, 130)
	}


	hide() {
		this.el.classList.add("hidden",);
		setTimeout(() => {this.el.style.setProperty("display", "none");}, 170);
	}
}


