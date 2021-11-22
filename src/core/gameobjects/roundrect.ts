import Debug from '../debug/debug';
import Game from '../game';
import Texture from '../models/texture';
import Scene from '../scene';

import GameObject from './gameObject';

/**
 * @class RoundRect
 * @classdesc Creates a DuckEngine GameObject
 * @description The RoundRect Class. Represents a smooth cornered rect
 * @since 1.0.0-beta
 */
export default class RoundRect extends GameObject<'color'> {
	/**
	 * @constructor RoundRect
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of RoundRect
	 * @param {number} h Height of RoundRect
	 * @param {number} r Radius of RoundRect
	 * @param {string} fillColor Fill Color of RoundRect
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColor: string,
		game: Game,
		scene: Scene
	) {
		super(
			'roundrect',
			x,
			y,
			w,
			h,
			r,
			Texture.fromColor(fillColor, w, h),
			game,
			scene
		);
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
			this.game.ctx.fillStyle = this.texture.texture;
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
