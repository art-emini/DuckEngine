import { Duck } from '../../../index';
import Game from '../../game';
import randomFloat from '../../math/randomFloat';
import Particle from '../../gameobjects/particles/particle';
import ParticleEmitter from '../../gameobjects/particles/particleEmitter';
import Scene from '../../scene';
import Effect from '../effect';

export default class ExplosionEffect extends Effect {
	protected maxAge: number;
	protected speedRange: Duck.Types.ParticleEmitter.Range;

	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		game: Game,
		particleAmount = 50,
		speedRange: Duck.Types.ParticleEmitter.Range = [450, 450],
		maxAge = 3,
		color = '#FFA500',
		scene: Scene
	) {
		const particle = new Particle('circle', 0, 0, 5, color, game, scene);
		particle.visible = false; // for now, ParticleEmitter sets it to true when emits

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
		this.speedRange = speedRange;
	}

	/**
	 * @memberof Effect
	 * @description Makes the particleEmitter emit
	 * @since 1.2.0
	 */
	public emit() {
		const min = randomFloat(-this.speedRange[0], -this.speedRange[1]);
		const max = randomFloat(this.speedRange[0], this.speedRange[1]);

		this.particleEmitter.float([min, max], [min, max]);

		this.particleEmitter.emit();
	}

	/**
	 * @memberof Effect
	 * @description Stops the particleEmitter emitting
	 * @since 1.2.0
	 */
	public stopEmit() {
		this.particleEmitter.stopEmit();
	}

	/**
	 * @memberof Effect
	 * @description Makes the particleEmitter emit for a duration
	 * @param {number} ms Duration in milliseconds
	 * @since 1.2.0
	 */
	public emitFor(ms: number) {
		this.particleEmitter.emitFor(ms);
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
