import { Duck } from '../..';
import randomInt from '../../utils/randomInt';
import Game from '../game';
import Particle from './particle';

export default class ParticleEmitter {
	private particle: Particle;
	private rangeX: Duck.ParticleEmitter.range;
	private rangeY: Duck.ParticleEmitter.range;
	public readonly amount: number;
	private list: Particle[];
	private game: Game;
	public emitting: boolean;

	constructor(
		particle: Particle,
		rangeX: Duck.ParticleEmitter.range,
		rangeY: Duck.ParticleEmitter.range,
		amount: number,
		game: Game
	) {
		this.particle = particle;
		this.rangeX = rangeX;
		this.rangeY = rangeY;
		this.amount = amount;
		this.list = [];
		this.game = game;

		this.emitting = false;

		// create particles
		this.create();
	}

	private create() {
		for (let i = 0; i < this.amount; i++) {
			const obj = new Particle(
				this.particle.shape,
				this.particle.w,
				this.particle.h,
				this.particle.r,
				this.particle.fillColor,
				this.game
			);

			obj.x = randomInt(this.rangeX[0], this.rangeX[1]);
			obj.y = randomInt(this.rangeY[0], this.rangeY[1]);

			this.list.push(obj);
		}
	}

	public emit() {
		this.emitting = true;
	}

	public stopEmit() {
		this.emitting = false;
	}

	public draw() {
		if (this.emitting) {
			this.list.forEach((particle) => {
				particle.draw();
			});
		}
	}

	public setVelocity(axis: 'x' | 'y', v: number) {
		this.list.forEach((particle) => {
			particle.setVelocity(axis, v);
		});
	}

	public wobble(v: number) {
		const r = randomInt(1, 4);

		if (r === 1) {
			this.list.forEach((particle) => {
				particle.setVelocity('x', v);
			});
		}

		if (r === 2) {
			this.list.forEach((particle) => {
				particle.setVelocity('y', v);
			});
		}

		if (r === 3) {
			this.list.forEach((particle) => {
				particle.setVelocity('x', -v);
			});
		}

		if (r === 4) {
			this.list.forEach((particle) => {
				particle.setVelocity('y', -v);
			});
		}
	}

	public setFillColor(fillColor: string) {
		this.list.forEach((particle) => {
			particle.setFillColor(fillColor);
		});
	}
}
