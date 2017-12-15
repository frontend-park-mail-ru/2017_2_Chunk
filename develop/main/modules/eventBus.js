'use strict';
/**
 * Модуль, предоставляющий интерфейс для работы с событиями
 * @module EventBus
 */
export default new class EventBus {
	constructor() {
		this.listeners = {};
	}


	/**
	 * Подписывает на собтые
	 * @param {string} event - название события
	 * @param {function} listener - функция вызываемая при наступлении события
	 */
	on(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		return listener;
	}


	/**
	 * Отписывается от события
	 * @param {string} event - название события
	 * @param {Object} listener - название события
	 */
	remove(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		const idx = this.listeners[event].indexOf(listener);
		if (idx !== -1) {
			delete this.listeners[event][idx];
		}
		if (!this.listeners[event].length) {
			delete this.listeners[event];
		}
	}

	/**
	 * Отписывается от события
	 * @param {string} event - название события
	 */
	off(event) {
		this.listeners[event] = this.listeners[event] || [];
		delete this.listeners[event];
	}


	/**
	 * Вызывает событие
	 * @param {string} event - название события
	 * @param {object} data - аргументы фунции, которая вызывается при наступлниея события
	 */
	emit(event, data) {
		this.listeners[event].forEach((listener) => {
			listener(data);
		});
	}
}();

