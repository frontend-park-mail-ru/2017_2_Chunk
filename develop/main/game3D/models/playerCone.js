'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class Player {
	constructor() {
		this.geometry = new THREE.CylinderGeometry(
			4,
			0,
			10,
			32
		);

		this.material = new THREE.MeshLambertMaterial({
			color: tools.PLAYER_COLORS_CLICK[0],
			emissive: 0x938c1f,
			side: THREE.DoubleSide
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.y = 45;
	}
}
