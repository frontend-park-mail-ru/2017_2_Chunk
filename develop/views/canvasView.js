"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class CanvasView extends CommonView {
	constructor(eventMarshrutka) {
		const canvas1 = Block.Create('canvas', {'width': '850', 'height': '850'}, ['canv1'], "");
		const canvas2 = Block.Create('canvas', {'width': '850', 'height': '850'}, ['canv2'], "");

		const winDiv = Block.Create('div', {}, ["winDiv"], "");
		// canvas.style.setProperty("position", "absolute");
		super([canvas1, canvas2, winDiv]);

		this.el.style.setProperty("border", "none");
		this.el.style.setProperty("background-image", "./image/cats.jpg");

		this.canvas1 = canvas1;
		this.canvas2 = canvas2;
		this.winDiv = winDiv;
		this.winDiv.hide();

		this.canv = this.canvas2.el;

		this.canvasForCubes = this.canvas1.el.getContext('2d');
		this.canvasForFigure = this.canvas2.el.getContext('2d');

		this.marshrutka = eventMarshrutka;
		this.marshrutka.on("endOfGame", (win) => {
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