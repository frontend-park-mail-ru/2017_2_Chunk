'use strict';

export default class webSocket {
	constructor() {
		this.socket = new WebSocket('ws://backend-java-spring.herokuapp.com');

		this.socket.onopen = () => {
			alert('Соединение установлено.');
		};

		this.socket.onclose = (event) => {
			if (event.wasClean) {
				alert('Соединение закрыто чисто');
			} else {
				alert('Обрыв соединения');
			}
			alert('Код: ' + event.code + ' причина: ' + event.reason);
		};

		this.socket.onmessage = (event) => {
			alert('Получены данные ' + event.data);
		};

		this.socket.onerror = (error) => {
			alert('Ошибка ' + error.message);
		};
	}

}
