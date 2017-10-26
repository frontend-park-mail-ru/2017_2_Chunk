"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class backButtonView extends CommonView {
	constructor() {
		const backButton = {
			back: Block.Create('a', {'href': '/menu'}, ["back__button"], 'Back'),
		};
		super(backButton);

		this.el.style.setProperty("align-items", "flex-start");
		this.el.style.setProperty("border", "none");

		this.hide();
	}
}