'use strict';

export const BACKGROUND_COLOR = 0xEEEEEE;
export const HOVER_COLOR = 0xFF0000;
export const PLANE_X = 5;
export const PLANE_Z = 5;
export const PLAYER_HEIGHT = 7;

export const COLORS = {
	HOVER: 0xF4DE9E,
	PLANE_COLOR: 0x69869D,
	MOVE: 0xdfcc14
};

export const PLAYER_COLORS = [
	0x7A6014,   //желтый
	0x50147B,   //фиолетовый
	0x1B7B14,   //зеленый
	0x7B1425    //красный
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
	lightIndicator: false,
	queue: [],
	arrayOfStepEnablePlane: [],
	animation: 0,
};
