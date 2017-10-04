'use strict';


export default class Block {


	constructor(tagName, attrs = {}, classes = []) {

		this.element = window.document.createElement(tagName);
		this.addClasses(classes);
		this.setAttributes(attrs);
	}

	appendChild(block) {

		this.element.appendChild(block.element);
		return this;
	}

	insertBefore(newBlock, referenceBlock) {
		this.element.insertBefore(newBlock.element, referenceBlock.element);
		return this;
	}

	addClasses(classes = []) {
		this.element.classList.add(...classes);
	}

	setAttributes(attrs = {}) {
		for (let attr in attrs) {
			// attr - ключ, attrs[attr] - значение
			this.element.setAttribute(attr, attrs[attr]);
		}
	}

	hidden(bool) {
		this.element.hidden = bool;
	}

	setText(text) {
		this.element.innerHTML = text;
	}

	addEventListener(event, handler, useCapture = false) {
		this.element.addEventListener(event, handler, useCapture);
	}
}