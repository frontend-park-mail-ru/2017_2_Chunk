(function () {
    'use strict';


    class Message extends Block {
        constructor() {
            const el = document.createElement('div');
            el.classList.add('message');
            super(el);
        }

        reset() {
            this.el.reset();
        }
    }
    window.Message = Message;
})();