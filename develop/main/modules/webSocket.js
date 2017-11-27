'use strict';
import eventBus from './eventBus';
import messageCodes from '../messageCodes/messageCodes';


export default class webSocket {
	constructor() {
		this.bus = eventBus;
		this.socket = new WebSocket('wss://backend-java-spring.herokuapp.com/play');
		this.gameHandler();
		this.socketCallbacks();
	}


	gameHandler() {
		this.bus.on(messageCodes.requestEventName, (data) => {
			this.socket.send(JSON.stringify(data));
		});
	}


	socketCallbacks() {
		this.socket.onopen = () => this.onOpenCallback();
		this.socket.onclose = () => this.onCloseCallback(event);
		this.socket.onmessage = () => this.onMessageCallback(event);
		this.socket.onerror = () => this.onErrorCallback(event)
	}


	gettingStart() {
		this.bus.emit(messageCodes.requestEventName, messageCodes.getGamesFullList);
		this.bus.emit(messageCodes.requestEventName, messageCodes.subscribeLobbyUpdates);
		this.keepAliveEvent();
		this.openMenuEvent();
	}


	keepAliveEvent() {
		const emitKeepAlive = () => {
			this.bus.emit(messageCodes.requestEventName, messageCodes.keepAlive);
			console.log('keepAlive');
		};
		this.interval = setInterval(emitKeepAlive, 30000);
	}


	openMenuEvent() {
		this.bus.on('openMenu', () => {
			this.bus.emit(`${messageCodes.responseEventName}Close`);
		});
		this.bus.on(`${messageCodes.responseEventName}Close`, () => {
			if (this.socket) {
				this.socket.close();
				delete this.socket;
			}
		});
	}


	onOpenCallback() {
		console.log('web socket open');
		this.gettingStart();
	}


	onCloseCallback(event) {
		if (event.wasClean) {
			console.log('web socket close is clean');
		} else {
			console.log('web socket close is not clean');
		}
		clearInterval(this.interval);
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
		delete this.socket;
		this.bus.emit('goToMenu');
	}


	onMessageCallback(event) {
		const data = JSON.parse(event.data);
		console.log(data);
		this.bus.emit(`${messageCodes.responseEventName}${data.code}`, (data));
	}


	onErrorCallback(error) {
		clearInterval(this.interval);
		console.log('web socket error! ', error);
	}
}
