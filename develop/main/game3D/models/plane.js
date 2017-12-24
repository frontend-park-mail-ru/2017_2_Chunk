'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class PlaneCell {
	constructor(x = 0, z = 0) {
		this.y = 13.5;
		this.geometry = new THREE.PlaneGeometry(
			tools.PLANE_XX - 11,
			tools.PLANE_XX - 11
		);
		this.material = new THREE.MeshLambertMaterial({
			color: tools.COLORS.PLANE_COLOR,
			emissive: 0x938c1f,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = -Math.PI / 2;
		this.mesh.position.set(
			x * tools.PLANE_XX + 8,
			this.y,
			z * tools.PLANE_XX + 8
		);

		this.x = x;
		this.z = z;
		this.figure = 0;
		this.stepEnable = false;
	}
}
