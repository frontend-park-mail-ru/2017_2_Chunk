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

		this.bus.on('webSocketMessage', (data) => {
			this.socket.send(JSON.stringify(message));
		});
		//how to use it?
		// const data = {
		// 	code: 123,
		// 	message: 'bla bla bla'
		// };
		// this.bus.emit('webSocketMessage', data)
	}


	socketCallbacks() {
		this.socket.onopen = () => {
			this.getFullGameList();
			this.subscribeNewGameNode();
		};
		this.socket.onclose = (event) => {
			if (event.wasClean) {
				console.log('web socket close is clean');
			} else {
				console.log('web socket close is not clean');
			}
			alert('Код: ' + event.code + ' причина: ' + event.reason);
			this.bus.emit('socketClose');
		};
		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			this.bus.emit(`socketCode${data.code}`, (data))
		};
		this.socket.onerror = (error) => {
			console.log('web socket error!');
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
