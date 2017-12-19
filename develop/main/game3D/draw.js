'use strict';

import OrbitControl from 'three-orbitcontrols';
import * as Three from 'three';
import PlaneCell from './models/plane.js';
import Player from './models/player.js';
import * as tools from './tools/tools.js';
import Point from './models/point.js';
import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';
import GrootFactory from "./models/BabyGroot";
import PlarformFactory from "./models/Platform";

export default class Draw {

	constructor(container) {
		this.bus = eventBus;

		this.scene = new Three.Scene();
		this.camera = new Three.PerspectiveCamera(
			45,
			window.screen.availWidth / window.screen.availHeight,
			0.1,
			1000
		);

		this.camera.position.set(-25, 35, -16);
		this.camera.lookAt(this.scene.position);

		this.point1 = new Point();
		this.point2 = new Point();
		this.vector = new Point();
		this.lightPoint = new Point();

		this.gameVariebles = tools.GAME_VARIABLES;


		// modelLoader
		// 	.load('models/dae/BabyGroot/model.dae')
		// 	.then( model => {
		// 		model.scale.set(2, 2, 2);
		// 		// let new_model = model.clone();
		// 		model.position.x = 20;
		// 		// this.scene.add(new_model);
		// 		// new_model.position.z = 20;
		// 		this.scene.add(model);
		//
		// 	});
		//
		// modelLoader
		// 	.load('models/obj/Rocket/Rocket.obj')
		// 	.then( model => {
		// 		model.scale.set(15, 15, 15);
		// 		model.position.z = 30;
		// 		return model;
		// 	})
		// 	.then( model => this.scene.add(model) );

		//
		// let baby = new GrootFactory(this.scene);
		// baby.position(15, -50, 15);
		// this.grootFactory = new GrootFactory();
		this.preloadModels();



		this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
		this.renderer.setSize(window.screen.availWidth, window.screen.availHeight);
		container.getElement().appendChild(this.renderer.domElement);
		this.renderer.render(this.scene, this.camera);

		this.loadBackgroundCube();

		this.controls = new OrbitControl(this.camera, this.renderer.domElement);
		this.controls.minPolarAngle = Math.PI / 6;
		this.controls.maxPolarAngle = Math.PI / 2.3;
		this.controls.target.set(20, -5, 20);
		this.controls.enablePan = false;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.2;
		this.controls.autoRotate = false;
		this.controls.enableKeys = false;
		this.controls.rotateSpeed = 0.5;

		container.getElement().addEventListener('click', this.onDocumentMouseMove.bind(this), false);
		container.getElement().addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
		container.getElement().addEventListener('click', this.playerChoice.bind(this), false);

		this.mouse = new Three.Vector2();
		this.raycasterClick = new Three.Raycaster();
		this.raycasterMove = new Three.Raycaster();


		this.bus.on('deleteTree', () => {
			this.scene.remove(this.spotLight);
			this.scene.remove(this.cellContainer);
			this.scene.remove(this.playerContainer);
			this.gameVariebles.stepID = 0;
			cancelAnimationFrame(this.gameVariebles.animation);
		});
	}

	async preloadModels() {

	}

	startGame(response) {
		this.startArray = response.game.field.field;
		this.planeSize = response.game.field.maxX;
		const size = (this.planeSize / 2) * tools.PLANE_X;
		this.controls.target.set(size, -5, size);
		// Двумерный массив клеток поля.
		this.arrayOfPlane = [];
		// Двумерный массив фигур на поле.
		this.arrayOfFigure = [];
		this.addMeshes();
		this.gameVariebles.moveIndicator = false;
		this.gameVariebles.lightIndicator = true;
		this.gameVariebles.cameraRotateIndicator = true;
		this.controls.autoRotateSpeed = 4;
		this.controls.minDistance = 200.0;
		this.controls.maxDistance = 200.0;

		this.bus.emit('beginPlaying');
		// this.bus.emit('changePlayerDiv', 'HELLO');

		this.animate();
	}

	loadBackgroundCube() {
		// В качестве фона используются 6 отдельных кубических проекций
		const path = 'background/space/dark-s_';
		const jpg = '.jpg';
		const urls = [
			path + 'px' + jpg, path + 'nx' + jpg,
			path + 'py' + jpg, path + 'ny' + jpg,
			path + 'pz' + jpg, path + 'nz' + jpg,
		];

		const reflectionCube = new Three.CubeTextureLoader().load(urls);
		reflectionCube.format = Three.RGBFormat;
		this.scene.background = reflectionCube;
	}

	loadBackgroundSpherical() {
		// В качестве фона используется сферическая эквидистантная проекция
		this.geometry = new Three.SphereBufferGeometry(500, 60, 40);
		this.geometry.scale(-1, 1, 1);
		this.material = new Three.MeshBasicMaterial({
			map: new Three.TextureLoader().load('background/4.jpg')
		});
		this.mesh = new Three.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}

	getGameInfo(response) {
		this.figureType = response.figureType;
	}

	gameStep(response) {
		this.gameVariebles.queue.push(response);
	}

	gameEnd(response) {
		this.gameVariebles.queue.push(response);
	}

	gameClose(response) {
		const request = response.win;
		this.bus.emit('endOfGame', request);
		this.scene.remove(this.light);
		this.gameVariebles.lightIndicator = false;
		this.gameVariebles.cameraRotateIndicator = false;
	}

	addMeshes() {
		this.light = new Three.AmbientLight(tools.COLORS.LIGHT, 0.75, 100, Math.PI);
		this.light.position.set(0, 0, 0);
		this.scene.add(this.light);

		this.spotLight = new Three.SpotLight(tools.COLORS.LIGHT, 1, 100, Math.PI);
		this.spotLight.position.set(0, 10, 0);
		this.scene.add(this.spotLight);

		this.playerContainer = new Three.Object3D();
		this.cellContainer = new Three.Object3D();

		// Рисование поля и всех фигурок.
		this.addPlaneByStart();
		this.addAllPlayers();

		this.scene.add(this.cellContainer);
		this.scene.add(this.playerContainer);
	}

	// Создает двумерный массив клеточек поля и расстявляет по нему фигуры в соответствии с массивом.
	addPlaneByStart() {
		for (let i = 0; i < this.planeSize; i++) {
			this.arrayOfPlane[i] = [];
			for (let j = 0; j < this.planeSize; j++) {
				this.arrayOfPlane[i][j] = new PlaneCell(i, j);
				this.arrayOfPlane[i][j].figure = this.startArray[i][j];
				this.cellContainer.add(this.arrayOfPlane[i][j].mesh);
			}
		}
	}

	// Функция добавляет на поле одну фигурку в указанные координаты и вносит изменения в массив клеток поля.
	addOnePlayers(container, i, j, figure) {
		this.arrayOfPlane[i][j].figure = figure;
		this.arrayOfFigure[i][j] = new Player(i, j, figure);
		container.add(this.arrayOfFigure[i][j].mesh);
	}

	// Добавляет на поле все фигуры, заданные в массиве клеток поля.
	addAllPlayers() {
		for (let i = 0; i < this.planeSize; i++) {
			this.arrayOfFigure[i] = [];
			for (let j = 0; j < this.planeSize; j++) {
				if (this.arrayOfPlane[i][j].figure !== 0) {
					this.addOnePlayers(this.playerContainer, i, j, this.arrayOfPlane[i][j].figure);
				}
			}
		}
		
		for (let i = 0; i < 3; ++i) {
			for (let y = 1; y < 4; ++y) {
				console.log("step");
				let groot = GrootFactory.getNew();
				groot.position.x = i * 10;
				groot.position.z = y * 10;
				this.scene.add(groot);
			}
		}

		let platform = PlarformFactory.getNew();
		this.scene.add(platform);
	}

	animate() {
		this.controls.update();

		this.startRotate();
		this.stopAzimuthRotate();

		this.queueStep();

		// То самое движения, для которого нужен включенный индикатор.
		this.moving();
		this.scaling();
		// this.lightFigure();
		// Зацикливание
		this.gameVariebles.animation = requestAnimationFrame(this.animate.bind(this));
		this.render();
	}

	stopAzimuthRotate() {
		if (this.controls.getAzimuthalAngle() < this.gameVariebles.angle + 0.1 &&
			this.controls.getAzimuthalAngle() > this.gameVariebles.angle - 0.1 &&
			this.gameVariebles.angleIndicator) {
			this.controls.autoRotate = false;
			this.gameVariebles.angleIndicator = false;
		}
	}

	startRotate() {
		if (this.gameVariebles.cameraRotateIndicator) {
			if (this.controls.minDistance > 60) {
				this.controls.autoRotate = true;
				this.controls.minDistance -= 2;
				this.controls.maxDistance -= 2;
			} else {
				this.controls.autoRotate = false;
				this.controls.maxDistance = 200;
				this.controls.minDistance = 40;
				this.gameVariebles.cameraRotateIndicator = false;
			}
		}
	}

	// lightFigure() {
	// 	if (this.gameVariebles.lightIndicator) {
	// 		this.raycasterMove.setFromCamera(this.mouse, this.camera);
	// 		const intersects = this.raycasterMove.intersectObjects(
	// 			this.playerContainer.children.concat(this.cellContainer.children)
	// 		);
	// 		if (intersects.length > 0) {
	// 			if (this.IntersectedMove !== intersects[0].object) {
	// 					this.IntersectedMove.material.color.setHex(this.IntersectedMove.currentHex);
	// 				this.IntersectedMove = intersects[0].object;
	// 				if (this.IntersectedMove.material.color.getHex() ===
	// 					tools.COLORS.PLANE_COLOR) {
	// 					this.IntersectedMove.currentHex = tools.COLORS.PLANE_COLOR;
	// 					this.IntersectedMove.material.color.setHex(
	// 						tools.PLAYER_COLORS_MOVE[this.figureType]);
	// 				} else if (this.IntersectedMove.material.color.getHex() ===
	// 					tools.PLAYER_COLORS[this.figureType]) {
	// 					this.IntersectedMove.currentHex = tools.PLAYER_COLORS[this.figureType];
	//
	// 					// for (let i = 0; i < this.planeSize; i++) {
	// 					// 	if (intersects[0].object.position.x > i * tools.PLANE_X) {
	// 					// 		this.lightPoint.x = i;
	// 					// 	}
	// 					// 	if (intersects[0].object.position.z > i * tools.PLANE_Z) {
	// 					// 		this.lightPoint.z = i;
	// 					// 	}
	// 					// }
	// 					this.IntersectedMove.material.color.setHex(
	// 						tools.PLAYER_COLORS_MOVE[this.figureType]);
	// 				} else {
	// 					this.IntersectedMove.currentHex =
	// 						this.IntersectedMove.material.color.getHex();
	// 				}
	// 			}
	// 		} else {
	//
	// 				this.IntersectedMove.material.color.setHex(this.IntersectedMove.currentHex);
	// 			this.IntersectedMove = null;
	// 		}
	// 	}
	// }

	queueStep() {
		if (typeof this.gameVariebles.queue !== 'undefined' &&
			this.gameVariebles.queue !== null &&
			this.gameVariebles.queue.length > 0 &&
			!this.gameVariebles.stepIndicator &&
			!Object.isFrozen(this.point1)
		) {
			this.stepObject = this.gameVariebles.queue.shift();
			this.bus.emit('changePlayerDiv', this.stepObject.playerString);
			if (this.stepObject.func === 'winnerOrLooser') {
				this.gameClose(this.stepObject);
			} else {
				this.gameVariebles.stepIndicator = true;
				this.point1 = this.stepObject.step.src;
				this.point2 = this.stepObject.step.dst;
				this.fullStep(this.stepObject);
			}
		}
	}

	playerChoice() {
		// Выбор объектов
		this.raycasterClick.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycasterClick.intersectObjects(
			this.playerContainer.children.concat(this.cellContainer.children)
		);
		if (intersects.length > 0) {
			if (this.IntersectedClick !== intersects[0].object) {
				if (this.IntersectedClick) {
					if (this.IntersectedClick.material.color.getHex() ===
						tools.PLAYER_COLORS_CLICK[this.figureType]) {
						this.IntersectedClick.material.color.setHex(
							tools.PLAYER_COLORS[this.figureType]);
					}
				}
				this.IntersectedClick = intersects[0].object;

				// Если нажали на фигурку, у которой наш цвет
				if (intersects[0].object.geometry.type === 'CylinderGeometry' &&
					(intersects[0].object.material.color.getHex() ===
						tools.PLAYER_COLORS_MOVE[this.figureType] ||
						intersects[0].object.material.color.getHex() ===
						tools.PLAYER_COLORS[this.figureType])
					&&
					// Проверяем, можно ли изменять первую точку.
					// Пока идет движение, я замораживаю первую точу хода, чтобы она в этом месте не менялась, и чтобы ее можно было использовать в функции move.
					!Object.isFrozen(this.point1)) {
					this.deleteAllStepEnable();
					// Тут определяются номера по х и z фигуры, на которую нажали.
					for (let i = 0; i < this.planeSize; i++) {
						if (intersects[0].object.position.x > i * tools.PLANE_X) {
							this.point1.x = i;
						}
						if (intersects[0].object.position.z > i * tools.PLANE_Z) {
							this.point1.z = i;
						}
					}

					this.getAzimuthAngle();
					// Передаем координаты фигуры в эту функцию, чтобы определить возможные для хода клетки.
					this.getStepEnable();

					this.IntersectedClick.material.color.setHex(
						tools.PLAYER_COLORS_CLICK[this.figureType]);
					this.gameVariebles.lightIndicator = false;
				}

				let idx = 0;
				let idz = 0;
				// Если нажата клетка
				if (intersects[0].object.geometry.type === 'PlaneGeometry') {
					// Также, не очень изящно, определяем ее целые координаты.
					for (let i = 0; i < this.planeSize; i++) {
						if (intersects[0].object.position.x > i * tools.PLANE_X) { idx = i; }
						if (intersects[0].object.position.z > i * tools.PLANE_Z) { idz = i; }
					}

					if (this.arrayOfFigure[idx][idz] !== undefined &&
						this.arrayOfFigure[idx][idz].color === this.figureType + 1) {
						this.IntersectedClick = this.arrayOfFigure[idx][idz].mesh;

						this.point1.x = idx;
						this.point1.z = idz;

						this.getStepEnable();
					}
					// Проверяем, что она доступна для хода
					if (this.arrayOfPlane[idx][idz].stepEnable) {
						// Если да, то вторая точка
						this.point2.x = idx;
						this.point2.z = idz;

						const request = {
							code: '201',
							step: {
								src: this.point1,
								dst: this.point2
							},
							stepID: this.gameVariebles.stepID
						};
						this.bus.emit(`${gameCodes.gameStep.request}`, request);
						this.gameVariebles.stepID++;
					} else {
						this.deleteAllStepEnable();
					}

				}
			}
		} else {
			if (this.IntersectedClick) {
				if (this.IntersectedClick.material.color.getHex() ===
					tools.PLAYER_COLORS_CLICK[this.figureType]) {
					this.IntersectedClick.material.color.setHex(
						tools.PLAYER_COLORS[this.figureType]);
				}
			}
			this.IntersectedClick = null;
			this.gameVariebles.lightIndicator = true;
		}
	}

	getAzimuthAngle() {
		const request = {
			code: 'rotateAngle',
			x: this.point1.x,
			z: this.point1.z,
			currentAngle: this.controls.getAzimuthalAngle()
		};
		this.bus.emit('rotate', request);
	}

	azimuthAngle(response) {
		this.controls.autoRotateSpeed = response.speed;
		this.gameVariebles.angle = response.angle;
		this.controls.autoRotate = true;
		this.gameVariebles.angleIndicator = true;
	}

	getStepEnable() {
		const arrayOfFigureForPost = [];
		for (let i = 0; i < this.planeSize; i++) {
			arrayOfFigureForPost[i] = [];
			for (let j = 0; j < this.planeSize; j++) {
				arrayOfFigureForPost[i][j] = this.arrayOfPlane[i][j].figure;
			}
		}
		const request = {
			code: 'stepEnable',
			array: arrayOfFigureForPost,
			x: this.point1.x,
			z: this.point1.z
		};

		this.bus.emit('makeStepEnable', request);
	}

	scaling() {
		if (this.gameVariebles.scaleIndicator) {
			if (this.gameVariebles.grow < 1) {
				this.arrayOfFigure[this.point2.x][this.point2.z].mesh.scale.set(
					1, this.gameVariebles.grow, 1);
				this.gameVariebles.grow += 0.04;
			} else {
				this.gameVariebles.grow = 0.01;
				this.gameVariebles.scaleIndicator = false;
				delete this.point1;
				this.point1 = new Point();
				this.gameVariebles.lightIndicator = true;
			}
		}
	}

	// Функция движения.
	moving() {
		// Если индикатор вкдючен
		if (this.gameVariebles.moveIndicator) {
			// Замораживаю point1, чтобы она на протяжении всего движения не менялась.
			Object.freeze(this.point1);

			if (!this.gameVariebles.end) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));
				this.gameVariebles.diff += this.gameVariebles.distance * tools.SPEED;
				if (this.gameVariebles.diff <= this.gameVariebles.distance * 2) {
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.8;
				} else if (
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y >
					this.arrayOfFigure[this.point1.x][this.point1.z].y) {
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y -= 0.8;
				}
				if (this.gameVariebles.diff >= this.gameVariebles.distance * 4) {
					this.gameVariebles.end = true;
					this.gameVariebles.diff = 0;
				}
			} else {
				// Выключаем индикатор, тоесть останавливаем движение.
				this.gameVariebles.moveIndicator = false;
				this.gameVariebles.end = false;
				// В следующих двух строчках приравниваем длинные кривые координаты фигуры к ровным координатам клеток,
				// чтобы со временем не получилось большой погрешности.
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x =
					this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x;
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y =
					this.arrayOfFigure[this.point1.x][this.point1.z].y;
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z =
					this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z;
				// Заменяем фигуры в массиве фигур и в массиве клеток.
				this.replaceFigure(this.point1, this.point2);
				// Удаляем замороженную точку и создаем ее снова
				delete this.point1;
				this.point1 = new Point();
				// Ну и в конце движения делаем обработку хода.
				this.step(this.stepObject.figureForPaint);
				this.gameVariebles.stepIndicator = false;
				this.gameVariebles.lightIndicator = true;
			}
		}
	}

	replaceFigure(point1, point2) {
		this.arrayOfFigure[point2.x][point2.z] = this.arrayOfFigure[point1.x][point1.z];
		this.arrayOfFigure[point1.x][point1.z] = undefined;
		this.arrayOfPlane[point2.x][point2.z].figure = this.arrayOfPlane[point1.x][point1.z].figure;
		this.arrayOfPlane[point1.x][point1.z].figure = 0;
	}

	makeStepEnable(response) {
		this.gameVariebles.arrayOfStepEnablePlane = response.arrayAfterStep;
		response.arrayAfterStep.forEach((coord) => {
			this.arrayOfPlane[coord.x][coord.z].material.color.setHex(
				tools.PLAYER_COLORS_MOVE[this.figureType]);
			this.arrayOfPlane[coord.x][coord.z].stepEnable = true;
		});
	}

	step(figureForPaint) {
		figureForPaint.forEach((figure) => {
			this.arrayOfFigure[figure.x][figure.z].material.color.setHex(
				tools.PLAYER_COLORS[figure.color - 1]);
			this.arrayOfPlane[figure.x][figure.z].figure = figure.color;
		});
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	// Handlers
	onDocumentMouseMove(event) {
		event.preventDefault();
		this.mouse.x = ((event.clientX / window.screen.availWidth) * 2) - 1;
		this.mouse.y = (-(event.clientY / window.screen.availHeight) * 2) + 1;
	}

	fullStep(stepObject) {
		this.vector = stepObject.vector;
		this.gameVariebles.distance = this.calculateDistance(this.point1, this.point2);
		this.moveOrClone(stepObject);
		this.deleteAllStepEnable();
	}

	calculateDistance(point1, point2) {
		return Math.sqrt(
			Math.pow(
				this.arrayOfFigure[point1.x][point1.z].mesh.position.x -
				this.arrayOfPlane[point2.x][point2.z].mesh.position.x, 2) +
			Math.pow(
				this.arrayOfFigure[point1.x][point1.z].mesh.position.z -
				this.arrayOfPlane[point2.x][point2.z].mesh.position.z, 2));
	}

	moveOrClone(stepObject) {
		const point1 = stepObject.step.src;
		const point2 = stepObject.step.dst;
		// Если клетка, куда будет совершен ход, находится вплотную к заданной, то добавляем фигурку рядом.
		if (stepObject.clone) {
			Object.freeze(this.point1);
			this.addOnePlayers(
				this.playerContainer, point2.x, point2.z,
				this.arrayOfPlane[point1.x][point1.z].figure
			);
			this.gameVariebles.scaleIndicator = true;
			// И вызываем функцию обработки хода, то-есть замены фигурок, если они есть рядом.
			this.step(stepObject.figureForPaint);
			this.gameVariebles.stepIndicator = false;
		} else {
			// если клетка находится через одну, то включаем индикатор для движения фигуры.
			this.point1 = point1;
			this.point2 = point2;
			this.gameVariebles.moveIndicator = true;
		}
	}

	deleteAllStepEnable() {
		this.gameVariebles.arrayOfStepEnablePlane.forEach((coord) => {
			this.arrayOfPlane[coord.x][coord.z].stepEnable = false;
			this.arrayOfPlane[coord.x][coord.z].material.color.setHex(tools.COLORS.PLANE_COLOR);
		});
	}
}
