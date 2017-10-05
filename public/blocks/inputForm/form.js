'use strict';

import Row from "../tableRow/row.js";
import Cell from "../tableCell/cell.js";
import Panel from "../divPanel/panel.js";
import Block from "../commonBlock/block.js";


export default class Form extends Panel {

	constructor(buttonName = 'Submit!', attrs = {}, classes = []) {
		super();
		const inputForm = new Block('form', { method: 'POST', action: '#' });
		attrs.cellspacing = '10';
		this.table = new Block('table', attrs, ['input_form', ...classes]);

		// Создание варнинга
		this.warning = new Row(
			[new Cell(
				[],
				{ colspan: '2' },
				['alert_message']
			)],
			{hidden: 'true'}
		);

		// Создание кнопки
		this.submit = new Row(
			[ new Cell(
				[new Block(
					'input',
					{type: 'submit', value: buttonName}
				)],
				{ colspan: '2', align: 'center' }
			)]
		);
		this
			.appendChild(inputForm
				.appendChild(this.table
					.appendChild(this.warning)
					.appendChild(this.submit)
				)
			);

		// Массив инпутов
		this.inputs = [];
	}

	addField(labelText, type, placeholder, classes = []) {

		let label = new Block('label');
		label.setText(labelText);
		let firstCell = new Cell([label], { align: 'right' });

		let input = new Block(
			'input',
			{ type: type, placeholder: placeholder },
			classes
		);
		let secondCell = new Cell([input]);
		this.inputs.push(input);

		let newField = new Row([firstCell, secondCell]);
		this.table.insertBefore(newField, this.submit);

		return this;
	}

	clearFields() {
		this.warning.element.childNodes[0].innerHTML = "";
		this.warning.hide();
		this.inputs.forEach(input => {
			input.setText("");
		})
	}

	getValues() {
		let values = [];
		this.inputs.forEach(input => {
			values.push(input.value);
		})
	}

	setWarning(warningMessage) {
		// this.warning.setText(warningMessage);
		this.warning.element.childNodes[0].innerHTML = warningMessage;
		this.warning.unhide();
	}

	addEventListener() {

	}
}