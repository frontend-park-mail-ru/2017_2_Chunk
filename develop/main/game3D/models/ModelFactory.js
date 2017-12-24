import modelLoader from './modelLoader.js'

export default class ModelFactory {

	constructor(path, setOrientation) {

		this.path = path;
		this.setOrientation = setOrientation || function () { };

		modelLoader
			.load(this.path)
			.then(model => {
				this.model = model;
				this.setOrientation(this.model);
				//console.info("Модель " + path + " успешно загружена");
			});
	}

	getNew() {
		if (this.model === undefined) {
			//console.error("Модель еще не загружена");
			return null;
		}
		return this.model.clone();
	}

	isReady() {
		return this.model !== undefined;
	}
}