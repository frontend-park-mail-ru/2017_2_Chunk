"use strict";

import Block from "../blocks/block/block"

export default class Router {
	constructor(eventBus) {
		this.routes = [
			{
				url: "/menu",
				event: "openMenu"
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
				url: "/rules",
				event: "openRules"
			},
			{
				url: "/scoreboard",
				event: "openScoreboard"
			},
			{
				url: "/exit",
				event: "exit"
			}];

		this.bus = eventBus;

		this.app = new Block(document.body);


		//реагирует на любые клики. в том числе и сабмиты
		this.app.on("click", (event) => {
			event.preventDefault();
			const target = event.target;
			console.log(target.href);
			this.goTo(target.href);
		});


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


		this._routes.forEach(function(route, number) {
			if (location.pathname.match(route.url_pattern)) {//match вернет null при отсутсвии совпадения
				console.log("Matched!");
				window.history.pushState({page: this.routes[number].url}, route.url_pattern, route.url_pattern);
				route.emit(this.routes[number].event);
				return;
			}
		}.bind(this));
	}


	goTo(path) {
		this._routes.forEach((route, number) => {
			if(path.match(route.url_pattern)) {
				window.history.pushState({page: this.routes[number].url}, route.url_pattern, route.url_pattern);
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

