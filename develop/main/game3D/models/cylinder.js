'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class Cylinder {
	constructor(x = 0, z = 0) {
		let geometry1 = new THREE.CylinderGeometry(
			4.2,
			4.2,
			7,
			32
		);
		let geometry2 = new THREE.CylinderGeometry(
			2.5,
			2,
			35,
			32
		);
		this.material = new THREE.MeshLambertMaterial({
			color: tools.PLAYER_COLORS[0],
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0
		});

		geometry1.merge(geometry2, geometry2.matrix);

		this.mesh = new THREE.Mesh(geometry1, this.material);
		this.mesh.position.set(
			x * tools.PLANE_XX + 8,
			17.5,
			z * tools.PLANE_XX + 8
		);

		this.x = x;
		this.z = z;
		this.figure = 0;
		this.stepEnable = false;
	}
}