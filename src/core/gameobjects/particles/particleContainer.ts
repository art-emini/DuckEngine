import { Duck } from '../../..';
import Game from '../../game';
import circleRectCollision from '../../physics/circleToRectIntersect';
import rectToRectIntersect from '../../physics/rectToRectIntersect';
import Particle from './particle';

/**
 * @class ParticleContainer
 * @classdesc Creates a DuckEngine ParticleContainer
 * @description The ParticleContainer Class. Keeps particles from leaving an area
 * @since 1.2.0
 */
export default class ParticleContainer {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	protected physics: Duck.Types.ParticleContainer.Physics;
	public game: Game;

	public bounds: Duck.Types.ParticleContainer.Bounds;
	/**
	 * @constructor
	 * @description Creates a ParticleContainer instance
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {Duck.Types.ParticleContainer.Physics} physics Physics configuration
	 * @param {Game} game Game instance
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		physics: Duck.Types.ParticleContainer.Physics,
		game: Game
	) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.physics = physics;
		this.game = game;

		this.bounds = {
			position: {
				x: this.x,
				y: this.y,
			},
			w: this.w,
			h: this.h,
		};
	}

	/**
	 * @memberof ParticleContainer
	 * @description Updates the current particle
	 *
	 * DO NOT CALL MANUALLY, CALLED IN PARTICLE EMITTER _draw METHOD
	 *
	 * @param {Particle} particle Current particle in a particleEmitter loop
	 * @since 1.2.0
	 */
	public update(particle: Particle) {
		if (particle.shape === 'circle') {
			this.handleCircle(particle);
		}

		if (
			particle.shape === 'rect' ||
			particle.shape === 'roundrect' ||
			particle.shape === 'sprite'
		) {
			this.handleRect(particle);
		}
	}

	protected handleRect(particle: Particle) {
		const obj = {
			position: {
				x: particle.position.x,
				y: particle.position.y,
			},
			w: particle.w,
			h: particle.h,
		};

		if (!rectToRectIntersect(obj, this.bounds)) {
			// top
			if (particle.position.y < this.bounds.position.y) {
				particle.velocity.y = 0 + this.physics.bounciness;
				particle.floatVelocity.y = 0 + this.physics.bounciness;
			}

			// left
			if (particle.position.x < this.bounds.position.x) {
				particle.velocity.x = 0 + this.physics.bounciness;
				particle.floatVelocity.x = 0 + this.physics.bounciness;
			}

			// bottom
			if (particle.position.y + particle.h > this.bounds.h) {
				particle.velocity.y = 0 - this.physics.bounciness;
				particle.floatVelocity.y = 0 - this.physics.bounciness;
			}

			// right
			if (particle.position.x + particle.w > this.bounds.w) {
				particle.velocity.x = 0 - this.physics.bounciness;
				particle.floatVelocity.x = 0 - this.physics.bounciness;
			}
		}
	}

	protected handleCircle(particle: Particle) {
		const obj = {
			position: {
				x: particle.position.x,
				y: particle.position.y,
			},
			w: particle.w,
			h: particle.h,
			r: particle.r,
		};

		if (!circleRectCollision(obj, this.bounds)) {
			// top
			if (particle.position.y < this.bounds.position.y) {
				particle.velocity.y = 0 + this.physics.bounciness;
				particle.floatVelocity.y = 0 + this.physics.bounciness;
			}

			// left
			if (particle.position.x < this.bounds.position.x) {
				particle.velocity.x = 0 + this.physics.bounciness;
				particle.floatVelocity.x = 0 + this.physics.bounciness;
			}

			// bottom
			if (particle.position.y + particle.r > this.bounds.h) {
				particle.velocity.y = 0 - this.physics.bounciness;
				particle.floatVelocity.y = 0 - this.physics.bounciness;
			}

			// right
			if (particle.position.x + particle.r > this.bounds.w) {
				particle.velocity.x = 0 - this.physics.bounciness;
				particle.floatVelocity.x = 0 - this.physics.bounciness;
			}
		}
	}
}
