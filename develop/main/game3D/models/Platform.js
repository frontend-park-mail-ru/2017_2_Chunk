import factory from './ModelFactory.js'

export default new class PlatformFactory extends factory {
	constructor() {
		// Путь до модели
		let path = 'models/dae/Platform/model.dae';

		super(path)
	}
}