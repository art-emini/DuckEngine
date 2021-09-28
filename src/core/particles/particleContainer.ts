import { Duck } from '../..';
import Game from '../game';
import circleRectCollision from '../physics/circleToRectIntersect';
import rectToRectIntersect from '../physics/rectToRectIntersect';
import Particle from './particle';

export default class ParticleContainer {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	private physics: Duck.Types.ParticleContainer.Physics;
	private game: Game;

	public bounds: Duck.Types.ParticleContainer.Bounds;

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
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h,
		};
	}

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

	public handleRect(particle: Particle) {
		const obj = {
			x: particle.x,
			y: particle.y,
			w: particle.w,
			h: particle.h,
		};

		if (!rectToRectIntersect(obj, this.bounds)) {
			// top
			if (particle.y < this.bounds.y) {
				particle.vy = 0 + this.physics.bounciness;
				particle.floatVY = 0 + this.physics.bounciness;
			}

			// left
			if (particle.x < this.bounds.x) {
				particle.vx = 0 + this.physics.bounciness;
				particle.floatVX = 0 + this.physics.bounciness;
			}

			// bottom
			if (particle.y + particle.h > this.bounds.h) {
				particle.vy = 0 - this.physics.bounciness;
				particle.floatVY = 0 - this.physics.bounciness;
			}

			// right
			if (particle.x + particle.w > this.bounds.w) {
				particle.vx = 0 - this.physics.bounciness;
				particle.floatVX = 0 - this.physics.bounciness;
			}
		}
	}

	public handleCircle(particle: Particle) {
		const obj = {
			x: particle.x,
			y: particle.y,
			w: particle.w,
			h: particle.h,
			r: particle.r,
		};

		if (!circleRectCollision(obj, this.bounds)) {
			// top
			if (particle.y < this.bounds.y) {
				particle.vy = 0 + this.physics.bounciness;
				particle.floatVY = 0 + this.physics.bounciness;
			}

			// left
			if (particle.x < this.bounds.x) {
				particle.vx = 0 + this.physics.bounciness;
				particle.floatVX = 0 + this.physics.bounciness;
			}

			// bottom
			if (particle.y + particle.r > this.bounds.h) {
				particle.vy = 0 - this.physics.bounciness;
				particle.floatVY = 0 - this.physics.bounciness;
			}

			// right
			if (particle.x + particle.r > this.bounds.w) {
				particle.vx = 0 - this.physics.bounciness;
				particle.floatVX = 0 - this.physics.bounciness;
			}
		}
	}
}
