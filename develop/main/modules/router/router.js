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
			const resp = this.userService.isLoggedIn();
			if (resp) {
				const slice_Routes = this._routes.slice(0, 8);
				const isValid = slice_Routes.some((_route) => {
						return location.pathname.match(_route.url_pattern);
					});
				if (isValid)
					this.changeState(location.pathname);
				else
					this.changeState(this._routes[0])
			}
			else {
				const slice_Routes = this._routes.slice(6);
				const isValid = slice_Routes.some((_route) => {
						return location.pathname.match(_route.url_pattern);
					});
				if (isValid)
					this.changeState(location.pathname);
				else
					this.changeState(this._routes[0]);
			}
		};

		this.bus.on('goToMenu', () => {
			this.goTo('/menu');
		});

		this.bus.on('createGame', () => {
			this.goTo('/waiting-hall');
		});

		this.bus.on('connectGame', () => {
			this.goTo('/waiting-hall');
		});

		this.bus.on('socketClose', () => {
			if (!location.pathname.match('/menu'))
				this.goTo('/menu');
		})
	}


	/**
	 * Выполняется при открытии и обновлении страницы. Определяет авторизован ли пользоваль
	 * и дает доступ только к разрешенному контенту
	 */
	async start() {
		this.addHrefListeners();
		try {
			const resp = await this.userService.getDataFetch();
			if (resp.ok) {
				this.bus.emit('auth', resp.json.username);
				const slice_Routes = this._routes.slice(0, 8);
				this.findNewState(slice_Routes);
			}
			else {
				this.bus.emit('unauth');
				const slice_Routes = this._routes.slice(6);
				this.findNewState(slice_Routes);
			}
		}
		catch (err) {
			this.bus.emit('unauth');
			const slice_Routes = this._routes.slice(6);
			this.findNewState(slice_Routes);
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
		window.history.pushState({page: this.routes[idx].url}, this.routes[idx].url, this.routes[idx].url);
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
	 * @param {string[]} slice_Routes - массив "разрешенных" урлов
	 */
	findNewState(slice_Routes) {
		const idx = slice_Routes.findIndex(function (_route) {
			return location.pathname.match(_route.url_pattern);
		});
		if (idx > -1) {
			const _route = slice_Routes[idx];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(_route.url_pattern);
		} else {
			const _route = this._routes[0];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(this.routes[0].url);
		}
	}
}

