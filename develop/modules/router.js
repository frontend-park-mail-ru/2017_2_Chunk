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
				url: "/scoreboard",
				event: "openScoreboard"
			},
			{
				url: "/rules",
				event: "openRules"
			},
			{
				url: "/update",
				event: "openUpdate"
			},
			{
				url: "/signup",
				event: "openSignUp"
			},
			{
				url: "/login",
				event: "openLogin"
			},
			{
				url: "/game",
				event: "openGame"
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
			return;
		}.bind(this);
	}

	start() {
		this._routes = [];
		this.routes.forEach(function(route) {
			this._routes.push({
				url_pattern: route.url,
				emit: function(event) {this.bus.emit(event)}.bind(this)
			});
		}.bind(this));

		let auth = this.userService.isLoggedIn();

		if(auth) {
			for (let i = 0; i < 4; i++) {
				if(location.pathname.match(this._routes[i].url_pattern)) {
					window.history.pushState({page: this.routes[number].url}, route.url_pattern, route.url_pattern);
					this._routes[i].emit(this.routes[i].event);
					return;
				}
			}
			window.history.pushState({page: this.routes[0].url}, this.routes[0].url, this.routes[0].url);
			this._routes[0].emit(this._routes[0].event);
		}
		else {
			this._routes.forEach(function (route, number) {
				if (location.pathname.match(route.url_pattern)) {//match вернет null при отсутсвии совпадения
					window.history.pushState({page: this.routes[number].url}, route.url_pattern, route.url_pattern);
					route.emit(this.routes[number].event);
				}
			}.bind(this));
		}
	}


	goTo(path) {
		this._routes.forEach((route, number) => {
			if(path.match(route.url_pattern)) {
				window.history.pushState({page: "bla"}, "bla", route.url_pattern);
				route.emit(this.routes[number].event);
				return;
			}
		});
	}


	//для кнопки назад и вперед
	changeState(path) {
		this._routes.forEach((route, number) => {
			if(path.match(route.url_pattern)) {
				route.emit(this.routes[number].event);
				return;
			}
		});
	}
}

