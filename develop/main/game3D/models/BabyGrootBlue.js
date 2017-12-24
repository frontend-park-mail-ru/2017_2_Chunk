import factory from './ModelFactory.js'

export default new class GrootFactoryBlue extends factory {
	constructor() {

		// Путь до модели
		let path = 'models/dae/BabyGrootBlue/model.dae';

		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		function setOrientation(model) {
			model.scale.set(2, 2, 2);
			model.position.y = 13.5;
			model.rotation.y = 0;
		}

		super(path, setOrientation);
	}
}