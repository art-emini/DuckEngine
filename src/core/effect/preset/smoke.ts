import { Duck } from '../../../index';
import Game from '../../game';
import Particle from '../../gameobjects/particles/particle';
import ParticleEmitter from '../../gameobjects/particles/particleEmitter';
import Scene from '../../scene';
import Effect from '../effect';

export default class SmokeEffect extends Effect {
	protected maxAge: number;

	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		game: Game,
		particleAmount = 50,
		speedRangeX = [-0.1, -0.4],
		speedRangeY = [-0.1, -0.4],
		maxAge = 20,
		color = '#2e2e2e',
		interval = 50,
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

		this.particleEmitter.float(
			[speedRangeX[0], speedRangeX[0]],
			[speedRangeY[1], speedRangeY[1]]
		);
		this.particleEmitter.keepEmitting(interval);
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
