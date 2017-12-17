import modelLoader from './modelLoader.js'

export default class ModelFactory {

	constructor(path, setOrientation) {

		// Путь до модели
		this.path = path;
		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		this.setOrientation = setOrientation || function (model) {
			model.scale.set(1, 1, 1);
		};

		modelLoader
			.load(this.path)
			.then(model => {
				this.model = model;
				this.setOrientation(this.model);
				console.info("Модель " + path + " успешно загружена");
			});
	}

	getNew() {
		if (this.model === undefined) {
			console.error("Модель еще не загружена");
			return null;
		}
		return this.model.clone();
	}

	isReady() {
		return this.model !== undefined;
	}
}