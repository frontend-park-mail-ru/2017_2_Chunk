'use strict';

import routerFields from './__fields/router__fields';
import Block from '../../blocks/block/block';


/**
 * Модуль, отвечающий за работу ссылками и роутинг
 * @module Router
 */
export default class Router {
	/**
	 * @param {class} eventBus - общий для всех модулей объект класса
	 * @param {class} userService - общий для всех модулей объект класса
	 * @constructor
	 */
	constructor(eventBus, userService) {
		this.routes = routerFields;
		this._routes = [];
		this.bus = eventBus;
		this.userService = userService;

		this.routes.forEach((route) => {
			this._routes.push({
				url_pattern: route.url,
				emit: (event) => {
					this.bus.emit(event);
				}
			});
		});

		window.onpopstate = () => {
			if (location.pathname === '/waiting-hall' || location.pathname === '/game') {
				this.goTo('/lobby');
				return;
			}
			const resp = this.userService.isLoggedIn();
			const locationPath = location.pathname;
			if (resp) {
				const sliceRoutes_ = this._routes.slice(0, 8);
				const isValid = sliceRoutes_.some((_route, index) =>
					locationPath.match(_route.url_pattern));
				if (isValid) {
					this.changeState(locationPath);
				} else {
					this.goTo(this._routes[0].url_pattern);
				}
			} else {
				const sliceRoutes_ = this._routes.slice(6);
				const isValid = sliceRoutes_.some((_route) =>
					locationPath.match(_route.url_pattern));
				if (isValid) {
					this.changeState(locationPath);
				} else {
					this.goTo(this._routes[0].url_pattern);
				}
			}
		};

		this.bus.on('goToMenu', () => {
			this.goTo('/menu');
		});


		this.bus.on('goToLobby', () => {
			this.goTo('/lobby');
		});

		this.bus.on('goToGame', () => {
			this.goTo('/game');
		});

		this.bus.on('createGame', () => {
			this.goTo('/waiting-hall');
		});

		this.bus.on('connectGame', () => {
			this.goTo('/waiting-hall');
		});

		this.bus.on('socketClose', () => {
			if (!location.pathname.match('/menu')) { this.goTo('/menu'); }
		});
	}


	/**
	 * Выполняется при открытии и обновлении страницы. Определяет авторизован ли пользоваль
	 * и дает доступ только к разрешенному контенту
	 */
	async start() {
		this.addHrefListeners();
		try {
			const resp = await this.userService.getDataFetch();
			this.bus.emit('removeStartLoader');
			if (resp.ok) {
				this.bus.emit('auth', resp.json.username);
				const sliceRoutes_ = this._routes.slice(0, 8);
				this.findNewState(sliceRoutes_);
			} else {
				this.bus.emit('unauth');
				const sliceRoutes_ = this._routes.slice(6);
				this.findNewState(sliceRoutes_);
			}
		} catch (err) {
			this.bus.emit('unauth');
			const sliceRoutes_ = this._routes.slice(6);
			this.findNewState(sliceRoutes_);
		}
	}


	/**
	 * Добавляет обработчики кликов по кнопкам-переходам
	 */
	addHrefListeners() {
		this.hrefs = Array.from(document.getElementsByTagName('a'));
		this.hrefs.forEach((href) => {
			href.addEventListener('click', (event) => {
				const target = event.target;
				event.preventDefault();
				this.goTo(target.href);
			});
		});
	}


	/**
	 * Переправляет на нужный урл (страницу)
	 * @param {string} path - урл перехода
	 */
	goTo(path) {
		const idx = this._routes.findIndex((_route) => path.match(_route.url_pattern));
		window.history.pushState({page: this.routes[idx].url},
			this.routes[idx].url, this.routes[idx].url);
		this._routes[idx].emit(this.routes[idx].event);
	}


	/**
	 * Переправляет на нужный урл (страницу) без добавления состояния в window.history.
	 * Используется для кнопок браузера "вперед" и "назад"
	 * @param {string} path - урл перехода
	 */
	changeState(path) {
		const idx = this._routes.findIndex((_route) => path.match(_route.url_pattern));
		const _route = this._routes[idx];
		_route.emit(this.routes[idx].event);
	}


	/**
	 * Выбирает нужный урл среди "разрешенных для пользователя". Иначе переправляет в меню.
	 * @param {string[]} sliceRoutes_ - массив "разрешенных" урлов
	 */
	findNewState(sliceRoutes_) {
		if (location.pathname === '/waiting-hall' || location.pathname === '/game') {
			this.goTo('/lobby');
		}
		const idx = sliceRoutes_.findIndex(function (_route) {
			return location.pathname.match(_route.url_pattern);
		});
		if (idx > -1) {
			const _route = sliceRoutes_[idx];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(_route.url_pattern);
		} else {
			const _route = this._routes[0];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(this.routes[0].url);
		}
	}
}