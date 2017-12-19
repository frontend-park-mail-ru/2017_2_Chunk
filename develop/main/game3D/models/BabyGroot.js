import factory from './ModelFactory.js'

export default new class GrootFactory extends factory {
	constructor() {

		// Путь до модели
		let path = 'models/dae/BabyGroot/model.dae';

		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		function setOrientation(model) {
			model.scale.set(1, 1, 1);
		}

		super(path, setOrientation);
	}
}