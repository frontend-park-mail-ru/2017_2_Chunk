"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";


export default class backButtonView extends CommonView {
	constructor() {
		const backButton = {
			back: Block.Create('button', {}, ['button', 'back'], 'Back'),
		};
		super(backButton);

		this.hide();
	}
}