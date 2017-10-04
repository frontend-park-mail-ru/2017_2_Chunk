'use strict';
import Block from "../common block/block";

export default class Cell extends Block {

    constructor(innerBlock = [], attrs = {}, classes = []) {
        super('td', attrs, classes);
        innerBlock.forEach(this.appendChild());
    }
}