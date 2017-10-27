"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class canvasView extends CommonView {
	constructor(id, classes) {
		const canvas = {
			canvas: Block.Create('canvas',
				{'id': id, 'width': '850', 'height': '850'},
				[classes], ""),
		};
		super(canvas);


		this.canvas = canvas;


		this.ctx = this.canvas.canvas.el.getContext('2d');

		// this.ctx = this.el.getContext('2d');

		this.hide();
	}

	show() {
		setTimeout(() => {this.el.style.setProperty("display", "flex");}, 0);
		setTimeout(() => {this.el.classList.remove("hidden");}, 0)
	}

	hide() {
		this.el.classList.add("hidden",);
		setTimeout(() => {this.el.style.setProperty("display", "none");}, 0);
	}

// 	getContext() {
// 		return this.canvas.el.getContext("2d");
// }
}