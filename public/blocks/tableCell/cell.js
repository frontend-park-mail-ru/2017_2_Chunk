'use strict';
import Block from "../commonBlock/block.js";

export default class Cell extends Block {

    constructor(innerBlock = [], attrs = {}, classes = []) {
        super('td', attrs, classes);
        innerBlock.forEach(block => this.appendChild(block));
    }
}