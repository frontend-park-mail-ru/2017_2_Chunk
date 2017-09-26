(function () {
    'use strict';

    const Http = window.Http;

    /**
     * Сервис для работы с юзерами
     * @module UserService
     */
    class UserService {
        constructor() {
            this.user = null;
            this.users = [];
        }

        /**
         * Регистрирует нового пользователя
         * @param {string} email
         * @param {string} password
         * @param {Function} callback
         */
        signup(username, password, callback) {
            // console.log(this.user.email);
            Http.Post('/sign_up', {username, password}, callback);
        }


        /**
         * Авторизация пользователя
         * @param {string} email
         * @param {string} password
         * @param {Function} callback
         */
        login(email, password, callback) {
            Http.Post('/sign_in', {email, password}, callback);
        }

        /**
         * Проверяет, авторизован ли пользователь
         * @return {boolean}
         */
        isLoggedIn() {
            // this.getData();
            return !!this.user;//как эта хрень работает?
        }

        /**
         * Загружает данные о текущем пользователе
         * @param {Function} callback
         * @param {boolean} [force=false] - игнорировать ли кэш?
         */
        getData(callback, force = false) {
            if (this.isLoggedIn() && !force) {
                return callback(null, this.user);
            }

            Http.Get('/whoisit', function (err, userdata) {
                if (err) {
                    return callback(err, userdata);
                }
                this.user = userdata.username;
                callback(null, userdata);
            }.bind(this));
        }

        logout() {
            if (this.isLoggedIn()) {
                this.user = null;
                this.users = [];
            }
        }

        /**
         * Загружает список всех пользователей
         * @param callback
         */
        loadUsersList(callback) {
            Http.Get('/users', function (err, users) {
                if (err) {
                    return callback(err, users);
                }

                this.users = users;

                if (this.isLoggedIn()) {
                    this.users = this.users.map(user => {
                        if (user.email === this.user.email) {
                            user.me = true;
                        }
                        return user;
                    });
                }

                callback(null, this.users);
            }.bind(this));
        }
    }

    window.UserService = UserService;

})();