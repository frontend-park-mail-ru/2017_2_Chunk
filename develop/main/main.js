/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from './views/menuView/menuView';

import SignUpView from './views/signUpView/signUpView';

import LoginView from './views/loginView/loginView';

import BackMenuButtonView from './views/backMenuButtonView/backMenuButtonView';

import BackButtonView from './views/backButtonView/backButtonView';

import ProfileView from './views/profileView/profileView';

import RulesView from './views/rulesView/rulesView';

import ScoreboardView from './views/scoreboardView/scoreboardView';

import UpdateView from './views/updateView/updateView';

import LobbyView from './views/lobbyView/lobbyView';

import GameCreateView from './views/lobbyView/__gameCreateView/lobbyView__gameCreateView';

import GamePrepareView from './views/gamePrepareView/gamePrepareView';

import Block from './blocks/block/block.js';

import UserService from './services/user-service.js';

import EventBus from './modules/eventBus';

import Router from './modules/router/router';

// import Game from './Game/game';

import ThreeView from "./views/threeView.js"

import Game3D from "./game3D/main";

import ServiceWorker from '../../public/serviceWorker';



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

const backMenuButtonView = new BackMenuButtonView();

const backButtonView = new BackButtonView();

const scoreboardView = new ScoreboardView(eventBus, userService);

// const canvas = new Canvas(eventBus);

const lobbyView = new LobbyView();

const gameCreateView = new GameCreateView();

const gamePrepareView = new GamePrepareView();

// const game = new Game(canvas, eventBus);

const gameContainer = new ThreeView();

const game3D = new Game3D(gameContainer);

const serviceWorker = ServiceWorker;


const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backMenuButtonView);
Views.push(backButtonView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(lobbyView);
Views.push(gameCreateView);
Views.push(gamePrepareView);
Views.push(gameContainer);


eventBus.on('openSignUp', function () {
    Views.forEach((view) => {
        view.hide();
    });
    signUpView.show();
    backMenuButtonView.show();
});


eventBus.on('openLogin', function () {
    Views.forEach((view) => {
        view.hide();
    });
    loginView.show();
    backMenuButtonView.show();
});


eventBus.on('openUpdate', function () {
    Views.forEach((view) => {
        view.hide();
    });
    updateView.show();
    backMenuButtonView.show();
});


eventBus.on('openRules', function () {
    Views.forEach((view) => {
        view.hide();
    });
    rulesView.show();
    backMenuButtonView.show();
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
    backMenuButtonView.show();
});


eventBus.on("openGame", () => {
    Views.forEach((view) => {
        view.hide();
    });
    //debugger;
    gameContainer.show();
    backMenuButtonView.show();
});


eventBus.on('openLobby', function () {
    Views.forEach((view) => {
        view.hide();
    });
    backMenuButtonView.show();
    lobbyView.show();
});

eventBus.on('openWaitingHall', function () {
    Views.forEach((view) => {
        view.hide();
    });
    backButtonView.show();
    gamePrepareView.show();
});



app
    .append(menuView)
    .append(signUpView)
    .append(loginView)
    .append(backMenuButtonView)
    .append(backButtonView)
    .append(profileView)
    .append(rulesView)
    .append(scoreboardView)
    .append(lobbyView)
    .append(updateView)
    .append(gameCreateView)
    .append(gamePrepareView)
    .append(gameContainer);


// if ('serviceWorker' in navigator) {
// 	const serviceWorker = navigator.serviceWorker;
// 	navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
// 		.then((reg) => {
// 			console.log('Succeeded registration ' + reg.scope);
// 		})
// 		.catch((err) => {
// 			console.log('Registration error');
// 		});
// }
//
//
// if (window.Worker) {
// 	const gameWorker = new Worker('worker.js')
//
//
// }

router.start();
