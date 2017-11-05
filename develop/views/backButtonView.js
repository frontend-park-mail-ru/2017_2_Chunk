"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";



export default class backButtonView extends Block {
	constructor() {
		const backButton = Block.Create('a', {'href': '/menu'}, ["back__button"], 'Menu');
		super(backButton.el);

		this.button = backButton;
		this.hide();
	}
}