
'use strict';
//в Fetch post не получается получить в ответ объект json c ошибкой
	// const backendUrl = 'https://chunkgame.herokuapp.com';
	const backendUrl = "";
	const baseUrl = `${window.location.protocol}//${window.location.host}`;

	console.log("baseUrl = ", baseUrl);
	/**
	 * Модуль, предоставляющий методы для выполнения HTTP-запросов
	 * @module Http
	 */

	export default class Http {
		/**
		 * Выполняет GET-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 * @param {Function} callback - функция-коллбек
		 */
		// static Get(address, callback) {
		// 	const xhr = new XMLHttpRequest();
		// 	xhr.open('GET', backendUrl + address, true);
		// 	xhr.withCredentials = true;
		//
		// 	xhr.onreadystatechange = function () {
		// 		if (xhr.readyState !== 4) return;
		// 		if (+xhr.status >= 400) {
		// 			return callback(xhr, null);
		// 		}
		//
		// 		callback(null, JSON.parse(xhr.responseText));
		// 	};
		//
		// 	xhr.send();
		// }
		//
		// /**
		//  * Выполняет POST-запрос по указанному адресу
		//  * @param {string} address - адрес запроса
		//  * @param {*} body - тело запроса (объект)
		//  * @param {Function} callback - функция-коллбек
		//  */
		// static Post(address, body, callback) {
		// 	const xhr = new XMLHttpRequest();
		// 	xhr.open('POST', backendUrl + address, true);
		// 	xhr.withCredentials = true;
		// 	xhr.timeout = 15000;
		// 	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
		//
		// 	xhr.onreadystatechange = function () {
		// 		if (xhr.readyState !== 4) return;
		// 		if (+xhr.status >= 400) {
		// 			return callback(JSON.parse(xhr.responseText).errorMessage, null);
		// 		}
		// 		callback(null, xhr);
		// 	};
		//
		// 	xhr.send(JSON.stringify(body));
		// }



		//какие орматы даных здесь?
		//что попадает в throw response, что в response json
		/**
		 * Выполняет GET-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 */
		static FetchGet(address) {
			const url = backendUrl + address;
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

		/**
		 * Выполняет POST-запрос по указанному адресу
		 * @param {Object} body - body-request
		 * @param {string} address - адрес запроса
		 */

		//Не получается получить из json errMessage.
		//
		//
		//
		static async FetchPost(address, body) {
			const url = backendUrl + address;
			return await fetch(url, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then(function (response) {
				if (response.status >= 400) {
					throw response;
				}
				return response.json();
			});
		}
	}
	Http.BaseUrl = null;
