'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class Cylinder {
	constructor(x = 0, z = 0) {
		let combined = new THREE.Geometry();
		let geometry1 = new THREE.CylinderGeometry(
			4.2,
			4.2,
			7,
			32
		);
		let geometry2 = new THREE.CylinderGeometry(
			2.5,
			2,
			13.5,
			32
		);
		this.material = new THREE.MeshLambertMaterial({
			color: tools.PLAYER_COLORS[0],
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.5
		});
		let mesh1 = new THREE.Mesh(geometry1);
		mesh1.position.set(
			x * tools.PLANE_XX - 6,
			17.5,
			z * tools.PLANE_XX - 10
		);

		let mesh2 = new THREE.Mesh(geometry2);
		mesh2.position.set(
			x * tools.PLANE_XX - 5.5,
			27,
			z * tools.PLANE_XX - 11
		);

		THREE.GeometryUtils.merge(combined, mesh1);
		THREE.GeometryUtils.merge(combined, mesh2);

		this.mesh = new THREE.Mesh(combined, this.material);

		this.x = x;
		this.z = z;
		this.figure = 0;
		this.stepEnable = false;
	}
}