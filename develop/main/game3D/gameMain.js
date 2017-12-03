'use strict';

import OrbitControl from 'three-orbitcontrols';
import * as Three from 'three';
import PlaneCell from './models/plane.js';
import Player from './models/player.js';
import * as tools from './tools/tools.js';
import Point from './models/point.js';
import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';

export default class Game3D {

	constructor(container) {
		this.bus = eventBus;

		this.scene = new Three.Scene();

		this.camera = new Three.PerspectiveCamera(
			45,
			window.screen.availWidth / window.screen.availHeight,
			0.1,
			1000
		);
		// this.camera = new Three.OrthographicCamera(
		// 	-100, 100, 100, 100
		// );

		this.camera.position.set(-28, 55, -28);
		this.camera.lookAt(this.scene.position);

		// Две точки, начало и конец хода.
		this.point1 = new Point();
		this.point2 = new Point();
		this.vector = new Point();
		this.distance = 0;
		this.end = false;
		this.diff = 0;
		this.grow = 0.01;
		// Индикатор движения для движения, разрешает движение только после хода.
		this.moveIndicator = false;
		this.scaleIndicator = false;
		this.raycasterIndicator = false;
		this.stepIndicator = false;
		this.queue = [];
		this.animation = 0;

		this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
		this.renderer.setSize(window.screen.availWidth, window.screen.availHeight);
		container.getElement().appendChild(this.renderer.domElement);

		this.renderer.render(this.scene, this.camera);

		this.controls = new OrbitControl(this.camera, this.renderer.domElement);
		this.controls.maxPolarAngle = Math.PI * 0.495;
		this.controls.target.set(20, 5, 20);
		this.controls.enablePan = true;
		this.controls.minDistance = 40.0;
		this.controls.maxDistance = 200.0;
		this.controls.enableDamping = true;
		this.dampingFactor = 0.01;

		this.controls.autoRotate = false;
		this.controls.enableKeys = false;

		container.getElement().addEventListener('click', this.onDocumentMouseMove.bind(this), false);
		container.getElement().addEventListener('click', this.raycasterTrue.bind(this), false);

		this.mouse = new Three.Vector2();
		this.raycaster = new Three.Raycaster();

		this.gameEvents();

		// this.bus.on(`${this.source}Code203`, (data) => {	// Player is blocked
		// 	// console.log(data);
		// });
		// this.bus.on(`${this.source}Code209`, (data) => {	// Player is offline
		// 	// console.log(data);
		// });
		// this.bus.on(`${this.source}Code306`, (data) => {	// Invalid game step
		// 	// console.log(data);
		// });
		// this.bus.on(`${this.source}Code307`, (data) => {	// It is not your turn
		// 	// console.log(data);
		// });

		this.bus.on('deleteTree', () => {
			this.scene.remove(this.spotLight);
			this.scene.remove(this.cellContainer);
			this.scene.remove(this.playerContainer);
			cancelAnimationFrame(this.animation);
		});
	}

	gameEvents() {
		this.startGame();
		this.gameStep();
		this.gameEnd();
		this.exitGame();
	}

	getGameInfo() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.getGameInfo.code}`, (response) => {
			this.userID = response.userID;
			this.figureType = this.detectFigureByUserID(this.userID);
		});
	}

	startGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.startGame.code}`, (response) => {
			this.startArray = response.game.field.field;
			this.planeSize = response.game.field.maxX;
			this.gameID = response.game.gameID;
			// Двумерный массив клеток поля.
			this.arrayOfPlane = this.makeBinArray(this.planeSize);
			this.gamers = response.game.gamers;
			// Двумерный массив фигур на поле.
			this.arrayOfFigure = this.makeBinArray(this.planeSize);
			this.countPlayers = this.gamers.length;
			this.addMeshes();

			const request = {//все запросы поменяй на request все ответы на response
				code: gameCodes.getGameInfo.code
			};
			this.getGameInfo();
			this.bus.emit(`${gameCodes.getGameInfo.request}`, request);

			this.animate();
		});
	}

	gameStep() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameStep.code}`, (response) => {
			this.queue.push(response.step.src);
			this.queue.push(response.step.dst);
		});
	}

	gameEnd() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameEnd.code}`, (response) => {
			let win = false;
			// this.startArray = response.field.field;
			// this.addPlaneByStart();
			this.result = this.findMaxFiguresCount(this.countFigure());
			if (this.result === this.figureType) { win = true; }
			this.bus.emit('endOfGame', win);
			this.scene.remove(this.light);
		});
	}

	exitGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.exitFromPreparingGame.code}`, (response) => {
			const request = {
				gameID: this.gameID
			};
			this.bus.emit(`${gameCodes.gameDelete.request}`, request);
		});
	}

	raycasterTrue() {
		this.raycasterIndicator = true;
	}

	makeBinArray(size) {
		const array = [];
		for (let i = 0; i < size; i++)
			array[i] = [];
		return array;
	}

	// makeBinArray(size) {
	// 	const array = [];
	// 	return array;
	// }

	detectFigureByUserID(userID) {
		for (let i = 0; i < this.gamers.length; i++) {
			if (this.gamers[i].userID === userID) {
				return i;
			}
		}
	}

	// Создает двумерный массив клеточек поля и расстявляет по нему фигуры в соответствии с массивом.
	addPlaneByStart() {
		for (let i = 0; i < this.planeSize; i++) {
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
			for (let j = 0; j < this.planeSize; j++) {
				if (this.arrayOfPlane[i][j].figure !== 0) {
					this.addOnePlayers(this.playerContainer, i, j, this.arrayOfPlane[i][j].figure);
				}
			}
		}
	}

	addMeshes() {
		this.light = new Three.AmbientLight(tools.COLORS.WHITE, 0.75, 100, Math.PI);
		this.light.position.set(0, 0, 0);
		this.scene.add(this.light);

		this.spotLight = new Three.SpotLight(tools.COLORS.WHITE, 1, 100, Math.PI);
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

	animate() {
		this.controls.update();
		if (this.camera.position.y < 5) {
			this.camera.position.y = 5;
		}

		this.queueStep();
		this.playerChoice();

		// То самое движения, для которого нужен включенный индикатор.
		this.moving();
		this.scaling();
		//this.renderer.setSize(window.screen.availWidth, window.screen.availHeight); убираем заменяем сет сайз на что то другое.
		// Зацикливание
		this.animation = requestAnimationFrame(this.animate.bind(this));
		this.render();
	}

	queueStep() { // this.queue
		if (typeof this.queue !== 'undefined' && this.queue !== null && this.queue.length > 0 && !this.stepIndicator && !Object.isFrozen(this.point1)) {
			this.stepIndicator = true;
			this.point1 = this.queue.shift();
			this.point2 = this.queue.shift();
			this.fullStep(this.point1, this.point2);
		}
	}

	playerChoice() {
		// Выбор объектов
		if (this.raycasterIndicator) {
			this.raycaster.setFromCamera(this.mouse, this.camera);
			const intersects = this.raycaster.intersectObjects(
				this.playerContainer.children.concat(this.cellContainer.children));
			if (intersects.length > 0) {
				if (this.INTERSECTED !== intersects[0].object) {
					if (this.INTERSECTED) {
						this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
					}
					this.INTERSECTED = intersects[0].object;
					this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();

					// Если нажали на фигурку, у которой наш цвет, то-есть первого игрока
					if (intersects[0].object.geometry.type === 'CylinderGeometry' &&
						intersects[0].object.material.color.getHex()
						=== tools.PLAYER_COLORS[this.figureType] &&
						// Проверяем, можно ли изменять первую точку.
						// Пока идет движение, я замораживаю первую точу хода, чтобы она в этом месте не менялась, и чтобы ее можно было использовать в функции move.
						!Object.isFrozen(this.point1)) {
						// Тут определяются номера по х и z фигуры, на которую нажали.
						this.deleteAllStepEnable();
						for (let i = 0; i < this.planeSize; i++) {
							if (intersects[0].object.position.x > i * tools.PLANE_X) {
								this.point1.x = i;
							}
							if (intersects[0].object.position.z > i * tools.PLANE_Z) {
								this.point1.z = i;
							}
						}
						// Передаем координаты фигуры в эту функцию, чтобы определить возможные для хода клетки.
						this.makeStepEnable(this.point1.x, this.point1.z);
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
								}
							};
							this.bus.emit(`${gameCodes.gameStep.request}`, request);
						} else this.deleteAllStepEnable();

					}
					this.INTERSECTED.material.emissive.setHex(tools.HOVER_COLOR);
				}
			} else {
				if (this.INTERSECTED) {
					this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
				}
				this.INTERSECTED = null;
			}
			this.raycasterIndicator = false;
		}
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

	// Функция решает, создать фигурку рядом или сделать движение.
	// На вход передаются две точки.
	moveOrClone(point1, point2) {
		// Если клетка, куда будет совершен ход, находится вплотную к заданной, то добавляем фигурку рядом.
		if (Math.abs(point2.x - point1.x) <= 1 && Math.abs(point2.z - point1.z) <= 1) {
			Object.freeze(this.point1);
			this.addOnePlayers(
				this.playerContainer, point2.x, point2.z,
				this.arrayOfPlane[point1.x][point1.z].figure
			);
			this.scaleIndicator = true;
			// И вызываем функцию обработки хода, то-есть замены фигурок, если они есть рядом.
			this.step(point2.x, point2.z);
			this.stepIndicator = false;
		} else {
			// если клетка находится через одну, то включаем индикатор для движения фигуры.
			this.point1 = point1;
			this.point2 = point2;
			this.moveIndicator = true;
		}
	}

	scaling() {
		if (this.scaleIndicator) {
			if (this.grow < 1) {
				this.arrayOfFigure[this.point2.x][this.point2.z].mesh.scale.set(1, this.grow, 1);
				this.grow += 0.04;
			} else {
				this.grow = 0.01;
				this.scaleIndicator = false;
				delete this.point1;
				this.point1 = new Point();
			}
		}
	}

	// Функция движения.
	moving() {
		// Если индикатор вкдючен
		if (this.moveIndicator) {
			// Замораживаю point1, чтобы она на протяжении всего движения не менялась.
			Object.freeze(this.point1);

			if (!this.end) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x +=
					tools.SPEED * (this.vector.x + ((0.5 * this.vector.x) / 2));
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z +=
					tools.SPEED * (this.vector.z + ((0.5 * this.vector.z) / 2));
				this.diff += this.distance * tools.SPEED;
				if (this.diff <= this.distance * 2) {
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.8;
				} else if (
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y >
					this.arrayOfFigure[this.point1.x][this.point1.z].y) {
					this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y -= 0.8;
				}
				if (this.diff >= this.distance * 4) {
					this.end = true;
					this.diff = 0;
				}
			} else {
				// Выключаем индикатор, тоесть останавливаем движение.
				this.moveIndicator = false;
				this.end = false;
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
				this.step(this.point2.x, this.point2.z);
				this.stepIndicator = false;
			}
		}
	}

	replaceFigure(point1, point2) {
		this.arrayOfFigure[point2.x][point2.z] = this.arrayOfFigure[point1.x][point1.z];
		this.arrayOfFigure[point1.x][point1.z] = undefined;
		this.arrayOfPlane[point2.x][point2.z].figure = this.arrayOfPlane[point1.x][point1.z].figure;
		this.arrayOfPlane[point1.x][point1.z].figure = 0;
	}

	// Добавляет клеткам возможность на них походить.
	// Считает разницу в координатах каждой клетки и клетки, на которой стоит фигура.
	// В аргументах функции как раз координаты клетки, где стоит фигура.
	// И если эта разница меньше 3, и на этой клетке не стоит фигура, то на нее можно сходить.
	makeStepEnable(ii, jj) {
		for (let i = 0; i < this.planeSize; i++) {
			for (let j = 0; j < this.planeSize; j++) {
				const idx2 = this.arrayOfPlane[i][j].x;
				const idz2 = this.arrayOfPlane[i][j].z;
				if (!(Math.abs(idx2 - this.point1.x) >= 3 ||
					Math.abs(idz2 - this.point1.z) >= 3 ||
					this.arrayOfPlane[i][j].figure !== 0
				)) {
					this.arrayOfPlane[i][j].stepEnable = true;
					this.arrayOfPlane[i][j].material.color.setHex(tools.COLORS.BACKGROUND);
				}
			}
		}
		// Убирает возможность походить на клетку, где сама фигура и стоит.
		this.arrayOfPlane[ii][jj].stepEnable = false;
	}

	// Функция обработки хода, тоесть замены одних фигурок другими.
	// На вход подаются координаты клетки, на которую был совершен ход.
	step(idx, idz) {
		for (let i = 0; i < this.planeSize; i++) {
			for (let j = 0; j < this.planeSize; j++) {
				// Первые два условия проверяют, что перебираемая в цикле клетка находится вплотную к заданной.
				if (Math.abs(this.arrayOfPlane[i][j].x - this.arrayOfPlane[idx][idz].x) <= 1 &&
					Math.abs(this.arrayOfPlane[i][j].z - this.arrayOfPlane[idx][idz].z) <= 1) {
					// Затем идет проверка, что на этой клетке есть фигура и что она отлична от той, которая совершила ход.
					if (this.arrayOfPlane[i][j].figure !== 0 &&
						this.arrayOfPlane[i][j].figure !== this.arrayOfPlane[idx][idz].figure) {
						// Если там стоит вражеская фигура, то ее цвет меняется на цвет той, которая совершила ход.
						this.arrayOfFigure[i][j].material.color.setHex(
							this.arrayOfFigure[idx][idz].material.color.getHex()
						);
						// И затем в массив клеток вносятся соответствующие изменения по фигурам.
						this.arrayOfPlane[i][j].figure = this.arrayOfPlane[idx][idz].figure;
					}
				}
			}
		}
	}

	// Удаляет у всех клеток возможность на них походить.
	deleteAllStepEnable() {
		for (let i = 0; i < this.planeSize; i++) {
			for (let j = 0; j < this.planeSize; j++) {
				this.arrayOfPlane[i][j].stepEnable = false;
				this.arrayOfPlane[i][j].material.color.setHex(tools.COLORS.PLANE_COLOR);
			}
		}
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

	fullStep(point1, point2) {
		this.vector.x = this.point2.x - this.point1.x;
		this.vector.z = this.point2.z - this.point1.z;
		this.distance = this.calculateDistance(this.point1, this.point2);
		// Название говорит само за себя.
		this.moveOrClone(point1, point2);
		// удаляем все возможные для хода клетки.
		this.deleteAllStepEnable();
	}

	countFigure() {
		const countFigure = [];
		for (let i = 0; i < this.countPlayers; i++) {
			countFigure[i] = 0;
		}
		for (let i = 0; i < this.planeSize; i++) {
			for (let j = 0; j < this.planeSize; j++) {
				if (this.arrayOfPlane[i][j].figure > 0) {
					countFigure[this.arrayOfPlane[i][j].figure - 1]++;
				}
			}
		}
		return countFigure;
	}

	findMaxFiguresCount(array) {
		let max = 0;
		let maxI = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
				maxI = i;
			}
		}
		return maxI;
	}

	playerString() {
		let playerString = '';
		for (let i = 0; i < this.countPlayers; i++) {
			playerString += this.gamers[i].username + ': ' + this.countFigure()[i] + '\n';
		}
		return playerString;
	}
}
