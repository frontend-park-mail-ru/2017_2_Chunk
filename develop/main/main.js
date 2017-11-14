
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from './views/menuView/menuView';

import SignUpView from './views/signUpView/signUpView';

import LoginView from './views/loginView/loginView';

import BackButtonView from './views/backButtonView/backButtonView';

import ProfileView from './views/profileView/profileView';

import RulesView from './views/rulesView/rulesView';

import ScoreboardView from './views/scoreboardView/scoreboardView';

import UpdateView from './views/updateView/updateView';

import Canvas from './views/canvasView/canvasView';

import LobbyView from './views/lobbyView/lobbyView';

import GameCreateView from './views/lobbyView/__gameCreateView/lobbyView__gameCreateView';

import Block from './blocks/block/block.js';

import UserService from './services/user-service.js';

import EventBus from './modules/eventBus';

import Router from './modules/router/router';

import Game from './Game/game';


const userService = new UserService();

const eventBus = EventBus;

const app = new Block(document.body);

app.el.classList.add('main_theme-black-orange');

const router = new Router(eventBus, userService);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus, userService, router);

const updateView = new UpdateView(eventBus, userService, router);

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const backButtonView = new BackButtonView();

const scoreboardView = new ScoreboardView(eventBus, userService);

const canvas = new Canvas(eventBus);

const lobbyView = new LobbyView(eventBus);

const gameCreateView = new GameCreateView();

const game = new Game(canvas, eventBus);


const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backButtonView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(canvas);
Views.push(lobbyView);
Views.push(gameCreateView);


eventBus.on('openSignUp', function () {
	Views.forEach((view) => {
		view.hide();
	});
	signUpView.show();
	backButtonView.show();
});


eventBus.on('openLogin', function () {
	Views.forEach((view) => {
		view.hide();
	});
	loginView.show();
	backButtonView.show();
});


eventBus.on('openUpdate', function () {
	Views.forEach((view) => {
		view.hide();
	});
	updateView.show();
	backButtonView.show();
});


eventBus.on('openRules', function () {
	Views.forEach((view) => {
		view.hide();
	});
	rulesView.show();
	backButtonView.show();
});


eventBus.on('openMenu', function () {
	Views.forEach((view) => {
		view.hide();
	});
	const browserStorage = window.localStorage;

	if (browserStorage.gameID) {
		browserStorage.removeItem('gameID');
	}

	menuView.show();
});


eventBus.on('exit', function () {
	userService.logout();
	eventBus.emit('unauth');
	router.goTo('/menu');
});


eventBus.on('openScoreboard', function () {
	Views.forEach((view) => {
		view.hide();
	});
	scoreboardView.show();
	backButtonView.show();
});


eventBus.on('openGame', function () {
	Views.forEach((view) => {
		view.hide();
	});
	backButtonView.show();
	canvas.show();
	game.startGame(() => router.goTo('/menu')); // выход в меню
});


eventBus.on('openLobby', function () {
	Views.forEach((view) => {
		view.hide();
	});
	lobbyView.el.classList.remove('lobbyView_filter-smooth');
	backButtonView.show();
	lobbyView.show();
});



app
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backButtonView)
	.append(profileView)
	.append(rulesView)
	.append(scoreboardView)
	.append(canvas)
	.append(lobbyView)
	.append(updateView)
	.append(gameCreateView);


router.start();
