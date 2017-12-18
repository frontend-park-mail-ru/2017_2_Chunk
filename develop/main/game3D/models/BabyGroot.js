import factory from './ModelFactory.js'

export default new class GrootFactory extends factory {
	constructor() {
		super('models/dae/BabyGroot/model.dae', (model) => {
			model.scale.set(2, 2, 2);
		});
	}
}