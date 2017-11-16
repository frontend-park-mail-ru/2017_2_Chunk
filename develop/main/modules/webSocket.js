'use strict';
import eventBus from './eventBus';


export default class webSocket {
	constructor() {
		this.bus = eventBus;
		this.socket = new WebSocket('wss://backend-java-spring.herokuapp.com/play');

		this.socketCallbacks();
		this.gameHandler();

	}


	gameHandler() {
		this.bus.on('createGame', (data) => {
			this.socket.send(JSON.stringify(data));
		});
		this.bus.on('connectGame', (data) => {
			this.socket.send(JSON.stringify(data));
		});
		this.bus.on('getGameInfo', (data) => {
			this.socket.send(JSON.stringify(data));
		});
	}


	socketCallbacks() {
		this.socket.onopen = () => {
			alert('Соединение установлено.');
			this.getFullGameList();
			this.subscribeNewGameNode();
		};
		this.socket.onclose = (event) => {
			if (event.wasClean) {
				alert('Соединение закрыто чисто');
			} else {
				alert('Обрыв соединения');
			}
			alert('Код: ' + event.code + ' причина: ' + event.reason);
			this.bus.emit('socketClose');
		};
		this.socket.onmessage = (event) => {
			alert('Получены данные ' + event.data);
			const data = JSON.parse(event.data);
			this.bus.emit(`socketCode${data.code}`, (data))
		};
		this.socket.onerror = (error) => {
			alert('Ошибка ' + error.message);
		};
		this.bus.on('openMenu', () => {
			this.bus.emit('socketClose');
		});
		this.bus.on('socketClose', () => {
			this.socket.close();
		});
	}


	getFullGameList() {
		const data = JSON.stringify({
			code: '111',
		});
		this.socket.send(data);
	};


	subscribeNewGameNode() {
		const data = JSON.stringify({
			code: '106',
		});
		this.socket.send(data)
	}
}
