import { Duck } from '../../index';
import Game from '../game';
import ParticleEmitter from '../particles/particleEmitter';

export default class Effect {
	public rangeX: Duck.Types.ParticleEmitter.Range;
	public rangeY: Duck.Types.ParticleEmitter.Range;
	public particleEmitter: ParticleEmitter;
	protected game: Game;

	public following: Duck.GameObjects.GameObject | undefined;
	protected randomMaxOffset: number;

	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		particleEmitter: ParticleEmitter,
		game: Game
	) {
		this.rangeX = rangeX;
		this.rangeY = rangeY;
		this.particleEmitter = particleEmitter;
		this.game = game;

		this.particleEmitter.rangeX = rangeX;
		this.particleEmitter.rangeY = rangeY;

		this.following;
		this.randomMaxOffset = 5;
	}

	public emit() {
		this.particleEmitter.emit();
	}

	public stopEmit() {
		this.particleEmitter.stopEmit();
	}

	public emitFor(ms: number) {
		this.particleEmitter.emitFor(ms);
	}

	public draw() {
		this.particleEmitter.draw();

		if (this.following) {
			const rangeX: Duck.Types.ParticleEmitter.Range = [
				this.following.position.x,
				this.following.position.x + this.randomMaxOffset,
			];
			const rangeY: Duck.Types.ParticleEmitter.Range = [
				this.following.position.y,
				this.following.position.y + this.randomMaxOffset,
			];

			this.particleEmitter.rangeX = rangeX;
			this.particleEmitter.rangeY = rangeY;
		}
	}

	public follow(object: Duck.Types.GameObject, randomMaxOffset = 5) {
		this.following = object;
		this.randomMaxOffset = randomMaxOffset;
	}

	public stopFollow() {
		this.following = undefined;
	}
}
