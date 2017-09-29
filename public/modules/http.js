(function () {
	'use strict';

	const baseUrl = `${window.location.protocol}//${window.location.host}`;

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
					return callback(xhr, null);
				}

				// const response = JSON.parse(xhr.responseText).errorMessage;
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
				callback(null, xhr);
			};

			xhr.send(JSON.stringify(body));
		}


		static FetchGet(address) {
			const url = (Http.BaseUrl || baseUrl) + address;
			return fetch(url, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			})
				.then(function (response) {
					if (response.status >= 400) {
						throw response;
					}

					return response.json();
				});
		}


		static FetchPost(address, body) {
			const url = address;
			return fetch(url, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
		}
	}
	Http.BaseUrl = null;

	window.Http = Http;

})();