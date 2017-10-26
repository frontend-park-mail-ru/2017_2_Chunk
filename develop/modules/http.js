
'use strict';
//в Fetch post не получается получить в ответ объект json c ошибкой
	// const backendUrl = 'https://chunkgame.herokuapp.com';
	const backendUrl = "https://backend-java-spring.herokuapp.com";
	const baseUrl = `${window.location.protocol}//${window.location.host}`;

	console.log("baseUrl = ", baseUrl);
	/**
	 * Модуль, предоставляющий методы для выполнения HTTP-запросов
	 * @module Http
	 */

	export default class Http {
		//что попадает в throw response
		/**
		 * Выполняет GET-запрос по указанному адресу
		 * @param {string} address - адрес запроса
		 */
		static FetchGet(address) {
			const url = backendUrl + address;
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", 'application/json; charset=utf-8');
			return fetch(url, {
				method: 'GET',
				mode: 'no-cors',
				credentials: 'include',
				headers: myHeaders,
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
		static async FetchPost(address, body) {
			const url = backendUrl + address;
			return await fetch(url, {
				method: 'POST',
				mode: 'no-cors',
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
