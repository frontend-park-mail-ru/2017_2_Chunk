'use strict';

import Block from '../../../../blocks/block/block';
import eventBus from '../../../../modules/eventBus';

export default class ThemeButtonVideo extends Block{
	constructor(url) {
		const themeButtonVideo = Block.create('video', {
			'type': 'video/mp4',
			'src': `${url}`,
			'preload': 'auto',
		},
			['videoEvents__themeButtonVideo']);
		const themeVideoContainer = Block.create('div', {}, ['videoEvents__themeVideoContainer']);
		themeVideoContainer.append(themeButtonVideo);
		super(themeVideoContainer.el);
		this.themeVideoContainer = themeVideoContainer;
		this.themeButtonVideo = themeButtonVideo;
		this.numberOfClick = 0;
		this.defineIntervals();
		this.setPausePoints();
		this.hide();
	}

	pause() {
		this.themeButtonVideo.el.pause();
		this.hide();
	}

	play() {
		const numberOfInterval = this.numberOfClick % 5;
		// const numberOfInterval = 4;
		if (numberOfInterval < 4) {
			this.themeButtonVideo.el.play();
			this.show();

		}
		this.setInterval();
	}

	setCurrentTime(time) {
		this.themeButtonVideo.el.currentTime = time;
	}


	defineIntervals() {
		this.intervals = {
			0: {
				start: 0.0,
				end: 2.6,
			},
			1: {
				start: 0.0,
				end: 11,
			},
			2: {
				start: 11.0,
				end: 16.5,
			},
			3: {
				start: 21,
				end: 35,
			}
		}
	}


	setInterval() {
		const numberOfInterval = this.numberOfClick % 5;
		// const numberOfInterval = 4;
		if (numberOfInterval < 4) {
			if (numberOfInterval === 0 || numberOfInterval === 3)
				this.setStartTime(this.intervals[numberOfInterval].start);
			this.setPauseTime(this.intervals[numberOfInterval].end);
		}
		if (numberOfInterval === 3 || numberOfInterval === 4)
			eventBus.emit('changeTheme');
		this.numberOfClick++;
	}


	setStartTime(time) {
		this.setCurrentTime(time);
	}

	setPauseTime(time) {
		this.pauseTime = time;
	}

	setPausePoints() {
		this.themeButtonVideo.el.addEventListener('timeupdate', () => {
			this.checkTime();
		})
	}

	checkTime() {
		const current_time = this.themeButtonVideo.el.currentTime.toFixed(2);
		if (current_time >= this.pauseTime)
			this.pause();
	}
}