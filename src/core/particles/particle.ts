import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';
import Vector2 from '../math/vector2';

export default class Particle extends GameObject {
	private image: HTMLImageElement | undefined;

	public floatVelocity: Vector2;

	public age: number;

	constructor(
		shape: Duck.Types.Collider.ShapeString,
		w: number,
		h: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		super(shape, 0, 0, w, h, r, fillColor, game);

		this.w = w;
		this.h = h;
		this.r = r;
		this.fillColor = fillColor;

		this.floatVelocity = Vector2.ZERO;

		if (this.shape === 'sprite') {
			this.image = new Image();
			this.image.src = this.fillColor;
		}

		// age

		this.age = 0;

		setInterval(() => {
			this.age++;
		}, 1000);
	}

	public draw() {
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
					this.game.ctx.fillStyle = this.fillColor;
					this.game.ctx.fill();
					break;

				case 'rect':
					this.game.ctx.fillStyle = this.fillColor;
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
					this.game.ctx.fillStyle = this.fillColor;
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
					if (this.image) {
						this.game.ctx.drawImage(
							this.image,
							this.position.x,
							this.position.y,
							this.w,
							this.h
						);
					}

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

		// float

		(this.position.x += this.floatVelocity.x) * this.game.deltaTime;
		(this.position.y += this.floatVelocity.y) * this.game.deltaTime;
	}

	public setImagePath(imagePath: string) {
		if (this.image) {
			this.image.src = imagePath;
		} else {
			if (this.game.config.debug) {
				new Debug.Warn(
					'Cannot setImagePath to particle. Particle shape is not a sprite.'
				);
			}
		}
	}
}
