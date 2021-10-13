import { Duck } from '../../index';
import randomFloat from '../math/randomFloat';
import randomInt from '../math/randomInt';
import Game from '../game';
import Particle from './particle';
import ParticleContainer from './particleContainer';
import Scene from '../scene';

export default class ParticleEmitter {
	private particle: Particle;
	public rangeX: Duck.Types.ParticleEmitter.Range;
	public rangeY: Duck.Types.ParticleEmitter.Range;
	public readonly amount: number;
	private list: Particle[];
	private game: Game;
	public scene: Scene;
	public emitting: boolean;

	private floatRangeX: Duck.Types.ParticleEmitter.Range;
	private floatRangeY: Duck.Types.ParticleEmitter.Range;

	private container: ParticleContainer | undefined;

	constructor(
		particle: Particle,
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		amount: number,
		game: Game,
		scene: Scene
	) {
		this.particle = particle;
		this.rangeX = rangeX;
		this.rangeY = rangeY;
		this.amount = amount;
		this.list = [];
		this.game = game;
		this.scene = scene;

		this.emitting = false;

		this.floatRangeX = [0, 0];
		this.floatRangeY = [0, 0];

		this.container;

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

		obj.position.x = randomInt(this.rangeX[0], this.rangeX[1]);
		obj.position.y = randomInt(this.rangeY[0], this.rangeY[1]);

		obj.floatVelocity.x = randomFloat(
			this.floatRangeX[0],
			this.floatRangeX[1],
			1
		);
		obj.floatVelocity.y = randomFloat(
			this.floatRangeY[0],
			this.floatRangeY[1],
			1
		);

		this.list.push(obj);

		// add to display list
		this.scene.displayList.push(obj);
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
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range
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

		// remove from display list
		(
			this.scene.displayList.filter(
				(renderableObject) => renderableObject instanceof Particle
			) as Particle[]
		).pop();
	}

	public offload(offloadY: number, offloadX?: number) {
		this.list.forEach((particle, index) => {
			if (particle.position.y < offloadY) {
				this.list.splice(index, 1);
			}
			if (offloadX) {
				if (particle.position.x > offloadX) {
					this.list.splice(index, 1);
				}
			}
		});

		// remove from displayList
		this.scene.displayList.forEach((renderableObject, index) => {
			if (renderableObject instanceof Particle) {
				if (renderableObject.position.y < offloadY) {
					this.scene.displayList.splice(index, 1);
				}
				if (offloadX) {
					if (renderableObject.position.x > offloadX) {
						this.scene.displayList.splice(index, 1);
					}
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

		// remove from displayList
		this.scene.displayList.forEach((renderableObject, index) => {
			if (renderableObject instanceof Particle) {
				if (renderableObject.age >= ageInSeconds) {
					this.scene.displayList.splice(index, 1);
				}
			}
		});
	}

	public _draw() {
		if (this.emitting) {
			this.list.forEach((particle) => {
				if (this.container) {
					this.container.update(particle);
				}
				particle._draw();
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
		rangeVX: Duck.Types.ParticleEmitter.Range,
		rangeVY: Duck.Types.ParticleEmitter.Range
	) {
		this.floatRangeX = rangeVX;
		this.floatRangeY = rangeVY;

		this.list.forEach((particle) => {
			particle.floatVelocity.x = randomFloat(rangeVX[0], rangeVX[1], 1);
			particle.floatVelocity.y = randomFloat(rangeVY[0], rangeVY[1], 1);
		});
	}

	public setFillColor(fillColor: string) {
		this.list.forEach((particle) => {
			particle.setFillColor(fillColor);
		});
	}

	public setImagePath(imagePath: string) {
		this.list.forEach((particle) => {
			particle.setImagePath(imagePath);
		});
	}

	public addContainer(
		x: number,
		y: number,
		w: number,
		h: number,
		physics: Duck.Types.ParticleContainer.Physics
	) {
		this.container = new ParticleContainer(x, y, w, h, physics, this.game);
		return this.container;
	}
}
