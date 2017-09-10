"use strict";

function auth(username, password, callback) {

    let xhr = new XMLHttpRequest();

    // Обработчик ответа
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (+xhr.status !== 200) { callback(xhr, null); }
        else { callback(null, xhr); }
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

    const pageMain = document.getElementsByClassName('page panel main')[0];
    const buttonsMenu = document.getElementsByClassName('button');
    const buttonBack = {
        button: document.getElementsByClassName('navigation back')[0],
        currentPage: undefined
    };
    const signUpForm = {
        username: document.querySelector('table.sign_up_form input[name=username]'),
        password: document.querySelector('table.sign_up_form input[name=password]'),
        confirm: document.querySelector('table.sign_up_form input[name=confirm]')
    };

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

    const signForm = document.querySelector('input[type=submit][name=sign_up_submit]');
    signForm.addEventListener('click', event => {
        // Отменяем отправку POST запроса от браузера
        event.preventDefault();

        const username = signUpForm.username.value;
        const password = signUpForm.password.value;
        const confirm = signUpForm.confirm.value;

        // Валидация
        let errorMessage = function(text) {
                alert(text);
                signUpForm.password.value = signUpForm.confirm.value = '';
            };
        if (password !== confirm) {
                errorMessage("Пароли не совпадают!");
                return;
            }
        if (password.length < 0) {
                errorMessage("Длина пароля должна быть не меньше 6 символов!");
                return;
            }
        if (username.length < 0) {
                errorMessage("Длина логина должна быть не меньше 6 символов!");
                return;
            }

        // Отправка POST запроса
        auth(username, password, function (error, response) {
            if (!response && error) {
                errorMessage(error.status + ': ' + error.statusText);
                return;
            }
            if (response && !error) {
                errorMessage('Вы успешно зарегистрировались!')
            }
        });

    }, false);
};
