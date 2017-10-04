'use strict';
import Block from "../common block/block";

export default class Row extends Block {

    constructor(innerBlock = [], attrs = {}, classes = []) {
        super('tr', attrs, classes);
        innerBlock.forEach(this.appendChild());
    }
}