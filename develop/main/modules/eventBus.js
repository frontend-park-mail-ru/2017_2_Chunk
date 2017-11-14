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
}

