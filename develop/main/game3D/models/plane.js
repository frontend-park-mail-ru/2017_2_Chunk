'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class PlaneCell {
	constructor(x = 0, z = 0) {
		let y = 0;
		this.geometry = new THREE.PlaneGeometry(
			tools.PLANE_X - 1,
			tools.PLANE_Z - 1
		);
		this.material = new THREE.MeshLambertMaterial({
			color: tools.COLORS.PLANE_COLOR,
			side: THREE.DoubleSide
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = -Math.PI / 2;
		this.mesh.position.set(
			(x + 0.5)*tools.PLANE_X,
			y,
			(z + 0.5)*tools.PLANE_Z
		);

		this.x = x;
		this.z = z;
		this.figure = 0;
		this.stepEnable = false;
	}
}