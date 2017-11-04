"use strict";

import routerFields from "../templates/routerFields"
import Block from "../blocks/block/block"

/**
 * Модуль, предоставляющий интерфейс для работы с событиями
 * @module Router
 */
export default class Router {
	/**
	 * @param {class} eventBus - общий для всех модулей объект класс
	 * @param {class} userService - общий для всех модулей класс
	 * @constructor
	 */
	constructor(eventBus, userService) {
		this.routes = routerFields;
		this.bus = eventBus;
		this.userService = userService;
		this.app = new Block(document.body);

		//реагирует на любые клики. в том числе и сабмиты
		this.app.on("click", (event) => {
			const target = event.target;
			const type = target.tagName.toLowerCase();
			if (type === 'a'){
				event.preventDefault();
				this.goTo(target.href);
			}
		}, false);

		window.onpopstate = () => {
			console.log(location.pathname);
			this.changeState(location.pathname);
		};
	}



	async start() {
		this._routes = [];
		this.counter = 0;
		this.routes.forEach((route) => {
			this._routes.push({
				url_pattern: route.url,
				emit: (event) => {
					this.bus.emit(event)
				}
			});
		});

		const resp = await this.userService.getDataFetch();
		if (resp.ok) {
			this.bus.emit("auth", resp.json.username);
			const slice_Routes = this._routes.slice(0, 6);
			this.findNewState(slice_Routes);
		}
		else {
			this.bus.emit("unauth");
			const slice_Routes = this._routes.slice(4);
			this.findNewState(slice_Routes);
		}
	}


	goTo(path) {
		const idx = this._routes.findIndex((_route) => {
			return path.match(_route.url_pattern)
		});
		window.history.pushState({page: this.routes[idx].url}, this.routes[idx].url, this.routes[idx].url);
		this._routes[idx].emit(this.routes[idx].event);
	}


	//для кнопки назад и вперед
	changeState(path) {
		const idx = this._routes.findIndex((_route) => {
			return path.match(_route.url_pattern)
		});
		const _route = this._routes[idx];
		_route.emit(this.routes[idx].event);
	}


	findNewState(slice_Routes) {
		const idx = slice_Routes.findIndex(function (_route) {
			return location.pathname.match(_route.url_pattern);
		});
		if (idx > -1) {
			const _route = slice_Routes[idx];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(_route.url_pattern);
		}
		else {
			const _route = this._routes[0];
			window.history.replaceState(_route.url_pattern, _route.url_pattern, _route.url_pattern);
			this.changeState(this.routes[0].url);
		}
	}
}

