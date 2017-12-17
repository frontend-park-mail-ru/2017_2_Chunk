import modelLoader from './modelLoader.js'

export default class ModelFactory {

	constructor(path, setOrientation) {

		this.i = 0;
		// Путь до модели
		this.path = path;

		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		this.setOrientation = setOrientation || function (model) {
			model.scale.set(1, 1, 1);
		};

		this.getNew();
	}

	async getNew() {
		console.log(++this.i);
		if (this.model === undefined) {
			this.model = await modelLoader.load(this.path);
			this.setOrientation(this.model);
		}
		return this.model.clone();
	}

	isReady() {
		return this.model !== undefined;
	}
}