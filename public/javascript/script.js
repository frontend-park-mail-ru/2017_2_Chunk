"use strict";

// Формирование POST запроса на регистрацию/авторизацию
function sign(username, password, callback, isNew) {

    // Регистрация или авторизация?
    const URL = isNew ? 'http://localhost:8080/sign_up' : 'http://localhost:8080/sign_in';
    let xhr = new XMLHttpRequest();

    // Обработчик ответа
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        // alert(xhr.status);
        if (+xhr.status !== 201 && +xhr.status !== 200) {
            // alert(xhr.status);
            callback(xhr.responseText, null);
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
    var email = "trubniskov@mail.ru";
    xhr.send(JSON.stringify({
        username,
        password,
        email
    }));                                    // Отправка запроса с телом запроса

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

    xhr.open('GET', '/whoisit', true);
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    xhr.send();
}

// Формирование GET запроса на удаление кук
function exit() {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/exit', true);
    xhr.withCredentials = true;
    xhr.send();
}

// Вывод варнинга
function warningMessage(text) {
    let spanMessage = document.querySelector('.warning span');
    if (!spanMessage.parentElement.hidden && text !== undefined) {
        // Чтобы не затирался предыдущий варнинг
        text = spanMessage.innerHTML + '<br><br>' + text;
        spanMessage.innerHTML = text;
    }
    spanMessage.innerHTML = text? text : "Что-то пошло не так...";
    spanMessage.parentElement.hidden = false;
}


window.onload = function() {

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
        password: signInputs[2],
        confirm: signInputs[3],
        button: signInputs[4],

        clear: function () {
            this.message.parentElement.hidden = true;
            this.message.innerHTML = this.username.value =
                this.password.value = this.confirm.value = "";
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
    signInputs = undefined;
    ////


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
        const password = signUpForm.password.value;
        const confirm = signUpForm.confirm.value;

        // Валидация
        if (password !== confirm) {
                signUpForm.errorMessage("Пароли не совпадают!");
                return;
            }
        if (password === username) {
                signUpForm.errorMessage("Логин и пароль не должны совпадать!");
                return;
            }
        if (password.length < 1) {
                signUpForm.errorMessage("Длина пароля должна быть не меньше 6 символов!");
                return;
            }
        if (username.length < 1) {
                signUpForm.errorMessage("Длина логина должна быть не меньше 4 символов!");
                return;
            }
        if (username.length > 120) {
                signUpForm.errorMessage("Длина логина должна превышать 12 символов!");
                return;
            }


        // Отправка POST запроса
        sign(username, password, function (error, response) {
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

        sign(username, password, (error, response) => {
            if (error) {
                signInForm.errorMessage(error);
                return;
            }
            if (response) {
                isAuth(username);
                buttonBack.button.click();
                return;
            }
            warningMessage();
        }, false);

    }, false);


    // Закрытие варнинга
    closeWarning.addEventListener('click', event => {
        event.target.parentElement.hidden = true;
    }, false)
};
