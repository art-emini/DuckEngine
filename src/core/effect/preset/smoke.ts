import { Duck } from '../../../index';
import Game from '../../game';
import Particle from '../../particles/particle';
import ParticleEmitter from '../../particles/particleEmitter';
import Effect from '../effect';

export default class SmokeEffect extends Effect {
	private maxAge: number;

	constructor(
		rangeX: Duck.ParticleEmitter.Range,
		rangeY: Duck.ParticleEmitter.Range,
		game: Game,
		particleAmount = 50,
		speedRangeX = [-0.1, -0.4],
		speedRangeY = [-0.1, -0.4],
		maxAge = 20,
		color = '#2e2e2e',
		interval = 50
	) {
		const particle = new Particle('circle', 0, 0, 5, color, game);

		const particleEmitter = new ParticleEmitter(
			particle,
			rangeX,
			rangeY,
			particleAmount,
			game
		);

		super(rangeX, rangeY, particleEmitter, game);

		this.maxAge = maxAge;

		this.particleEmitter.float(
			[speedRangeX[0], speedRangeX[0]],
			[speedRangeY[1], speedRangeY[1]]
		);
		this.particleEmitter.keepEmitting(interval);
	}

	public draw() {
		this.particleEmitter.draw();
		this.particleEmitter.offloadMaxAge(this.maxAge);
	}
}