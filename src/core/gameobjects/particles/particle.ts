import { Duck } from '../../../index';
import Debug from '../../debug/debug';
import Game from '../../game';
import GameObject from '../gameObject';
import clamp from '../../math/clamp';
import Vector2 from '../../math/vector2';
import Texture from '../../models/texture';
import Scene from '../../scene';

/**
 * @class Particle
 * @classdesc Creates a DuckEngine Particle
 * @description The Particle Class. A particle that can be emitted by a {@link ParticleEmitter}
 * @extends GameObject
 * @since 1.0.0-beta
 */
export default class Particle extends GameObject<'either'> {
	public floatVelocity: Vector2;

	public originalFillColorOrIMGPath: string;

	/**
	 * @memberof Particle
	 * @description The age of the particle in seconds
	 * @property
	 * @since 1.0.0
	 */
	public age: number;

	/**
	 * @constructor
	 * @description Creates a Particle instance
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of the particle
	 * @param {number} w Width of the particle
	 * @param {number} h Height of the particle
	 * @param {number} r Radius of the particle
	 * @param {string} fillColorOrIMGPath Color to fill the particle with, can be an image path
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		w: number,
		h: number,
		r: number,
		fillColorOrIMGPath: string,
		game: Game,
		scene: Scene
	) {
		super(
			shape,
			0,
			0,
			w,
			h,
			r,
			Texture.fromEither(fillColorOrIMGPath, w, h),
			game,
			scene
		);

		this.originalFillColorOrIMGPath = fillColorOrIMGPath;

		this.w = w;
		this.h = h;
		this.r = r;

		this.floatVelocity = Vector2.ZERO;

		this.zIndex = Duck.Layers.Rendering.zIndex.particle;
		this.visible = false;

		// age

		this.age = 0;

		setInterval(() => {
			this.age++;
		}, 1000);
	}

	/**
	 * @memberof Particle
	 * @description Draws the particle. Do not call manually, called automatically in scene loop
	 * @since 1.0.0-beta
	 */
	public _draw() {
		if (this.game.ctx) {
			switch (this.shape) {
				case 'circle':
					this.game.ctx.beginPath();
					this.game.ctx.arc(
						this.position.x,
						this.position.y,
						this.r,
						0,
						2 * Math.PI,
						false
					);
					this.game.ctx.fillStyle = this.texture.texture as string;
					this.game.ctx.fill();
					break;

				case 'rect':
					this.game.ctx.fillStyle = this.texture.texture as string;
					this.game.ctx.fillRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h
					);
					break;

				case 'roundrect':
					if (this.w < 2 * this.r) this.r = this.w / 2;
					if (this.h < 2 * this.r) this.r = this.h / 2;
					this.game.ctx.fillStyle = this.texture.texture as string;
					this.game.ctx.beginPath();
					this.game.ctx.moveTo(
						this.position.x + this.r,
						this.position.y
					);
					this.game.ctx.arcTo(
						this.position.x + this.w,
						this.position.y,
						this.position.x + this.w,
						this.position.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x + this.w,
						this.position.y + this.h,
						this.position.x,
						this.position.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x,
						this.position.y + this.h,
						this.position.x,
						this.position.y,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x,
						this.position.y,
						this.position.x + this.w,
						this.position.y,
						this.r
					);
					this.game.ctx.closePath();
					this.game.ctx.fill();
					break;

				case 'sprite':
					this.game.ctx.drawImage(
						this.texture.texture as HTMLImageElement,
						this.position.x,
						this.position.y,
						this.w,
						this.h
					);

					break;

				default:
					if (this.game.config.debug) {
						new Debug.Warn(
							'Cannot draw Particle. Particle Shape is not a "circle", "rect", "roundrect", or "sprite".'
						);
					}
					break;
			}
		} else {
			new Debug.Error(
				'Cannot draw particle. CanvasRenderingContext2D is undefined.'
			);
		}
	}

	/**
	 * @memberof Particle
	 *
	 * *Modified from gameobject*
	 *
	 * @description Updates the gameobject's position by the velocity. Sets velocity to 0 on every tick.
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick(deltaTime)
	 * @since 2.0.0
	 */
	public _update() {
		this.position.x += this.velocity.x * this.game.smoothDeltaTime;
		this.position.y += this.velocity.y * this.game.smoothDeltaTime;

		// float
		this.position.x += this.floatVelocity.x * this.game.smoothDeltaTime;
		this.position.y += this.floatVelocity.y * this.game.smoothDeltaTime;

		// clamp to bounds
		this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
		this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);

		// set to none
		this.velocity.x = 0;
		this.velocity.y = 0;

		// don't round pixels for particles
	}

	/**
	 * @memberof Particle
	 * @description Sets the particle's image src. Only works if particle's shape was initially 'sprite'
	 * @param {string} imagePath Image path
	 * @since 1.0.0-beta
	 */
	public setImagePath(imagePath: string) {
		this.texture.setImagePath(imagePath);
	}
}
