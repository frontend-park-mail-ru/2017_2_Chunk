'use strict';
import Block from "../common block/block";
import Row from "../trow/row";
import Cell from "../cell/cell"

export default class Form extends Block {

    constructor(buttonName = 'Submit!', attrs = {}, classes = []) {

        super('form', [], {method: 'POST', action: '#'});
        attrs.cellspacing = "10";
        this.table = new Block('table', ['input_form', ...classes], attrs);

        // Создание варнинга
        this.warning = new Row(
            new Cell([], {colspan: '2'}, ['alert_massege']),
            {hidden: 'true'}
        );

        // Создание кнопки
        this.submit = new Row(
            [ new Cell(
                new Block(
                    'input',
                    {type: 'submit', value: buttonName}
                    )
            )],
            {colspan: '2', align: 'center'}
        );

        // Массив инпутов
        this.inputs = [];
    }

    addField(labelText, type, placeholder, classes = []) {

        let label = new Block('label');
        label.setText(labelText);
        let firstCell = new Cell(label, {align: 'right'});

        let input = new Block('input', {type: type, placeholder: placeholder}, classes);
        let secondCell = new Cell(input);
        this.inputs.push(input);

        let newField = new Row([firstCell, secondCell]);
        document.insertBefore(newField.element, this.submit.element);

        return this;
    }
}