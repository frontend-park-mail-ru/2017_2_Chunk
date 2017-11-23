'use strict';

import CommonView from "../view/view";
import Block from "../../blocks/block/block.js";

export default class ThreeView extends CommonView {
    constructor(eventBus, exit) {
        const gameContainer = Block.Create('div');

	    const winDiv = Block.Create('div', {}, ['canvasView__winDiv'], '');
	    // const playersDiv = Block.Create('div', {}, [], '');
	    super([gameContainer, winDiv]);
	    this.el.style.setProperty("border", "none");
	    this.el.classList.add('treeView');

	    this.winDiv = winDiv;
	    // this.playersDiv = playersDiv;

	    this.winDiv.hide();
	    // this.playersDiv.hide();

	    this.eventBus = eventBus;
	    this.eventBus.on('endOfGame', (win) => {
		    if (win) {
			    this.winDiv.setText('You win! =)');
		    } else {
			    this.winDiv.setText('You lose! =(');
		    }
		    this.winDiv.show();
            setTimeout(() => {
                this.winDiv.hide();
                exit();
            }, 3000);
	    });
	    // this.eventBus.on('showPlayers', (players) => {
	    // 	this.playersDiv.setText(players);
	    // 	this.playersDiv.show();
	    // });

        this.hide();
    }


    hide() {
        super.hide();
    }

    getElement() {
        return this.el;
    }
}