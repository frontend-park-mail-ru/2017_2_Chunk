"use strict";
import Block from "../blocks/block/index.js";

export default class CommonView extends Block {
	constructor(blocks) {
		const view = document.createElement("section");
		super(view);
		for (let block in blocks) {
			this.append(blocks[block]);
		}
	}
}


