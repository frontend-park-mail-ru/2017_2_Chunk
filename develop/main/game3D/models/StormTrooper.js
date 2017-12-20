import factory from './ModelFactory.js'

export default new class StormtrooperFactory extends factory {
	constructor() {

		// Путь до модели
		let path = 'models/dae/Stormtrooper/model.dae';

		// Функция которая масштабирует и ставит
		// в правильное положение "сырые" модели
		function setOrientation(model) {
			model.scale.set(8, 8, 8);
			model.rotation.x = Math.PI/2;
			model.rotation.z = Math.PI;
			model.position.y = 13;
		}

		super(path, setOrientation);
	}
}