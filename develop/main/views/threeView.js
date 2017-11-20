'use strict';

import CommonView from "./view/view";
import Block from "../blocks/block/block.js";

export default class ThreeView extends CommonView {
    constructor() {
        const gameContainer = Block.Create('div');
        super([gameContainer]);
        this.el.style.setProperty("border", "none");
        this.hide();
    }

    hide() {
        super.hide();
    }

    getElement() {
        return this.el;
    }
}