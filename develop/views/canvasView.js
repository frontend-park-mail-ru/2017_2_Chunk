"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class CanvasView extends CommonView {
	constructor(eventBus) {
		const canvas1 = Block.Create('canvas', {'width': '850', 'height': '850'}, ['canv1'], "");
		const canvas2 = Block.Create('canvas', {'width': '850', 'height': '850'}, ['canv2'], "");
		const winDiv = Block.Create('div', {}, ["winDiv"], "");

		super([canvas1, canvas2, winDiv]);

		this.el.style.setProperty("border", "none");
		this.el.style.setProperty("background-image", "./image/cats.jpg");

		this.canvas1 = canvas1;
		this.canvas2 = canvas2;
		this.winDiv = winDiv;
		this.winDiv.hide();

		this.canvasForClicks = this.canvas2.el;
		this.canvasForCubes = this.canvas1.el.getContext('2d');
		this.canvasForFigure = this.canvas2.el.getContext('2d');

		this.eventBus = eventBus;
		this.eventBus.on("endOfGame", (win) => {
			if (win) {
				this.winDiv.setText("You win! =)");
			}
			else {
				this.winDiv.setText("You lose! =(");
			}
			this.winDiv.show();
		});

		this.canvas1.el.style.setProperty("position", "absolute");
		this.canvas2.el.style.setProperty("position", "absolute");
		this.hide();
	}
}