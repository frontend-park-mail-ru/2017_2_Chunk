(function () {
	'use strict';


	/**
	 * Модуль, предоставляющий методы для выполнения HTTP-запросов
	 * @module Http
	 */

	class Http {
		/**
		 * Выполняет GET-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 * @param {Function} callback - функция-коллбек
		 */
		static Get(address, callback) {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', address, true);
			xhr.withCredentials = true;

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				if (+xhr.status >= 400) {
					console.log('где-то уже распарсил', xhr);
					return callback(xhr, null);
				}

				// const response = JSON.parse(xhr.responseText).errorMessage;
				console.log(xhr.responseText);
				console.log(JSON.parse(xhr.responseText));
				callback(null, JSON.parse(xhr.responseText));
			};

			xhr.send();
		}

		/**
		 * Выполняет POST-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 * @param {*} body - тело запроса (объект)
		 * @param {Function} callback - функция-коллбек
		 */
		static Post(address, body, callback) {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', address, true);
			xhr.withCredentials = true;
			xhr.timeout = 15000;
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				if (+xhr.status >= 400) {
					return callback(JSON.parse(xhr.responseText).errorMessage, null);
				}
				// const response = JSON.parse(xhr.responseText);
				// console.log(response);
				callback(null, xhr);
			};

			xhr.send(JSON.stringify(body));
		}
	}

	window.Http = Http;

})();