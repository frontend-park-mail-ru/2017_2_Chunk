(function () {
	'use strict';

	/**
	 * Базовый класс формы
	 * @module Form
	 */
	class Form extends Block {
		/**
		 * @param Fields []- корневой элемент блока
		 * @constructor
		 */
		constructor(fields = []) {
			const el = document.createElement('form');
			super(el);

			fields.forEach(function (field) {
				const f = Block.Create('input', field.attrs || {}, field.classes || []);
				this.append(f);
			}.bind(this));
		}


		onSubmit(callback) {
			this.el.addEventListener('submit', (event) => {
				event.preventDefault();
				const formdata = {};
				const elements = this.el.elements;
				//запись элементов формы в formdata
				for (let element in elements) {
					formdata[elements[element].name] = elements[element].value;
				}

				callback(formdata);
			});
		}

		// errorMessage (text) {
		//     this.password.value = this.confirm.value = '';
		//     this.message.parentElement.hidden = false;
		//     this.message.innerHTML = text;
		// }

		reset() {
			this.el.reset();
		}
	}

	window.Form = Form;

})();