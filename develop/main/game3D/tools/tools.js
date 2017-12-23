'use strict';

export const BACKGROUND_COLOR = 0xEEEEEE;
export const HOVER_COLOR = 0xFF0000;
export const PLANE_X = 5;
export const PLANE_XX = 22;
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

export const PLAYER_COLORS_CLICK = [
	0xd3a622,   //светло-желтый
	0x8922d3,   //светло-фиолетовый
	0x2ed322,   //светло-зеленый
	0xd32240    //светло-красный
];

export const PLAYER_COLORS_MOVE = [
	0xe8cb73,   //светло-светло-желтый
	0xb773e8,   //светло-светло-фиолетовый
	0x7ae873,   //светло-светло-зеленый
	0xe87386    //светло-светло-красный
];

export const SPEED = 0.6;
export const SPEED_Y = 0.03;
export const SPEED_DOWN = 1.5;

export const GAME_VARIABLES = {
	distance: 0,
	end: false,
	diff: 0,
	grow: 1,
	moveIndicator: false,
	scaleIndicator: false,
	stepIndicator: false,
	lightIndicator: false,
	queue: [],
	arrayOfStepEnablePlane: [],
	animation: 0,
	angle: 0,
	angleIndicator: false,
	cameraRotateIndicator: false,
	stepID: 0,
	moveUpIndicator: false,
	moveDownIndicator: false,
	changeFigureIndicator: false,
	firstStep: true
};
