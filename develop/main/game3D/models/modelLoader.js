import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import FBXLoader from 'three-fbx-loader';
import ColladaLoader from '../tools/CustomColladaLoader';

export default new class Loader {

	constructor() {

		this.colladaLoader = new ColladaLoader();
		this.colladaLoader.options.convertUpAxis = true;

		OBJLoader(THREE);
		this.THREE = THREE;
		this.objLoader = new this.THREE.OBJLoader();

		FBXLoader(THREE);
		this.fbxLoader = new this.THREE.FBXLoader();
	}

	load(modelPath) {

		console.log("Loading model from " + modelPath);

		const extension = modelPath.substr(modelPath.length - 4, modelPath.length);
		let resolve, reject;
		let promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});

		let loader, onSuccess;
		switch (extension) {
			case '.dae': {
				loader = this.colladaLoader;
				onSuccess = this.colladaLoad;
				break;
			}
			case '.obj': {
				loader = this.objLoader;
				onSuccess = this.objLoad;
				break;
			}
			case '.fbx': {
				loader = this.fbxLoader;
				onSuccess = this.fbxLoad;
				break;
			}
			default: {
				console.warn("Неизвестный формат модели: " + extension);
				return undefined;
			}
		}
		loader.load(
			modelPath,
			onSuccess.bind(null, resolve),
			this.onProgress,
			this.onError.bind(null, reject)
		);
		return promise;
	}

	onError(reject) {
		const errorMessage = "Не удалось загрузить модель";
		console.warn(errorMessage);
		reject(new Error(errorMessage));
	}

	onProgress(xhr) {
		if (xhr.lengthComputable) {
			let percentComplete = (xhr.loaded / xhr.total) * 100;
			console.info(Math.round(percentComplete, 2) + '% downloaded');
		}
	}

	colladaLoad(resolve, collada) {
		resolve(collada.scene);
	}

	objLoad(resolve, object) {
		resolve(object);
	}

	fbxLoad(resolve, object) {
		resolve(object);
	}
}