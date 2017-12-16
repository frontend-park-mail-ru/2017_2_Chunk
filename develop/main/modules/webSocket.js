'use strict';
import eventBus from './eventBus';
import lobbyCodes from '../messageCodes/lobbyCodes';


export default class webSocket {
	constructor() {
		this.bus = eventBus;
		this.socket = new WebSocket('wss://backend-java-spring.herokuapp.com/play');
		// this.socket = new WebSocket('ws://localhost:5050/play');
		this.socketListeners = {};
		this.socketCallbacks();
	}


	socketCallbacks() {
		this.socket.onopen = () => this.onOpenCallback();
		this.socket.onclose = (event) => this.onCloseCallback(event);
		this.socket.onmessage = (event) => this.onMessageCallback(event);
		this.socket.onerror = (event) => this.onErrorCallback(event);
	}


	gettingStart() {
		this.requestHandler();
		this.keepAliveEvent();
		this.openMenuEvent();
		this.openEmit();
	}


	requestHandler() {
		this.socketListeners[lobbyCodes.requestEventName] = this.bus.on(
			lobbyCodes.requestEventName,
			(data) => this.socket.send(JSON.stringify(data))
		);
	}


	keepAliveEvent() {
		const emitKeepAlive = () => {
			this.bus.emit(lobbyCodes.requestEventName, lobbyCodes.keepAlive);
			console.log('keepAlive');
		};
		this.interval = setInterval(emitKeepAlive, 30000);
	}


	openMenuEvent() {
		this.socketCloseEvent();
		this.socketCloseListener();
	}


	socketCloseEvent() {
		this.socketListeners.openMenu = this.bus.on('openMenu', () => {
			this.bus.emit(`${lobbyCodes.responseEventName}${lobbyCodes.close}`);
		});
	}


	socketCloseListener() {
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.close}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.close}`,
				() => {
					if (this.socket) {
						this.socket.close();
						delete this.socket;
					}
				});
	}


	openEmit() {
		this.bus.emit('socketOpen');
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
		for (const listener in this.socketListeners) {
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
