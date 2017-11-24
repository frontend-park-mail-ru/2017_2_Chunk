'use strict';
import * as THREE from 'three';
import * as tools from '../tools/tools.js';

export default class Player {
	constructor(x = 0, z = 0, colorpl = 1) {
		this.geometry = new THREE.CylinderGeometry(
			0,
			(Math.min(tools.PLANE_X, tools.PLANE_Z) * 0.75) / 2,
			tools.PLAYER_HEIGHT
		);

		this.material = new THREE.MeshLambertMaterial({
			color: tools.PLAYER_COLORS[colorpl - 1]
		});
		this.color = colorpl;

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(
			(x + 0.5) * tools.PLANE_X,
			(tools.PLAYER_HEIGHT / 2) * 1.05,
			(z + 0.5) * tools.PLANE_Z
		);

		this.x = x;
		this.y = (tools.PLAYER_HEIGHT / 2) * 1.05;
		this.z = z;
	}
}
