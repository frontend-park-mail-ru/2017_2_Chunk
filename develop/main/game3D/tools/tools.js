'use strict';

export const BACKGROUND_COLOR = 0xEEEEEE;
export const HOVER_COLOR = 0xFF0000;
export const PLANE_X = 5;
export const PLANE_Z = 5;
export const PLAYER_HEIGHT = 7;

export const COLORS = {
	LIGHT: 0xFFFFFF,
	HOVER: 0xF4DE9E,
	PLANE_COLOR: 0x69869D
};

export const PLAYER_COLORS = [
	0x7A6014,   //желтый
	0x492C70,   //фиолетовый
	0x55A62A,   //зеленый
	0x9A001E    //красный
];

export const SPEED = 0.1;

export const GAME_VARIABLES = {
	distance: 0,
	end: false,
	diff: 0,
	grow: 0.01,
	moveIndicator: false,
	scaleIndicator: false,
	stepIndicator: false,
	queue: [],
	arrayOfStepEnablePlane: [],
	animation: 0,
};
