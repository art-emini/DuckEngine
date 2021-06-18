import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';
import Collider from '../physics/collider';
import GameObject from './gameObject';

export default class RoundRect extends GameObject {
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		super('roundrect', x, y, w, h, r, fillColor, game);
	}

	public draw() {
		if (this.game.ctx) {
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
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined as Canvas is undefined.'
			);
		}
	}
}
