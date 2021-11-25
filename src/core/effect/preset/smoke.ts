import { Duck } from '../../../index';
import Game from '../../game';
import Particle from '../../gameobjects/particles/particle';
import ParticleEmitter from '../../gameobjects/particles/particleEmitter';
import Scene from '../../scene';
import Effect from '../effect';

export default class SmokeEffect extends Effect {
	protected maxAge: number;
	protected speedRangeX: Duck.Types.ParticleEmitter.Range;
	protected speedRangeY: Duck.Types.ParticleEmitter.Range;
	protected interval: number;

	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		game: Game,
		particleAmount = 50,
		speedRangeX: Duck.Types.ParticleEmitter.Range = [-10, -40],
		speedRangeY: Duck.Types.ParticleEmitter.Range = [-10, -40],
		maxAge = 20,
		color = '#2e2e2e',
		interval = 50,
		scene: Scene
	) {
		const particle = new Particle('circle', 0, 0, 5, color, game, scene);
		particle.visible = false;

		const particleEmitter = new ParticleEmitter(
			particle,
			rangeX,
			rangeY,
			particleAmount,
			game,
			scene,
			false
		);

		super(rangeX, rangeY, particleEmitter, game);

		this.maxAge = maxAge;
		this.speedRangeX = speedRangeX;
		this.speedRangeY = speedRangeY;
		this.interval = interval;
	}

	/**
	 * @memberof Effect
	 * @description Makes the particleEmitter emit
	 * @since 1.2.0
	 */
	public emit() {
		this.particleEmitter.create();
		this.particleEmitter.float(
			[this.speedRangeX[0], this.speedRangeX[0]],
			[this.speedRangeY[1], this.speedRangeY[1]]
		);
		this.particleEmitter.keepEmitting(this.interval);

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
