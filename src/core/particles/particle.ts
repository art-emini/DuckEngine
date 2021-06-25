import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';

export default class Particle extends GameObject {
	private image: HTMLImageElement | undefined;

	constructor(
		shape: Duck.Collider.ShapeString,
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

		if (this.shape === 'sprite') {
			this.image = new Image();
			this.image.src = this.fillColor;
		}
	}

	public draw() {
		if (this.game.ctx) {
			switch (this.shape) {
				case 'circle':
					this.game.ctx.beginPath();
					this.game.ctx.arc(
						this.x,
						this.y,
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
					this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
					break;

				case 'roundrect':
					if (this.w < 2 * this.r) this.r = this.w / 2;
					if (this.h < 2 * this.r) this.r = this.h / 2;
					this.game.ctx.fillStyle = this.fillColor;
					this.game.ctx.beginPath();
					this.game.ctx.moveTo(this.x + this.r, this.y);
					this.game.ctx.arcTo(
						this.x + this.w,
						this.y,
						this.x + this.w,
						this.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.x + this.w,
						this.y + this.h,
						this.x,
						this.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.x,
						this.y + this.h,
						this.x,
						this.y,
						this.r
					);
					this.game.ctx.arcTo(
						this.x,
						this.y,
						this.x + this.w,
						this.y,
						this.r
					);
					this.game.ctx.closePath();
					this.game.ctx.fill();
					break;

				case 'sprite':
					if (this.image) {
						this.game.ctx.drawImage(
							this.image,
							this.x,
							this.y,
							this.w,
							this.h
						);
					}

					break;

				default:
					if (this.game.config.debug) {
						new Debug.Warn(
							'Switched Particle shape to "rect". Shape is not a "circle", "rect", "roundrect", or "sprite".'
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
}
