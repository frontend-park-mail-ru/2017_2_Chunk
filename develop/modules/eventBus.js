"use strict";

export default class EventBus {
	constructor() {
		this.listeners = {};
	}

	on(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		console.log("ON emitBus");
	}

	emit(event, data) {
		this.listeners[event].forEach(function (listener) {
			listener(data);
		})
	}
}

