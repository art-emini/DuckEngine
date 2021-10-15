import Debug from '../debug/debug';
import Game from '../game';

import GameObject from './gameObject';

/**
 * @class RoundRect
 * @classdesc Creates a DuckEngine GameObject
 * @description The RoundRect Class. Represents a smooth cornered rect
 * @since 1.0.0-beta
 */
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

	/**
	 * @description Draws the roundrect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			if (this.w < 2 * this.r) this.r = this.w / 2;
			if (this.h < 2 * this.r) this.r = this.h / 2;
			this.game.ctx.fillStyle = this.fillColor;
			this.game.ctx.beginPath();
			this.game.ctx.moveTo(this.position.x + this.r, this.position.y);
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
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined as Canvas is undefined.'
			);
		}
	}
}
