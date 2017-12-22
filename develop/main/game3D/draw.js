'use strict';

import OrbitControl from 'three-orbitcontrols';
import * as Three from 'three';
import PlaneCell from './models/plane.js';
import Cylinder from './models/cylinder';
import * as tools from './tools/tools.js';
import Point from './models/point.js';
import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';
import GrootFactoryBlue from './models/BabyGrootBlue';
import GrootFactoryMagenta from './models/BabyGrootMagenta';
import GrootFactoryRed from './models/BabyGrootRed';
import GrootFactoryYellow from './models/BabyGrootYellow';
import PlatformFactory from "./models/Platform";
import PlayerCone from './models/playerCone';

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

		this.camera.position.set(-100, 78, -73);
		this.camera.lookAt(this.scene.position);

		this.point1 = new Point();
		this.point2 = new Point();
		this.vector = new Point();
		this.firstChoiceObject = new Point();

		this.gameVariebles = tools.GAME_VARIABLES;

		this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
		this.renderer.setSize(window.screen.availWidth, window.screen.availHeight);
		container.getElement().appendChild(this.renderer.domElement);
		this.renderer.render(this.scene, this.camera);

		this.loadBackgroundCube();

		this.controls = new OrbitControl(this.camera, this.renderer.domElement);
		this.controls.minPolarAngle = Math.PI / 6;
		this.controls.maxPolarAngle = Math.PI / 2.3;
		this.controls.target.set(20, -5, 20);
		this.controls.enablePan = true;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.2;
		this.controls.autoRotate = false;
		this.controls.enableKeys = false;
		this.controls.rotateSpeed = 0.2;

		container.getElement().addEventListener('click', this.onDocumentMouseMove.bind(this), false);
		container.getElement().addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
		container.getElement().addEventListener('click', this.playerChoice.bind(this), false);

		this.mouse = new Three.Vector2();
		this.raycasterClick = new Three.Raycaster();

		this.bus.on('deleteTree', () => {
			this.scene.remove(this.light);
			this.scene.remove(this.spotLight);
			this.scene.remove(this.cellContainer);
			this.scene.remove(this.playerContainer);
			this.scene.remove(this.cylinderContainer);
			this.scene.remove(this.cubeContainer);
			this.gameVariebles.stepID = 0;
			cancelAnimationFrame(this.gameVariebles.animation);
		});

		this.plane1X = 0;
		this.plane1Z = 0;
		this.plane2X = 0;
		this.plane2Z = 0;
		this.cube1X = 0;
		this.cube1Z = 0;
		this.cube2X = 0;
		this.cube2Z = 0;

		this.getGameInfo();
		this.gameEnd();
		this.gameStep();
		this.makeStepEnable();
		this.azimuthAngle();
	}

	startGame(response) {
		this.startArray = response.game.field.field;
		this.planeSize = response.game.field.maxX;
		const size = (this.planeSize / 2) * tools.PLANE_XX;
		this.controls.target.set(size/1.1, 10, size/1.1);
		this.arrayOfPlane = [];
		this.arrayOfFigure = [];
		this.arrayOfCylinder = [];
		this.arrayOfCubes = [];
		this.addMeshes();
		this.gameVariebles.moveIndicator = false;
		this.gameVariebles.lightIndicator = true;
		this.gameVariebles.cameraRotateIndicator = true;
		this.controls.autoRotateSpeed = 4;
		this.controls.minDistance = 500.0;
		this.controls.maxDistance = 500.0;

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

	getGameInfo() {
		this.bus.on('figureType', (response) => {
			this.figureType = response.figureType;
		});
	}

	gameStep() {
		this.bus.on('coordinatesForStep', (response) => {
			this.gameVariebles.stepID++;
			this.gameVariebles.queue.push(response);
		});
	}

	gameEnd() {
		this.bus.on('winnerOrLooser', (response) => {
			this.gameVariebles.queue.push(response);
		});
	}

	gameClose(response) {
		const request = response.win;
		this.bus.emit('endOfGame', request);
		this.gameVariebles.lightIndicator = false;
		this.gameVariebles.cameraRotateIndicator = false;
	}

	addMeshes() {
		this.light = new Three.AmbientLight(tools.COLORS.LIGHT, 0.9);
		this.light.position.set(0, 0, 0);
		this.scene.add(this.light);

		this.spotLight = new Three.SpotLight(tools.COLORS.LIGHT, 1, 100, Math.PI);
		this.spotLight.position.set(0, 10, 0);
		this.scene.add(this.spotLight);

		this.playerContainer = new Three.Object3D();
		this.cellContainer = new Three.Object3D();
		this.cylinderContainer = new Three.Object3D();
		this.cubeContainer = new Three.Object3D();
		this.coneContainer = new Three.Object3D();

		this.addPlaneByStart();
		this.addAllPlayers();

		this.scene.add(this.cellContainer);
		this.scene.add(this.playerContainer);
		this.scene.add(this.cylinderContainer);
		this.scene.add(this.cubeContainer);
		this.scene.add(this.coneContainer);
	}

	addPlaneByStart() {
		for (let i = 0; i < this.planeSize; i++) {
			this.arrayOfPlane[i] = [];
			this.arrayOfCubes[i] = [];
			for (let j = 0; j < this.planeSize; j++) {
				this.arrayOfPlane[i][j] = new PlaneCell(i, j);
				this.arrayOfPlane[i][j].figure = this.startArray[i][j];
				this.arrayOfCubes[i][j] = PlatformFactory.getNew();
				this.arrayOfCubes[i][j].position.x = i * 22 + 14;
				this.arrayOfCubes[i][j].position.z = j * 22 + 18;
				this.cubeContainer.add(this.arrayOfCubes[i][j]);
				this.cellContainer.add(this.arrayOfPlane[i][j].mesh);
			}
		}
	}

	addOnePlayers(i, j, figure) {
		this.arrayOfPlane[i][j].figure = figure;
		switch (figure) {
			case 1:
				this.arrayOfFigure[i][j] = GrootFactoryBlue.getNew();
				break;
			case 2:
				this.arrayOfFigure[i][j] = GrootFactoryMagenta.getNew();
				break;
			case 3:
				this.arrayOfFigure[i][j] = GrootFactoryRed.getNew();
				break;
			case 4:
				this.arrayOfFigure[i][j] = GrootFactoryYellow.getNew();
				break;
		}
		this.arrayOfFigure[i][j].position.x = i * 22 + 15;
		this.arrayOfFigure[i][j].position.z = j * 22 + 4;
		this.playerContainer.add(this.arrayOfFigure[i][j]);
		this.arrayOfCylinder[i][j] = new Cylinder(i, j);
		this.cylinderContainer.add(this.arrayOfCylinder[i][j].mesh);
	}

	addAllPlayers() {
		for (let i = 0; i < this.planeSize; i++) {
			this.arrayOfFigure[i] = [];
			this.arrayOfCylinder[i] = [];
			for (let j = 0; j < this.planeSize; j++) {
				if (this.arrayOfPlane[i][j].figure !== 0) {
					this.addOnePlayers(i, j, this.arrayOfPlane[i][j].figure);
				}
			}
		}
	}

	animate() {
		this.controls.update();

		this.startRotate();
		this.stopAzimuthRotate();

		this.queueStep();

		this.moving();
		this.scaling();
		this.moveUp();

		this.moveDown();
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
			if (this.controls.minDistance > 200) {
				this.controls.autoRotate = true;
				this.controls.minDistance -= 4;
				this.controls.maxDistance -= 4;
			} else {
				this.controls.autoRotate = false;
				this.controls.maxDistance = 500;
				this.controls.minDistance = 100;
				this.gameVariebles.cameraRotateIndicator = false;
				for (let i = 0; i < this.planeSize; i++) {
					for (let j = 0; j < this.planeSize; j++) {
						if (this.arrayOfPlane[i][j].figure === this.figureType + 1) {
							let cone = new PlayerCone();
							cone.mesh.position.x = i * 22 + 8;
							cone.mesh.position.z = j * 22 + 8;
							this.coneContainer.add(cone.mesh);
						}
					}
				}
			}
		}
	}

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
			this.cylinderContainer.children.concat(this.cellContainer.children)
		);
		console.log("INTERSECTS");
		console.log(intersects);
		if (intersects.length && !this.gameVariebles.moveIndicator && !this.gameVariebles.scaleIndicator) {
			if (this.IntersectedClick !== intersects[0].object) {
				if (this.IntersectedClick) {
					this.gameVariebles.moveDownIndicator = true;
					this.firstChoiceObject = JSON.parse(JSON.stringify(this.point1));
				}

				if (intersects[0].object.geometry.type === 'CylinderGeometry' &&
					!Object.isFrozen(this.point1)) {
					this.deleteAllStepEnable();
					let id1x = 0;
					let id1z = 0;
					for (let i = 0; i < this.planeSize; i++) {
						if (intersects[0].object.position.x > i * tools.PLANE_XX) { id1x = i; }
						if (intersects[0].object.position.z > i * tools.PLANE_XX) { id1z = i; }
					}

					if (this.arrayOfPlane[id1x][id1z].figure === this.figureType + 1) {
						this.IntersectedClick = intersects[0].object;

						this.point1.x = id1x;
						this.point1.z = id1z;

						this.getAzimuthAngle();
						this.getStepEnable();
						this.gameVariebles.moveUpIndicator = true;
					}
				}

				let id2x = 0;
				let id2z = 0;

				if (intersects[0].object.geometry.type === 'PlaneGeometry') {
					for (let i = 0; i < this.planeSize; i++) {
						if (intersects[0].object.position.x > i * tools.PLANE_XX) { id2x = i; }
						if (intersects[0].object.position.z > i * tools.PLANE_XX) { id2z = i; }
					}

					if (this.arrayOfFigure[id2x][id2z] !== undefined &&
						this.arrayOfPlane[id2x][id2z].figure === this.figureType + 1) {
						this.IntersectedClick = this.arrayOfCylinder[id2x][id2z];

						this.point1.x = id2x;
						this.point1.z = id2z;

						this.getAzimuthAngle();
						this.getStepEnable();
						this.gameVariebles.moveUpIndicator = true;
					}
					if (this.arrayOfPlane[id2x][id2z].stepEnable) {
						this.point2.x = id2x;
						this.point2.z = id2z;

						const request = {
							code: '201',
							step: {
								src: this.point1,
								dst: this.point2
							},
							stepID: this.gameVariebles.stepID
						};
						this.bus.emit(`${gameCodes.gameStep.request}`, request);
					} else {
						this.deleteAllStepEnable();
					}

				}
			}
		} else {
			if (this.IntersectedClick && !Object.isFrozen(this.point1)) {
				this.gameVariebles.moveDownIndicator = true;
				this.firstChoiceObject = JSON.parse(JSON.stringify(this.point1));
			}
			this.IntersectedClick = null;
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

	azimuthAngle() {
		this.bus.on('azimuthAngle', (response) => {
			this.controls.autoRotateSpeed = response.speed;
			this.gameVariebles.angle = response.angle;
			this.controls.autoRotate = true;
			this.gameVariebles.angleIndicator = true;
		});
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

	moveUp() {
		if (this.gameVariebles.moveUpIndicator) {
			if (!Object.isFrozen(this.point1) && this.point1.x > -1) {
				this.scene.remove(this.coneContainer);
				if (this.arrayOfFigure[this.point1.x][this.point1.z].position.y < 25) {
					this.arrayOfFigure[this.point1.x][this.point1.z].position.y += tools.SPEED;
					this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.y += tools.SPEED;
					this.arrayOfCubes[this.point1.x][this.point1.z].position.y += tools.SPEED;
					this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.y += tools.SPEED;
				} else {
					this.gameVariebles.moveUpIndicator = false;
				}
			}
		}
	}

	moveDown() {
		if (this.gameVariebles.moveDownIndicator) {
			if (this.firstChoiceObject.x > -1) {
				if (this.arrayOfFigure[this.firstChoiceObject.x][this.firstChoiceObject.z].position.y > 13.5) {
					this.arrayOfFigure[this.firstChoiceObject.x][this.firstChoiceObject.z].position.y -= tools.SPEED_DOWN;
					this.arrayOfCylinder[this.firstChoiceObject.x][this.firstChoiceObject.z].mesh.position.y -= tools.SPEED_DOWN;
					this.arrayOfCubes[this.firstChoiceObject.x][this.firstChoiceObject.z].position.y -= tools.SPEED_DOWN;
					this.arrayOfPlane[this.firstChoiceObject.x][this.firstChoiceObject.z].mesh.position.y -= tools.SPEED_DOWN;
				} else {
					this.gameVariebles.moveDownIndicator = false;
				}
			}
		}
	}

	scaling() {
		if (this.gameVariebles.scaleIndicator) {
			if (this.gameVariebles.grow < 2) {
				this.arrayOfFigure[this.point2.x][this.point2.z].scale.set(
					this.gameVariebles.grow, this.gameVariebles.grow, this.gameVariebles.grow);
				this.gameVariebles.grow += 0.08;
			} else {
				this.gameVariebles.grow = 1;
				this.gameVariebles.scaleIndicator = false;
				delete this.point1;
				this.point1 = new Point();
				this.IntersectedClick = null;
			}
		}
	}

	moving() {
		if (this.gameVariebles.moveIndicator) {
			Object.freeze(this.point1);

			if (!this.gameVariebles.end) {
				this.gameVariebles.diff += this.gameVariebles.distance * tools.SPEED_Y;
				let y = 4 * 50 * (this.gameVariebles.diff/this.gameVariebles.distance -
					Math.pow(this.gameVariebles.diff/this.gameVariebles.distance, 2));

				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfFigure[this.point1.x][this.point1.z].position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfFigure[this.point1.x][this.point1.z].position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfCubes[this.point1.x][this.point1.z].position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfCubes[this.point1.x][this.point1.z].position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfCubes[this.point2.x][this.point2.z].position.x -=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfCubes[this.point2.x][this.point2.z].position.z -=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x -=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z -=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));

				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.y = y + 13.5;
				this.arrayOfFigure[this.point1.x][this.point1.z].position.y = y + 13.5;
				this.arrayOfCubes[this.point1.x][this.point1.z].position.y = y + 10;
				this.arrayOfCubes[this.point2.x][this.point2.z].position.y = -y - 10;
				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.y = y + 13.5;
				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.y = -y;

				if (this.gameVariebles.diff >= this.gameVariebles.distance) {
					this.gameVariebles.end = true;
					this.gameVariebles.diff = 0;
				}
			} else {
				console.log("END");
				this.gameVariebles.moveIndicator = false;
				this.gameVariebles.end = false;

				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.x = this.plane2X;
				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.y = 17.5;
				this.arrayOfCylinder[this.point1.x][this.point1.z].mesh.position.z = this.plane2Z;

				this.arrayOfFigure[this.point1.x][this.point1.z].position.x = this.plane2X + 7;
				this.arrayOfFigure[this.point1.x][this.point1.z].position.y = 13.5;
				this.arrayOfFigure[this.point1.x][this.point1.z].position.z = this.plane2Z - 4;

				this.arrayOfCubes[this.point1.x][this.point1.z].position.x = this.cube2X;
				this.arrayOfCubes[this.point1.x][this.point1.z].position.y = 0;
				this.arrayOfCubes[this.point1.x][this.point1.z].position.z = this.cube2Z;

				this.arrayOfCubes[this.point2.x][this.point2.z].position.x = this.cube1X;
				this.arrayOfCubes[this.point2.x][this.point2.z].position.y = 0;
				this.arrayOfCubes[this.point2.x][this.point2.z].position.z = this.cube1Z;

				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.x = this.plane2X;
				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.y = 13.5;
				this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.z = this.plane2Z;

				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x = this.plane1X;
				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.y = 13.5;
				this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z = this.plane1Z;

				this.replaceFigure();
				delete this.point1;
				this.point1 = new Point();
				this.step(this.stepObject.figureForPaint);
				this.gameVariebles.stepIndicator = false;
				this.IntersectedClick = null;
			}
		}
	}

	replaceFigure() {
		let cube1 = this.arrayOfCubes[this.point1.x][this.point1.z];
		let cube2 = this.arrayOfCubes[this.point2.x][this.point2.z];

		this.arrayOfCubes[this.point1.x][this.point1.z] = undefined;
		this.arrayOfCubes[this.point2.x][this.point2.z] = undefined;

		this.arrayOfCubes[this.point1.x][this.point1.z] = cube2;
		this.arrayOfCubes[this.point2.x][this.point2.z] = cube1;

		let plane1 = this.arrayOfPlane[this.point1.x][this.point1.z];
		let plane2 = this.arrayOfPlane[this.point2.x][this.point2.z];

		this.arrayOfPlane[this.point1.x][this.point1.z] = undefined;
		this.arrayOfPlane[this.point2.x][this.point2.z] = undefined;

		this.arrayOfPlane[this.point1.x][this.point1.z] = plane2;
		this.arrayOfPlane[this.point2.x][this.point2.z] = plane1;

		this.arrayOfFigure[this.point2.x][this.point2.z] = this.arrayOfFigure[this.point1.x][this.point1.z];
		this.arrayOfFigure[this.point1.x][this.point1.z] = undefined;

		let cylinder1 = this.arrayOfCylinder[this.point1.x][this.point1.z];
		let cylinder2 = this.arrayOfCylinder[this.point2.x][this.point2.z];

		this.cylinderContainer.remove(this.arrayOfCylinder[this.point1.x][this.point1.z]);
		this.cylinderContainer.remove(this.arrayOfCylinder[this.point2.x][this.point2.z]);

		this.arrayOfCylinder[this.point1.x][this.point1.z] = undefined;
		this.arrayOfCylinder[this.point2.x][this.point2.z] = undefined;

		this.arrayOfCylinder[this.point1.x][this.point1.z] = cylinder2;
		this.arrayOfCylinder[this.point2.x][this.point2.z] = cylinder1;
	}

	makeStepEnable() {
		this.bus.on('stepEnable', (response) => {
			this.gameVariebles.arrayOfStepEnablePlane = response.arrayAfterStep;
			response.arrayAfterStep.forEach((coord) => {
				this.arrayOfPlane[coord.x][coord.z].material.opacity = 0.8;
				this.arrayOfPlane[coord.x][coord.z].material.color.setHex(tools.PLAYER_COLORS_CLICK[this.figureType]);
				this.arrayOfPlane[coord.x][coord.z].stepEnable = true;
			});
		});
	}

	step(figureForPaint) {
		figureForPaint.forEach((figure) => {
			this.playerContainer.remove(this.arrayOfFigure[figure.x][figure.z]);
			this.arrayOfFigure[figure.x][figure.z] = undefined;
			switch (figure.color) {
				case 1:
					this.arrayOfFigure[figure.x][figure.z] = GrootFactoryBlue.getNew();
					break;
				case 2:
					this.arrayOfFigure[figure.x][figure.z] = GrootFactoryMagenta.getNew();
					break;
				case 3:
					this.arrayOfFigure[figure.x][figure.z] = GrootFactoryRed.getNew();
					break;
				case 4:
					this.arrayOfFigure[figure.x][figure.z] = GrootFactoryYellow.getNew();
					break;
			}
			this.arrayOfFigure[figure.x][figure.z].position.x = figure.x * 22 + 15;
			this.arrayOfFigure[figure.x][figure.z].position.z = figure.z * 22 + 4;
			this.playerContainer.add(this.arrayOfFigure[figure.x][figure.z]);
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
		console.log(this.gameVariebles.distance);
		this.moveOrClone(stepObject);
		this.deleteAllStepEnable();
	}

	calculateDistance(point1, point2) {
		return Math.sqrt(
			Math.pow(
				this.arrayOfCylinder[point1.x][point1.z].mesh.position.x -
				this.arrayOfPlane[point2.x][point2.z].mesh.position.x, 2) +
			Math.pow(
				this.arrayOfCylinder[point1.x][point1.z].mesh.position.z -
				this.arrayOfPlane[point2.x][point2.z].mesh.position.z, 2));
	}

	moveOrClone(stepObject) {
		const point1 = stepObject.step.src;
		const point2 = stepObject.step.dst;
		if (stepObject.clone) {
			Object.freeze(this.point1);
			this.addOnePlayers(
				point2.x, point2.z,
				this.arrayOfPlane[point1.x][point1.z].figure
			);
			this.gameVariebles.scaleIndicator = true;
			this.step(stepObject.figureForPaint);
			this.gameVariebles.stepIndicator = false;
		} else {
			this.point1 = point1;
			this.point2 = point2;

			this.plane1X = JSON.parse(JSON.stringify(this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.x));
			this.plane1Z = JSON.parse(JSON.stringify(this.arrayOfPlane[this.point1.x][this.point1.z].mesh.position.z));

			this.cube1X = JSON.parse(JSON.stringify(this.arrayOfCubes[this.point1.x][this.point1.z].position.x));
			this.cube1Z = JSON.parse(JSON.stringify(this.arrayOfCubes[this.point1.x][this.point1.z].position.z));

			this.plane2X = JSON.parse(JSON.stringify(this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x));
			this.plane2Z = JSON.parse(JSON.stringify(this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z));

			this.cube2X = JSON.parse(JSON.stringify(this.arrayOfCubes[this.point2.x][this.point2.z].position.x));
			this.cube2Z = JSON.parse(JSON.stringify(this.arrayOfCubes[this.point2.x][this.point2.z].position.z));

			this.gameVariebles.moveIndicator = true;
		}
	}

	deleteAllStepEnable() {
		this.gameVariebles.arrayOfStepEnablePlane.forEach((coord) => {
			this.arrayOfPlane[coord.x][coord.z].stepEnable = false;
			this.arrayOfPlane[coord.x][coord.z].material.color.setHex(tools.COLORS.PLANE_COLOR);
			this.arrayOfPlane[coord.x][coord.z].material.opacity = 0;
		});
	}
}
