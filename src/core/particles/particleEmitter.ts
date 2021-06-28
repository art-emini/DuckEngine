import { Duck } from '../..';
import randomFloat from '../../utils/randomFloat';
import randomInt from '../../utils/randomInt';
import Game from '../game';
import Particle from './particle';

export default class ParticleEmitter {
	private particle: Particle;
	public rangeX: Duck.ParticleEmitter.Range;
	public rangeY: Duck.ParticleEmitter.Range;
	public readonly amount: number;
	private list: Particle[];
	private game: Game;
	public emitting: boolean;

	private floatRangeX: Duck.ParticleEmitter.Range;
	private floatRangeY: Duck.ParticleEmitter.Range;

	constructor(
		particle: Particle,
		rangeX: Duck.ParticleEmitter.Range,
		rangeY: Duck.ParticleEmitter.Range,
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

		this.floatRangeX = [0, 0];
		this.floatRangeY = [0, 0];

		// create particles
		this.create();
	}

	private create() {
		for (let i = 0; i < this.amount; i++) {
			this.createOne();
		}
	}

	private createOne() {
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

		obj.floatVX = randomFloat(this.floatRangeX[0], this.floatRangeX[1], 1);
		obj.floatVY = randomFloat(this.floatRangeY[0], this.floatRangeY[1], 1);

		this.list.push(obj);
	}

	public emit() {
		this.emitting = true;
	}

	public stopEmit() {
		this.emitting = false;
	}

	public emitFor(ms: number) {
		this.emitting = true;
		setTimeout(() => {
			this.emitting = false;
		}, ms);
	}

	public setRange(
		rangeX: Duck.ParticleEmitter.Range,
		rangeY: Duck.ParticleEmitter.Range
	) {
		this.rangeX = rangeX;
		this.rangeY = rangeY;
	}

	public keepEmitting(intervalMS: number, limitTo?: number) {
		setInterval(() => {
			if (limitTo) {
				if (this.list.length < limitTo) {
					this.createOne();
				}
			} else {
				this.createOne();
			}
		}, intervalMS);
	}

	public offloadMaxAmount(limit: number) {
		if (this.list.length >= limit) {
			this.list.pop();
		}
	}

	public offload(offloadY: number, offloadX?: number) {
		this.list.forEach((particle, index) => {
			if (particle.y < offloadY) {
				this.list.splice(index, 1);
			}
			if (offloadX) {
				if (particle.x > offloadX) {
					this.list.splice(index, 1);
				}
			}
		});
	}

	public offloadMaxAge(ageInSeconds: number) {
		this.list.forEach((particle, index) => {
			if (particle.age >= ageInSeconds) {
				this.list.splice(index, 1);
			}
		});
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

	public float(
		rangeVX: Duck.ParticleEmitter.Range,
		rangeVY: Duck.ParticleEmitter.Range
	) {
		this.floatRangeX = rangeVX;
		this.floatRangeY = rangeVY;

		this.list.forEach((particle) => {
			particle.floatVX = randomFloat(rangeVX[0], rangeVX[1], 1);
			particle.floatVY = randomFloat(rangeVY[0], rangeVY[1], 1);
		});
	}

	public setFillColor(fillColor: string) {
		this.list.forEach((particle) => {
			particle.setFillColor(fillColor);
		});
	}
}
