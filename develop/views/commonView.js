"use strict";
import Block from "../blocks/block/block.js";

import EventBus from "../modules/eventBus"

export default class CommonView extends Block {
	constructor(blocks) {
		const view = document.createElement("section");
		const attrs = [
			{"display": "flex"},
			{"flex-direction": "column"},
			{"align-items": "center"},
			{"justify-content": "center"}
			];


		super(view);

		// attrs.forEach(function(attr) {
		// 	this.el.setAttribute(attr, attrs[attr]);
		// });

		for (const block in blocks) {
			this.append(blocks[block]);
		}
	}
}


