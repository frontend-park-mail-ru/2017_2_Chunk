import factory from './ModelFactory.js'

export default new class IronManFactory extends factory {
	constructor() {

		// Путь до модели
		let path = 'models/dae/IronMan/model.dae';

		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		function setOrientation(model) {
			model.scale.set(0.5, 0.5, 0.5);
			model.position.y = 13.5;
		}

		super(path, setOrientation);
	}
}