"use strict";
import Form from "../blocks/form/form.js";
import Block from "../blocks/commonBlock/block.js"

const URL_heroku = "https://chunkgame.herokuapp.com";


// Формирование POST запроса на регистрацию/авторизацию/изменение
function sign_up(username, password, email, callback) {

	// Регистрация или авторизация?
	const URL = URL_heroku + '/sign_up';

	let xhr = new XMLHttpRequest();

	// Обработчик ответа
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 201) {
			callback(JSON.parse(xhr.responseText).errorMessage, null);
		} else {
			callback(null, xhr);
		}
	};

	// Формирование POST запроса:
	xhr.open('POST', URL, true);            // заголовок запроса
	xhr.setRequestHeader('Content-Type',
		'application/json; charset=utf8');  // Content-Type для JSON
	xhr.withCredentials = true;             // Чтобы можно было получить куки
	xhr.timeout = 15000;                    // Время ожидания ответа от сервера
	xhr.send(JSON.stringify({
		username,
		password,
		email
	}));                                    // Отправка запроса с телом запроса
}

function sign_in(login, password, callback) {

	// Регистрация или авторизация?
	const URL = URL_heroku + '/sign_in';
	let xhr = new XMLHttpRequest();

	// Обработчик ответа
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;

		if (+xhr.status !== 200) {
			callback(JSON.parse(xhr.responseText).errorMessage, null);
		} else {
			callback(null, JSON.parse(xhr.responseText));
		}
	};

	// Формирование POST запроса:
	xhr.open('POST', URL, true);            // заголовок запроса
	xhr.setRequestHeader('Content-Type',
		'application/json; charset=utf8');  // Content-Type для JSON
	xhr.withCredentials = true;             // Чтобы можно было получить куки
	xhr.timeout = 15000;                    // Время ожидания ответа от сервера
	xhr.send(JSON.stringify({
		login,
		password,
	}));                                    // Отправка запроса с телом запроса
}

function settings(username, email, password, old_password, callback) {

	const URL = URL_heroku + '/update';
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			callback(JSON.parse(xhr.responseText).errorMessage, null);
		} else {
			callback(null, xhr);
		}
	};

	xhr.open('POST', URL, true);
	xhr.setRequestHeader('Content-Type',
		'application/json; charset=utf8');
	xhr.withCredentials = true;
	xhr.timeout = 15000;
	xhr.send(JSON.stringify({
		username,
		email,
		password,
		old_password
	}));
}

// Переключатель страницы для auth/unauth пользователя
function isAuth(username) {

	// Элементы отображаемые для auth/unauth пользователей
	const unauthElements = document.getElementsByClassName('unauth');
	const authElements = document.getElementsByClassName('auth');
	const profileName = document.querySelector('table.profile th');

	if (!username) {
		for (let i = 0; i < unauthElements.length; ++i) {
			unauthElements[i].hidden = false;
		}
		for (let i = 0; i < authElements.length; ++i) {
			authElements[i].hidden = true;
		}
		profileName.innerHTML = "";
	} else {
		for (let i = 0; i < unauthElements.length; ++i) {
			unauthElements[i].hidden = true;
		}
		for (let i = 0; i < authElements.length; ++i) {
			authElements[i].hidden = false;
		}
		profileName.innerHTML = username;
	}
}

// Формирование GET запроса на авторизацию с помощью кук
function whoIsIt(callback) {

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) return;
		callback(null, JSON.parse(xhr.responseText).username);
	};

	xhr.open('GET', URL_heroku + '/whoisit', true);
	xhr.withCredentials = true;
	xhr.timeout = 3000;
	xhr.send();
}

// Формирование GET запроса на получение имени и email с помощью кук
function getProfile(callback) {

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			callback(JSON.parse(xhr.responseText).errorMessage, null);
		} else {
			callback(null, JSON.parse(xhr.responseText));
		}
	};

	xhr.open('GET', URL_heroku + '/whoisit', true);
	xhr.withCredentials = true;
	xhr.timeout = 3000;
	xhr.send();
}

// Формирование GET запроса на удаление кук
function exit() {

	let xhr = new XMLHttpRequest();
	xhr.open('GET', URL_heroku + '/exit', true);
	xhr.withCredentials = true;
	xhr.send();
}

// Вывод варнинга
function warningMessage(text) {
	let spanMessage = document.querySelector('.warning span');
	if (!spanMessage.parentElement.hidden && text !== undefined) {
		// Чтобы не затирался предыдущий варнинг
		text = spanMessage.innerHTML + "<br><br>" + text;
		spanMessage.innerHTML = text;
	}
	spanMessage.innerHTML = text? text : "Что-то пошло не так...";
	spanMessage.parentElement.hidden = false;
}


window.onload = function() {

	// let signform = window.document.createElement('div');
	// signform.classList.add("page");
	// signform.classList.add("panel");
	// signform.classList.add("findme");

	let signform = new Form("submit!", {} , ["findme"]);
	let panel = new Block("div", {}, ["page", "panel"]);

	signform
		.addField('hello', 'text', 'print Hello')
		.addField('Password', 'password', 'enter pass')
		.addField('Repeat password', 'password', 'confirm password');

	window.document.body.appendChild(panel.element);
	panel.appendChild(signform);


	// Авторизация с помощью cookie
	whoIsIt((error, username) => {
		if (!error && username) {
			isAuth(username);
		}
	});

	//// Получение элементов
	// Главная страница
	const pageMain = document.getElementsByClassName('page panel main')[0];

	// Кнопка для закрытия варнинга
	const closeWarning = document.querySelector('.warning p');

	// Кнопки главного меню
	const buttonsMenu = document.getElementsByClassName('button');
	const buttonBack = {
		button: document.getElementsByClassName('navigation back')[0],
		currentPage: undefined
	};

	// Получение доступа к форме регистрации
	let signInputs = document.getElementsByClassName('sign_up_input');
	const signUpForm = {
		message: signInputs[0],
		username: signInputs[1],
		email: signInputs[2],
		password: signInputs[3],
		confirm: signInputs[4],
		button: signInputs[5],

		clear: function () {
			this.message.parentElement.hidden = true;
			this.message.innerHTML = this.username.value =
				this.password.value = this.confirm.value = this.email.value = "";
		},
		errorMessage: function (text) {
			this.password.value = this.confirm.value = '';
			this.message.parentElement.hidden = false;
			this.message.innerHTML = text;
		}
	};

	// Получение доступа к форме авторизации
	signInputs = document.getElementsByClassName('sign_in_input');
	const signInForm = {
		message: signInputs[0],
		username: signInputs[1],
		password: signInputs[2],
		button: signInputs[3],

		clear: function () {
			this.message.parentElement.hidden = true;
			this.message.innerHTML = this.username.value
				= this.password.value = "";
		},
		errorMessage: function (text) {
			this.password.value = '';
			this.message.parentElement.hidden = false;
			this.message.innerHTML = text;
		}
	};


	// Получение доступа к форме настроек
	signInputs = document.getElementsByClassName('setting_input');
	const settingForm = {
		message: signInputs[0],
		username: signInputs[1],
		email: signInputs[2],
		password: signInputs[3],
		old_password: signInputs[4],
		button: signInputs[5],

		clear: function () {
			this.message.parentElement.hidden = true;
			this.message.innerHTML = this.username.value = this.email.value
				= this.password.value = this.old_password.value ="";
		},
		errorMessage: function (text) {
			this.old_password.value = '';
			this.message.parentElement.hidden = false;
			this.message.innerHTML = text;
		}
	};


	// Настройка переходов по кнопкам меню
	for (let i = 0; i < buttonsMenu.length; ++i) {

		switch (buttonsMenu[i].name) {

			// Настройка кнопки "Выход"
			case 'exit':
				buttonsMenu[i].addEventListener('click', () => {
					exit();
					isAuth(false);
				}, false);
				break;

			// Настройка перехода по кнопке "Назад"
			case 'backward':
				buttonBack.button.addEventListener('click', event => {
					buttonBack.currentPage.hidden = true;
					buttonBack.button.hidden = true;
					pageMain.hidden = false;
					// Очистка форм
					signUpForm.clear();
					signInForm.clear();
					settingForm.clear();
				}, false);
				break;

			case 'settings':
				buttonsMenu[i].addEventListener('click', event => {

					getProfile((error, response) => {
						if (!error && response) {
							settingForm.username.value = response.username;
							settingForm.email.value = response.email;
						}
					});

					let new_page = document.getElementsByClassName(buttonsMenu[i].name)[0];

					buttonBack.currentPage = new_page;
					buttonBack.button.hidden = false;
					new_page.hidden = false;
					pageMain.hidden = true;
				}, false);
				break;


			// Настройка остальных кнопок в главном меню
			default:
				let new_page = document.getElementsByClassName(buttonsMenu[i].name)[0];
				buttonsMenu[i].addEventListener('click', event => {

					if (!new_page) {
						warningMessage("Класса '" + buttonsMenu[i].name + "' не существует!");
						return;
					}
					buttonBack.currentPage = new_page;
					buttonBack.button.hidden = false;
					new_page.hidden = false;
					pageMain.hidden = true;
				}, false);
		}
	}


	// Регистрация пользователя
	signUpForm.button.addEventListener('click', event => {

		// Отменяем отправку POST запроса от браузера
		event.preventDefault();

		// Получаем данные из форм
		const username = signUpForm.username.value;
		const email = signUpForm.email.value;
		const password = signUpForm.password.value;
		const confirm = signUpForm.confirm.value;

		// Валидация
		if (username.length < 4) {
			signUpForm.errorMessage("Длина логина должна быть не меньше 4 символов!");
			return;
		}
		if (username.length > 12) {
			signUpForm.errorMessage("Длина логина не должна превышать 12 символов!");
			return;
		}
		if (password.length < 6) {
			signUpForm.errorMessage("Длина пароля должна быть не меньше 6 символов!");
			return;
		}
		if (password !== confirm) {
			signUpForm.errorMessage("Пароли не совпадают!");
			return;
		}
		if (password === username) {
			signUpForm.errorMessage("Логин и пароль не должны совпадать!");
			return;
		}


		// Отправка POST запроса
		sign_up(username, password, email, function (error, response) {
			if (error) {
				signUpForm.errorMessage(error);
				return;
			}
			if (response) {
				isAuth(username);
				buttonBack.button.click();
				return;
			}
			warningMessage();
		}, true);

	}, false);


	// Авторизация пользователя
	signInForm.button.addEventListener('click', event => {

		// Отменяем отправку POST запроса от браузера
		event.preventDefault();

		// Получаем данные из форм
		const username = signInForm.username.value;
		const password = signInForm.password.value;

		// Валидация
		if (!username.length || !password.length) {
			signInForm.errorMessage("Введите Ваши логин и пароль");
			return;
		}

		sign_in(username, password, (error, response) => {
			if (error) {
				signInForm.errorMessage(error);
				return;
			}
			if (response) {
				isAuth(response.username);
				buttonBack.button.click();
				return;
			}
			warningMessage();
		}, false);

	}, false);


	// Изменение настроек
	settingForm.button.addEventListener('click', event => {

		// Отменяем отправку POST запроса от браузера
		event.preventDefault();

		// Получаем данные из форм
		const username = settingForm.username.value;
		const email = settingForm.email.value;
		const password = settingForm.password.value;
		const old_password = settingForm.old_password.value;

		//Валидация
		if (username.length !== 0 && username.length < 4) {
			settingForm.errorMessage("Длина логина должна быть не меньше 4 символов!");
			return;
		}
		if (username.length > 12) {
			settingForm.errorMessage("Длина логина не должна превышать 12 символов!");
			return;
		}
		if (password.length !== 0 && password.length < 6) {
			settingForm.errorMessage("Длина пароля должна быть не меньше 6 символов!");
			return;
		}
		if (password.length === 0 && username.length === 0 && email.length === 0) {
			settingForm.errorMessage("Введите данные, которые хотите изменить, в соответсвующее поле");
			return;
		}
		if (password === username) {
			settingForm.errorMessage("Логин и пароль не должны совпадать!");
			return;
		}
		if (!old_password.length) {
			settingForm.errorMessage("Введите старый пароль");
			return;
		}

		// Отправка POST запроса
		settings(username, email, password, old_password, function (error, response) {
			if (error) {
				settingForm.errorMessage(error);
				return;
			}
			if (response) {
				isAuth(username);
				buttonBack.button.click();
				return;
			}
			warningMessage();
		}, true);

	}, false);


	// Закрытие варнинга
	closeWarning.addEventListener('click', event => {
		event.target.parentElement.hidden = true;
	}, false)
};

