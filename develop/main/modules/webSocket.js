'use strict';
import eventBus from './eventBus';
import lobbyCodes from '../messageCodes/lobbyCodes';


export default class webSocket {
	constructor() {
		this.bus = eventBus;
		this.socket = new WebSocket('wss://backend-java-spring.herokuapp.com/play');
		this.socketListeners = {};
		this.socketCallbacks();
	}


	gameHandler() {
		this.socketListeners[lobbyCodes.requestEventName]
			= this.bus.on(lobbyCodes.requestEventName, (data) => {
			this.socket.send(JSON.stringify(data));
		});
	}


	socketCallbacks() {
		this.socket.onopen = () => this.onOpenCallback();
		this.socket.onclose = (event) => this.onCloseCallback(event);
		this.socket.onmessage = (event) => this.onMessageCallback(event);
		this.socket.onerror = (event) => this.onErrorCallback(event)
	}


	gettingStart() {
		this.gameHandler();
		this.bus.emit(lobbyCodes.requestEventName, lobbyCodes.getGamesFullList);
		this.bus.emit(lobbyCodes.requestEventName, lobbyCodes.subscribeLobbyUpdates);
		this.keepAliveEvent();
		this.openMenuEvent();
	}


	keepAliveEvent() {
		const emitKeepAlive = () => {
			this.bus.emit(lobbyCodes.requestEventName, lobbyCodes.keepAlive);
			console.log('keepAlive');
		};
		this.interval = setInterval(emitKeepAlive, 30000);
	}


	openMenuEvent() {
		this.socketListeners['openMenu'] = this.bus.on('openMenu', () => {
			this.bus.emit(`${lobbyCodes.responseEventName}${lobbyCodes.close}`);
		});
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.close}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.close}`, () => {
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
		this.removeSocketListeners();
		this.bus.emit(`${lobbyCodes.responseEventName}${lobbyCodes.close}`);
		this.bus.emit('goToMenu');
	}


	removeSocketListeners() {
		for (let listener in this.socketListeners) {
			this.bus.remove(`${listener}`, this.socketListeners[listener]);
		}
	}


	onMessageCallback(event) {
		const response = JSON.parse(event.data);
		console.log(response);
		this.bus.emit(`${lobbyCodes.responseEventName}${response.code}`, (response));
	}


	onErrorCallback(error) {
		clearInterval(this.interval);
		console.log('web socket error! ', error);
	}
}
