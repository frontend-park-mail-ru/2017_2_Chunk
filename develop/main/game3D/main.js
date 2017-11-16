'use strict';

import * as THREE from 'three';
import PlaneCell from './models/plane.js';
import Player from './models/player.js';
import * as tools from './tools/tools.js';
import OrbitControl from 'three-orbitcontrols';
import Point from "./models/point.js";


//тестовый массив для проверки функции рисования по массиву.
//потом его заменит приходящий массив.
//передавай его в функцию или определи в конструкторе.
let testArray = [
	[1,0,0,0,0,0,0,2],
	[0,0,0,0,0,0,0,0],
	[0,2,0,2,0,0,0,0],
	[0,0,2,0,0,0,0,0],
	[0,0,0,0,1,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[2,0,0,0,0,0,0,1]
];

export default class Game3D {

	constructor(container) {
		this.scene = new THREE.Scene();
		let axes = new THREE.AxisHelper(20);
		this.scene.add(axes);

		this.camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		this.camera.position.set(15, 40, 15);
		this.camera.lookAt(this.scene.position);

		// Двумерный массив клеток поля.
		this.arrayOfPlane = [];
		for (let i = 0; i < tools.PLANE_SIZE; i++){
			this.arrayOfPlane[i] = [];
		}
		// Двумерный массив фигур на поле.
		this.arrayOfFigure = [];
		for (let i = 0; i < tools.PLANE_SIZE; i++){
			this.arrayOfFigure[i] = [];
		}
		// Две точки, начало и конец хода.
		this.point1 = new Point();
		this.point2 = new Point();
		// Индикатор движения для движения, разрешает движение только после хода.
		this.indicator = false;

		this.renderer = new THREE.WebGLRenderer( {antialias: true} );
		this.renderer.setClearColor( tools.COLORS.BACKGROUND, 1.0 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		container.getElement().appendChild( this.renderer.domElement );

		this.addMeshes();

		this.renderer.render(this.scene, this.camera);

		this.controls = new OrbitControl( this.camera, this.renderer.domElement );
		this.controls.maxPolarAngle = Math.PI * 0.495;
		this.controls.target.set(10, 20, 20);
		this.controls.enablePan = true;
		this.controls.minDistance = 40.0;
		this.controls.maxDistance = 200.0;
		this.controls.autoRotate = false;

		document.addEventListener('click', this.onDocumentMouseMove.bind(this), false);

		this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();
		this.animate();
	}

	// Создает двумерный массив клеточек поля.
	// И расстявляет по нему фигуры в соответствии с массивом.
	// В данном случае это testArray.
	addPlaneByArray() {
		for (let i = 0; i < tools.PLANE_SIZE; i++) {
			for (let j = 0; j < tools.PLANE_SIZE; j++) {
				this.arrayOfPlane[i][j] = new PlaneCell(i, j);
				this.arrayOfPlane[i][j].figure = testArray[i][j];
				this.cellContainer.add(this.arrayOfPlane[i][j].mesh);
			}
		}
	}

	// Функция добавляет на поле одну фигурку в указанные координаты.
	// И вносит изменения в массив клеток поля.
	// Можно вызывать в любом месте, нарисует фигурку.
	addOnePlayers(container, i, j, figure) {
		this.arrayOfPlane[i][j].figure = figure;
		this.arrayOfFigure[i][j] = new Player(i, j, figure);
		container.add(this.arrayOfFigure[i][j].mesh);
	}

	// Добавляет на поле все фигуры, заданные в массиве клеток поля.
	addAllPlayers() {
		for (let i = 0; i < tools.PLANE_SIZE; i++) {
			for (let j = 0; j < tools.PLANE_SIZE; j++) {
				if (this.arrayOfPlane[i][j].figure !== 0)
					this.addOnePlayers(this.playerContainer, i, j, this.arrayOfPlane[i][j].figure);
			}
		}
	}

	addMeshes() {
		this.light = new THREE.AmbientLight(tools.COLORS.WHITE, 0.75, 100, Math.PI);
		this.light.position.set(0, 0, 0);
		this.scene.add(this.light);

		this.spotLight = new THREE.SpotLight(tools.COLORS.WHITE, 1, 100, Math.PI);
		this.spotLight.position.set(0, 10, 0);
		this.scene.add(this.spotLight);

		this.playerContainer = new THREE.Object3D();
		this.cellContainer = new THREE.Object3D();

		//Рисование поля и всех фигурок.
		this.addPlaneByArray();
		this.addAllPlayers();

		this.scene.add(this.cellContainer);
		this.scene.add(this.playerContainer);
	}

	animate() {
		this.controls.update();
		if (this.camera.position.y < 5) {
			this.camera.position.y = 5;
		}
		// Выбор объектов
		this.raycaster.setFromCamera(this.mouse, this.camera);
		let intersects = this.raycaster.intersectObjects(this.playerContainer.children.concat(this.cellContainer.children));
		if (intersects.length > 0) {
			if (this.INTERSECTED !== intersects[0].object) {
				if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
				this.INTERSECTED = intersects[0].object;
				this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();

				// Если нажали на фигурку, у которой наш цвет, то-есть первого игрока
				if (intersects[0].object.geometry.type === 'CylinderGeometry' &&
					intersects[0].object.material.color.getHex() === tools.COLORS.PLAYER_1 &&
					//Проверяем, можно ли изменять первую точку.
					//Пока идет движение, я замораживаю первую точу хода, чтобы она в этом месте не менялась,
					// и чтобы ее можно было использовать в функции move.
					//Долго возился на этом, не сразу догнал этот момент. А то move использует точку, тут она меняется, и движение
					// прекращается, и все ломается. Пришлось так поступить. Ну и плюс, современные возможности javascript :)
					!Object.isFrozen(this.point1)) {
					// Лучшего, а самое главное рабочего способа не нашел, кроме как сравнивать координаты нажатого объекта и размеры клеток.
					// Тут определяются номера по х и z фигуры, на которую нажали.
					for (let i = 0; i < tools.PLANE_SIZE; i++) {
						if (intersects[0].object.position.x > i*tools.PLANE_X)
							this.point1.x = i;
						if (intersects[0].object.position.z > i*tools.PLANE_Z)
							this.point1.z = i;
					}
					// Передаем координаты фигуры в эту функцию, чтобы определить возможные для хода клетки.
					this.makeStepEnable(this.point1.x, this.point1.z);
				}

				// Если нажата клетка
				if(intersects[0].object.geometry.type === 'PlaneGeometry') {
					let idx = 0;
					let idz = 0;
					//Также, не очень изящно, определяем ее целые координаты.
					for (let i = 0; i < tools.PLANE_SIZE; i++) {
						if (intersects[0].object.position.x > i*tools.PLANE_X)
							idx = i;
						if (intersects[0].object.position.z > i*tools.PLANE_Z)
							idz = i;
					}
					//Проверяем, что она доступна для хода
					if (this.arrayOfPlane[idx][idz].stepEnable) {
						//Если да, то вторая точка
						this.point2.x = idx;
						this.point2.z = idz;

						//Название говорит само за себя.
						this.moveOrClone(this.point1, this.point2);
						//удаляем все возможные для хода клетки.
						this.deleteAllStepEnable();
					}
				}
				this.INTERSECTED.material.emissive.setHex(tools.HOVER_COLOR);
			}
		}
		else {
			if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
			this.INTERSECTED = null;
		}

		//То самое движения, для которого нужен включенный индикатор.
		this.moving();

		// Зацикливание
		requestAnimationFrame(this.animate.bind(this));
		this.render();
	}

	//Функция решает, создать фигурку рядом или сделать движение.
	//На вход передаются две точки.
	moveOrClone(point1, point2) {
		//Если клетка, куда будет совершен ход, находится вплотную к заданной, то добавляем фигурку рядом.
		if (Math.abs(point2.x - point1.x) <= 1 && Math.abs(point2.z - point1.z) <= 1) {
			this.addOnePlayers(this.playerContainer, point2.x, point2.z, this.arrayOfPlane[point1.x][point1.z].figure);
			//И вызываем функцию обработки хода, то-есть замены фигурок, если они есть рядом.
			this.step(point2.x, point2.z);
		}
		//если клетка находится через одну, то включаем индикатор для движения фигуры.
		else {
			this.indicator = true;
		}
	}

	// Функция движения.
	//Чтобы использовать ее для хода противника, включаешь индикатор, определяешь новые point1 и point2, и все.
	moving() {
		//Если индикатор вкдючен и начальная фигурка существует (во избежание ошибок, лучше оставить это условие).
		if (this.indicator && this.arrayOfFigure[this.point1.x][this.point1.z] !== undefined) {
			//Замораживаю point1, чтобы она на протяжении всего движения не менялась.
			Object.freeze(this.point1);
			//Дальше идут 4 if, которые проверяют, с какой стороны от фигурки находится клетка для хода.
			// Ну и придают ей движения путем изменения ее координаты.
			//0.001 нужно для того, чтобы был небольшой интервал, и движение могло остановиться,
			// когда координата попадет в этот интервал, и пройдет дальше в else.
			//Не очень изящно, куча повторяющегося кода, но это я улучшу.
			//Ну и плюс приращение по у пока нету нормального.
			if (this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z < this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z-0.001) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z += 0.2;
				// this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.2;
			}
			else if (this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x < this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x-0.001) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x += 0.2;
				// this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.2;
			}
			else if (this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z > this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z+0.001) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z -= 0.2;
				// this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.2;
			}
			else if (this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x > this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x+0.001) {
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x -= 0.2;
				// this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.y += 0.2;
			}
			else {
				//Выключаем индикатор, тоесть останавливаем движение.
				this.indicator = false;
				//В следующих двух строчках приравниваем длинные кривые координаты фигуры к ровным координатам клеток,
				//чтобы со временем не получилось большой погрешности.
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.x = this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.x;
				this.arrayOfFigure[this.point1.x][this.point1.z].mesh.position.z = this.arrayOfPlane[this.point2.x][this.point2.z].mesh.position.z;
				//Заменяем фигуры в массиве фигур и в массиве клеток.
				this.arrayOfFigure[this.point2.x][this.point2.z] = this.arrayOfFigure[this.point1.x][this.point1.z];
				this.arrayOfFigure[this.point1.x][this.point1.z] = undefined;
				this.arrayOfPlane[this.point2.x][this.point2.z].figure = this.arrayOfPlane[this.point1.x][this.point1.z].figure;
				this.arrayOfPlane[this.point1.x][this.point1.z].figure = 0;
				//Удаляем замороженную точку и создаем ее снова
				// (не нашел, как еще можно убрать заморозку :)
				delete this.point1;
				this.point1 = new Point();
				//Ну и в конце движения делаем обработку хода.
				this.step(this.point2.x, this.point2.z);
			}
		}
	}

	// Добавляет клеткам возможность на них походить.
	// Считает разницу в координатах каждой клетки и клетки, на которой стоит фигура.
	// В аргументах функции как раз координаты клетки, где стоит фигура.
	// И если эта разница 1 или 2, и на этой клетке не стоит фигура, то на нее можно сходить.
	makeStepEnable(i, j) {
		for (let i = 0; i < tools.PLANE_SIZE; i++) {
			for (let j = 0; j < tools.PLANE_SIZE; j++) {
				let idx2 = this.arrayOfPlane[i][j].x;
				let idz2 = this.arrayOfPlane[i][j].z;
				if (Math.abs(idx2 - this.point1.x) >= 3 ||
					Math.abs(idz2 - this.point1.z) >= 3 ||
					this.arrayOfPlane[i][j].figure !== 0
				) {}
				else {
					this.arrayOfPlane[i][j].stepEnable = true;
				}
			}
		}
		// Убирает возможность походить на клетку, где сама фигура и стоит.
		this.arrayOfPlane[i][j].stepEnable = false;
	}

	// Функция обработки хода, тоесть замены одних фигурок другими.
	// На вход подаются координаты клетки, на которую был совершен ход.
	step(idx, idz) {
		for (let i = 0; i < tools.PLANE_SIZE; i++) {
			for (let j = 0; j < tools.PLANE_SIZE; j++) {
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
		for (let i = 0; i < tools.PLANE_SIZE; i++) {
			for (let j = 0; j < tools.PLANE_SIZE; j++) {
				this.arrayOfPlane[i][j].stepEnable = false;
			}
		}
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	// Handlers
	onDocumentMouseMove(event) {
		event.preventDefault();

		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}
}