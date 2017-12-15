'use strict';
// const backendUrl = 'https://backend-java-spring.herokuapp.com';
const backendUrl = 'http://localhost:5050';
const baseUrl = `${window.location.protocol}//${window.location.host}:5050`;
// console.log('baseUrl = ', baseUrl);


/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */
export default class Http {
	/**
	 * Выполняет GET-запрос по указанному адресу
	 * @param {string} address - адрес запроса
	 * @return {Promise}
	 */
	static fetchGet(address) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json; charset=utf-8');
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: myHeaders,
		});
	}


	/**
	 * Выполняет POST-запрос по указанному адресу
	 * @param {Object} body - body-request
	 * @param {string} address - адрес запроса
	 * @return {Promise}
	 */
	static fetchPost(address, body) {
		const url = backendUrl + address;
		const myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json; charset=utf-8');
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: myHeaders
		});
	}
}
Http.BaseUrl = null;
