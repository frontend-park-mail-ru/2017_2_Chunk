import Block from "./blocks/block/index.js";

/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import Scoreboard from "./blocks/scoreboard/index.js";
import Form from "./blocks/form/index.js";
import Message from "./blocks/message/index.js";

import loginFields from "./configs/login-fields";
import signupFields from "./configs/signup-fields";
import UserService from "./services/user-service.js"

const userService = new UserService();

const app = new Block(document.body);
const title = Block.Create('a', {}, ['application-header'], 'Tower Defence');

const sections = {
	back: Block.Create('section', {}, ['back-section', 'section']),
	menu: Block.Create('section', {}, ['menu-section', 'section']),
	login: Block.Create('section', {}, ['login-section', 'section']),
	signup: Block.Create('section', {}, ['signup-section', 'section']),
	scores: Block.Create('section', {}, ['scores-section', 'section']),
	profile: Block.Create('section', {}, ['profile-section', 'section']),
	hide() {
		this.back.hide();
		this.menu.hide();
		this.login.hide();
		this.signup.hide();
		this.scores.hide();
		this.profile.hide();
	},
};

sections.hide();

app
	.append(title)
	.append(sections.back)
	.append(sections.menu)
	.append(sections.login)
	.append(sections.signup)
	.append(sections.scores)
	.append(sections.profile);


/**
 * Открывает меню логина
 */
function openLogin() {
	if (!sections.login.ready) {
		sections.login.loginform = new Form(loginFields);
		sections.signup.message = new Message();

		sections.login.loginform.onSubmit(function (formdata) {
			sections.signup.message.clear();
			sections.signup.message.hide();
			userService.login(formdata.email, formdata.password, function (err, resp) {
				if (err) {
					sections.signup.message.setText(err);
					sections.signup.message.show();
					return;
				}

				sections.login.loginform.reset();
				userService.getDataFetch(function (err, resp) {
					if (err) {
						sections.signup.message.setText(err);
						sections.signup.message.show();
						return;
					}
					openMenu();
				}, true);
			});
		});
		sections.login
			.append(sections.signup.message)
			.append(Block.Create('h2', {}, ['section_title'], 'Войдите'))
			.append(sections.login.loginform);
		sections.signup.message.hide();
		sections.login.ready = true;
	}
	sections.hide();
	backToPrevPage('signup');
	if (userService.isLoggedIn()) {
		return openMenu();
	}
	sections.login.show();
}

/**
 * Открывает меню регистрации
 */
function openSignup() {
	if (!sections.signup.ready) {
		sections.signup.signupform = new Form(signupFields);
		sections.signup.message = new Message();//в случае ошибки block.show()text = err_message
		sections.signup.signupform.onSubmit(function (formdata) {
				sections.signup.message.clear();
				sections.signup.message.hide();

				//отслыаем данные на сервер
				userService.signup(formdata.email, formdata.password, formdata.confirm)
					.then(function (resp) {
						sections.signup.signupform.reset();

						//получаем данные пользователя
						userService.getDataFetch()
							.then(function (res) {
								console.log(res);
								openMenu();
							})
							.catch(function (err) {
								sections.signup.message.setText(err.message);
								sections.signup.message.show();
							});
					})
					.catch(function (err) {
						sections.signup.message.setText(err.message);
						sections.signup.message.show();
					})
			}
		);
		sections.signup
			.append(sections.signup.message)
			.append(Block.Create('h2', {}, ['section_title'], 'Зарегистрируйтесь'))
			.append(sections.signup.signupform);
		sections.signup.message.hide();
		sections.signup.ready = true;
	}
	sections.hide();
	backToPrevPage('signup');

	if (userService.isLoggedIn()) {
		return openMenu();
	}
	sections.signup.show();
}

/**
 * Додавбляет кнопку назад
 */
function backToPrevPage(current_page) {
	if (!sections.back.ready) {
		sections.back.items = {
			back: Block.Create('button', {'data-section': 'back'}, ['button', 'back'], 'Назад'),
		};
		sections.back.on('click', function (event) {
			event.preventDefault();
			const target = event.target;
			const section = target.getAttribute('data-section');
			if (section === 'back') {
				switch (current_page) {
					case 'signup': {

						openMenu();
						break;
					}
					case 'login': {
						openMenu();
						break;
					}
				}
			}
		});
		sections.back
			.append(sections.back.items.back);
		sections.back.ready = true;
	}
	sections.back.hide();

	if (current_page === 'signup' || current_page === 'login') {
		sections.back.show();
	}

}


/**
 * Открывает таблицу рекордов
 */
function openScores() {
	sections.hide();
	sections.scores.scoreboard = new Scoreboard();
	sections.scores.scoreboard.update([{name: 'Igor', score: '100'}, {name: 'Nikita', score: '120'},
		{name: 'Lena', score: '130'}]);
	sections.scores
		.append(Block.Create('h2', {}, [], 'Список лидеров'))
		.append(sections.scores.scoreboard);
	sections.scores.show();
}


/**
 * Открывает основное меню
 */
function openMenu() {
	if (!sections.menu.ready) {
		sections.menu.items = {
			profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], 'dfdfgdf'),
			play: Block.Create('button', {'data-section': 'play'}, ['button', 'auth'], 'Играть'),
			signup: Block.Create('button', {'data-section': 'signup'}, ['button', 'unauth'], 'Зарегистрироваться'),
			login: Block.Create('button', {'data-section': 'login'}, ['button', 'unauth'], 'Вход'),
			settings: Block.Create('button', {'data-section': 'settings'}, ['button', 'auth'], 'Настройки'),
			rules: Block.Create('button', {'data-section': 'rules'}, ['button', 'unauth'], 'Правила'),
			scores: Block.Create('button', {'data-section': 'scores'}, ['button', 'unauth'], 'Таблица лидеров'),
			exit: Block.Create('button', {'data-section': 'exit'}, ['button', 'auth'], 'Выход'),
		};

		sections.menu.on('click', function (event) {
			event.preventDefault();
			const target = event.target;
			const section = target.getAttribute('data-section');
			switch (section) {
				case 'login':
					openLogin();
					break;
				case 'signup':
					openSignup();
					break;
				case 'scores':
					openScores();
					break;
				case 'profile':
					openProfile();
					break;
				case 'exit':
					userService.logout();
					openMenu();
					break;
			}
		});
		sections.menu
			.append(sections.menu.items.profile)
			.append(sections.menu.items.play)
			.append(sections.menu.items.signup)
			.append(sections.menu.items.login)
			.append(sections.menu.items.settings)
			.append(sections.menu.items.rules)
			.append(sections.menu.items.scores)
			.append(sections.menu.items.exit);
		sections.menu.ready = true;
	}
	sections.hide();


	if (userService.isLoggedIn()) {
		userService.getData(function (err, resp) {
			sections.menu.items.profile.setText(resp);
		});
		sections.menu.items.profile.show();
		sections.menu.items.play.show();
		sections.menu.items.login.hide();
		sections.menu.items.signup.hide();
		sections.menu.items.settings.show();
		sections.menu.items.rules.show();
		sections.menu.items.scores.show();
		sections.menu.items.exit.show();
	} else {
		sections.menu.items.profile.hide();
		sections.menu.items.play.hide();
		sections.menu.items.login.show();
		sections.menu.items.signup.show();
		sections.menu.items.settings.hide();
		sections.menu.items.rules.show();
		sections.menu.items.scores.show();
		sections.menu.items.exit.hide();
	}
	sections.menu.show();
}

/**
 * Открытие меню по клиу на заголовок
 */
title.on('click', openMenu);
openMenu();

/**
 * Получает данные пользователя
 */
userService.getData(function (err, resp) {
	if (err) {
		return;
	}
	openMenu();
}, true);
