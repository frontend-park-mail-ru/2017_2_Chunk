'use strict';
import eventBus from '../../modules/eventBus';


new class GrootView {
	constructor() {
		eventBus.on('youWin', () => {
			this.grootDanceStart();
			setTimeout(() => {
				eventBus.emit('grootStop');
			}, 15000);
		});
	}


	grootDanceStart() {
		var stopDancing = undefined;
		var i = 10000;
		var saveNode = undefined;
		var grootTimer = undefined;
		const nodeList = Array.from(document.getElementsByTagName('link'));
		nodeList.forEach((node) => {
			if (node.rel === 'shortcut icon') {
				saveNode = node;
				setTimeout(() => {
					stopDancing = true;
				}, 15000);
				recursiveTimer();
			}
		});
		eventBus.on('grootStop', () => {
			saveNode.href = `./images/favicon.ico`;
		});

		function recursiveTimer() {
			if (stopDancing) {
				return;
			}
			nextIco();
			setTimeout(() => {
				recursiveTimer()
			}, 200);
		}


		function nextIco() {
			saveNode.href = `./images/dancing-groot/groot-${i % 10}.gif`;
			i--;
		}
		return grootTimer;
	}


};