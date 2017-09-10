"use strict";


window.onload = function() {

    let pageMain = document.getElementsByClassName('page panel main')[0];
    let buttonsMenu = document.getElementsByClassName('button');
    let buttonBack = {
        button: document.getElementsByClassName('navigation back')[0],
        currentPage: undefined
    };

    // Настройка переходов по кнопкам меню
    for (let i = 0; i < buttonsMenu.length; ++i) {
        buttonsMenu[i].addEventListener('click', event => {
            let new_page = document.getElementsByClassName(event.target.name)[0];
            if (!new_page) return;
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
    }, false)
};
