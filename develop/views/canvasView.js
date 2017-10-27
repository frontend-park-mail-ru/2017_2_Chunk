"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class CanvasView extends CommonView {
	constructor() {
		const canvas1 = Block.Create('canvas', {'id': '1', 'width': '850', 'height': '850'}, ['canv1'], "");
		const canvas2 = Block.Create('canvas', {'id': '2', 'width': '850', 'height': '850'}, ['canv2'], "");
		// canvas.style.setProperty("position", "absolute");
		super([canvas1, canvas2]);

		this.el.style.setProperty("border", "none");
		this.el.style.setProperty("background-image", "./image/cats.jpg");


		this.canvas1 = canvas1;
		this.canvas2 = canvas2;


		this.ctx1 = this.canvas1.el.getContext('2d');
		this.ctx2 = this.canvas2.el.getContext('2d');


		this.canvas1.el.style.setProperty("position", "absolute");
		this.canvas2.el.style.setProperty("position", "absolute");
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

}