"use strict";

import Block from "../blocks/block/block"

export default class Router {
	constructor(eventBus, userService) {
		this.routes = [
			{
				url: "/menu",
				event: "openMenu"
			},
			{
				url: "/exit",
				event: "exit"
			},
			{
				url: "/game",
				event: "openGame"
			},
			{
				url: "/update",
				event: "openUpdate"
			},
			{
				url: "/scoreboard",
				event: "openScoreboard"
			},
			{
				url: "/rules",
				event: "openRules"
			},
			{
				url: "/signup",
				event: "openSignUp"
			},
			{
				url: "/login",
				event: "openLogin"
			},

			];


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
				return;
			}
		}, false);


		window.onpopstate = function() {
			console.log(location.pathname);
			this.changeState(location.pathname);
		}.bind(this);
	}

	start() {
		this._routes = [];
		this.counter = 0;
		this.routes.forEach(function (route) {
			this._routes.push({
				url_pattern: route.url,
				emit: function (event) {
					this.bus.emit(event)
				}.bind(this)
			});
		}.bind(this));


		this.userService.getDataFetch()
			.then(function (resp) {
				this.bus.emit("auth", resp.username);

				const slice_Routes = this._routes.slice(0, 6);
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
			}.bind(this))
			.catch(function (err) {
				this.bus.emit("unauth");
				const slice_Routes = this._routes.slice(4);
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
			}.bind(this))
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
}

