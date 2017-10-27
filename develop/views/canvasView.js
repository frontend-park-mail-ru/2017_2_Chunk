"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class canvasView extends CommonView {
	constructor(id, classes) {
		const canvas = {
			back: Block.Create('canvas',
				{'id': id, 'width': '850', 'height': '850'},
				[classes], ""),
		};
		super(canvas);

		this.el.style.setProperty("align-items", "flex-start");
		this.el.style.setProperty("border", "none");

		this.hide();
	}
}