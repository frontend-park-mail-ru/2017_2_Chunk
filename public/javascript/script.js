"use strict";

function auth(username, password, callback) {

    let xhr = new XMLHttpRequest();

    // Обработчик ответа
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (+xhr.status !== 200) {
            callback(JSON.parse(xhr.responseText).error, null);
        } else {
            callback(null, xhr);
        }
    };

    // Формирование POST запроса:
    xhr.open('POST', '/sign_up', true);     // заголовок запроса
    xhr.setRequestHeader('Content-Type',
        'application/json; charset=utf8');  // Content-Type для JSON
    xhr.withCredentials = true;             // Чтобы можно было получить куки
    xhr.timeout = 15000;                    // Время ожидания ответа от сервера
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));                                    // Отправка запроса с телом запроса

}

window.onload = function() {

    // Получение элементов
    const pageMain = document.getElementsByClassName('page panel main')[0];

    const buttonsMenu = document.getElementsByClassName('button');
    const buttonBack = {
        button: document.getElementsByClassName('navigation back')[0],
        currentPage: undefined
    };

    // Получение доступа к форме регистрации
    let signUpInputs = document.getElementsByClassName('sign_up_input');
    const signUpForm = {
        message: signUpInputs[0],
        username: signUpInputs[1],
        password: signUpInputs[2],
        confirm: signUpInputs[3],
        button: signUpInputs[4],

        clear: function () {
            this.message.innerHTML = this.username.value =
                this.password.value = this.confirm.value = "";
            this.message.hidden = true;
        }
    };
    signUpInputs = undefined;


    // Настройка переходов по кнопкам меню
    for (let i = 0; i < buttonsMenu.length; ++i) {
        buttonsMenu[i].addEventListener('click', event => {
            let new_page = document.getElementsByClassName(event.target.name)[0];
            if (!new_page) {
                console.error("Can't find class name %s", event.target.name);
                return;
            }
            buttonBack.currentPage = new_page;
            buttonBack.button.hidden = false;
            new_page.hidden = false;
            pageMain.hidden = true;
        }, false);
    }


    // Настройка перехода по кнопке "Назад"
    buttonBack.button.addEventListener('click', event => {
        buttonBack.currentPage.hidden = true;
        buttonBack.button.hidden = true;
        pageMain.hidden = false;
    }, false);


    // Регистрация пользователя
    signUpForm.button.addEventListener('click', event => {

        // Отменяем отправку POST запроса от браузера
        event.preventDefault();

        // Получаем данные из форм
        const username = signUpForm.username.value;
        const password = signUpForm.password.value;
        const confirm = signUpForm.confirm.value;

        // Валидация
        let errorMessage = function(text) {
                signUpForm.message.innerHTML = text;
                signUpForm.message.hidden = false;
                signUpForm.password.value = signUpForm.confirm.value = '';
            };
        if (password !== confirm) {
                errorMessage("Пароли не совпадают!");
                return;
            }
        if (password.length < 6) {
                errorMessage("Длина пароля должна быть не меньше 6 символов!");
                return;
            }
        if (username.length < 6) {
                errorMessage("Длина логина должна быть не меньше 6 символов!");
                return;
            }

        // Отправка POST запроса
        auth(username, password, function (error, response) {
            if (!response && error) {
                errorMessage(error);
                return;
            }
            if (response && !error) {
                signUpForm.clear();
                return;
            }
            alert("Что-то пошло не так...");
        });

    }, false);
};
