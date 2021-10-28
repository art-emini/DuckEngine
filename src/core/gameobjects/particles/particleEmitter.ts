import { Duck } from '../../../index';
import randomFloat from '../../math/randomFloat';
import randomInt from '../../math/randomInt';
import Game from '../../game';
import Particle from './particle';
import ParticleContainer from './particleContainer';
import Scene from '../../scene';

/**
 * @class ParticleEmitter
 * @classdesc Creates a DuckEngine ParticleEmitter
 * @description The ParticleEmitter Class. Emits, creates, and destroys particles
 * @since 1.0.0-beta
 */
export default class ParticleEmitter {
	private particle: Particle;
	public rangeX: Duck.Types.ParticleEmitter.Range;
	public rangeY: Duck.Types.ParticleEmitter.Range;
	public readonly amount: number;
	public list: Particle[];
	public game: Game;
	public scene: Scene;

	public emitting: boolean;

	private floatRangeX: Duck.Types.ParticleEmitter.Range;
	private floatRangeY: Duck.Types.ParticleEmitter.Range;

	private container: ParticleContainer | undefined;

	/**
	 * @constructor
	 * @description
	 * @param {Particle} particle Base particle that is cloned and modified from
	 * @param {Duck.Types.ParticleEmitter.Range} rangeX Where the new emitted particles x position is. A range of 2 values
	 * @param {Duck.Types.ParticleEmitter.Range} rangeY Where the new emitted particles y position is. A range of 2 values
	 * @param {number} amount Amount of starting particles
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
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
			this.particle.originalFillColorOrIMGPath,
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
		this.scene.displayList.add(obj);
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Starts emitting particles
	 * @since 1.0.0-beta
	 */
	public emit() {
		this.emitting = true;
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Stops emitting particles
	 * @since 1.0.0-beta
	 */
	public stopEmit() {
		this.emitting = false;
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Starts emitting particles for a certain duration
	 * @param {number} ms Duration in milliseconds
	 * @since 1.0.0-beta
	 */
	public emitFor(ms: number) {
		this.emitting = true;
		setTimeout(() => {
			this.emitting = false;
		}, ms);
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Sets the new particles' position range
	 * @param {Duck.Types.ParticleEmitter.Range} rangeX Where the new emitted particles x position is. A range of 2 values
	 * @param {Duck.Types.ParticleEmitter.Range} rangeY Where the new emitted particles y position is. A range of 2 values
	 * @since 1.0.0-beta
	 */
	public setRange(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range
	) {
		this.rangeX = rangeX;
		this.rangeY = rangeY;
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Spawns new particles after the initial particles
	 * @param {number} intervalMS How often a new particle gets spawned
	 * @param {number} [limitTo] A limit to how many particles can be rendered at once, optional
	 * @since 1.0.0-beta
	 */
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

	/**
	 * @memberof ParticleEmitter
	 * @description Pops particles from the list if too many particles exist
	 * @since 1.0.0
	 */
	public offloadMaxAmount(limit: number) {
		if (this.list.length >= limit) {
			this.list.pop();
		}

		// remove from display list
		(
			this.scene.displayList.list.filter(
				(renderableObject) => renderableObject instanceof Particle
			) as Particle[]
		).pop();
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Offloads particles based on position
	 * @param {number} offloadY The max y position of when a particle is offloaded
	 * @param {number} [offloadX] The max x position of when a particle is offloaded, optional
	 * @since 1.0.0
	 */
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
		this.scene.displayList.each((renderableObject, index) => {
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

	/**
	 * @memberof ParticleEmitter
	 * @description Offloads particles based on how many seconds they existed for
	 * @param {number} ageInSeconds Max amount of seconds a particle existed for
	 * @since 1.0.0
	 */
	public offloadMaxAge(ageInSeconds: number) {
		this.list.forEach((particle, index) => {
			if (particle.age >= ageInSeconds) {
				this.list.splice(index, 1);
			}
		});

		// remove from displayList
		this.scene.displayList.each((renderableObject, index) => {
			if (renderableObject instanceof Particle) {
				if (renderableObject.age >= ageInSeconds) {
					this.scene.displayList.splice(index, 1);
				}
			}
		});
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Sets the velocity of all particles
	 * @param {'x'|'y'} axis 'x' or 'y' axis to change the velocity of all particles
	 * @param {number} v Value to set the velocity of all particles
	 * @since 1.0.0-beta
	 */
	public setVelocity(axis: 'x' | 'y', v: number) {
		this.list.forEach((particle) => {
			particle.setVelocity(axis, v);
		});
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Wobbles the particle on a random direction and axis
	 * @param {number} v Value to set the wobble velocity to
	 * @since 1.0.0-beta
	 */
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

	/**
	 * @memberof ParticleEmitter
	 * @description Sets the floatVelocity of all particles in between a range
	 * @param {Duck.Types.ParticleEmitter.Range} rangeVX A range of 2 values for the floatVelocity.x, randomly chosen between that range
	 * @param {Duck.Types.ParticleEmitter.Range} rangeVY A range of 2 values for the floatVelocity.y, randomly chosen between that range
	 * @since 1.0.0-beta
	 */
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

	/**
	 * @memberof ParticleEmitter
	 * @description Sets the fillColor of all particles
	 * @param {string} fillColor Color
	 * @since 1.0.0-beta
	 */
	public setFillColor(fillColor: string) {
		this.list.forEach((particle) => {
			particle.setFillColor(fillColor);
		});
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Sets the imagePath of all particles
	 * @param {string} imagePath Image path
	 * @since 1.0.0
	 */
	public setImagePath(imagePath: string) {
		this.list.forEach((particle) => {
			particle.setImagePath(imagePath);
		});
	}

	/**
	 * @memberof ParticleEmitter
	 * @description Adds a {@link ParticleContainer}
	 * @param {number} x X bounds of ParticleContainer
	 * @param {number} y Y bounds of ParticleContainer
	 * @param {number} w Width of ParticleContainer
	 * @param {number} h Height of ParticleContainer
	 * @param {Duck.Types.ParticleContainer.Physics} physics Physics configuration for ParticleContainer
	 * @since 1.2.0
	 */
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
