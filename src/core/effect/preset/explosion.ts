import { Duck } from '../../../index';
import Game from '../../game';
import randomFloat from '../../math/randomFloat';
import Particle from '../../particles/particle';
import ParticleEmitter from '../../particles/particleEmitter';
import Scene from '../../scene';
import Effect from '../effect';

export default class ExplosionEffect extends Effect {
	private maxAge: number;

	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		game: Game,
		particleAmount = 50,
		speedRange = [1, 1],
		maxAge = 3,
		color = '#FFA500',
		scene: Scene
	) {
		const particle = new Particle('circle', 0, 0, 5, color, game);

		const particleEmitter = new ParticleEmitter(
			particle,
			rangeX,
			rangeY,
			particleAmount,
			game,
			scene
		);

		super(rangeX, rangeY, particleEmitter, game);

		this.maxAge = maxAge;

		const min = randomFloat(-speedRange[0], -speedRange[1]);
		const max = randomFloat(speedRange[0], speedRange[1]);

		this.particleEmitter.float([min, max], [min, max]);
	}

	/**
	 * @description Draws the effect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		this.particleEmitter.offloadMaxAge(this.maxAge);
	}
}
