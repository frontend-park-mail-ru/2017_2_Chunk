'use strict';
import eventBus from './eventBus';


export default class webSocket {
	constructor() {
		this.bus = eventBus;
		this.socket = new WebSocket('wss://backend-java-spring.herokuapp.com/play');
		this.gameHandler();
		this.socketCallbacks();
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
		this.bus.on('socketMessage', (socketRequest) => {
			this.socket.send(JSON.stringify(socketRequest));
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
			console.log('web socket open');
			this.getFullGameList();
			this.subscribeNewGameNode();
			const keepAlive = {
				code: 0,
			};
			const emitKeepAlive = () => {
				this.bus.emit('socketMessage', keepAlive);
				console.log('keepAlive');
			};
			this.interval = setInterval(emitKeepAlive, 30000);
		};
		this.socket.onclose = (event) => {
			if (event.wasClean) {
				console.log('web socket close is clean');
			} else {
				console.log('web socket close is not clean');
			}
			clearInterval(this.interval);
			//alert('Код: ' + event.code + ' причина: ' + event.reason);
			this.bus.emit('socketClose');
		};
		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			this.bus.emit(`socketCode${data.code}`, (data))
		};
		this.socket.onerror = (error) => {
			clearInterval(this.interval);
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
