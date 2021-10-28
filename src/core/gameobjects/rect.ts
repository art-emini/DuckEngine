import Game from '../game';
import Debug from '../debug/debug';
import GameObject from './gameObject';
import Texture from '../models/texture';

/**
 * @class Rect
 * @classdesc Creates a DuckEngine Rect
 * @description The Rect Class. Represents a rectangle
 * @since 1.0.0-beta
 */
export default class Rect extends GameObject<'color'> {
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		fillColor: string,
		game: Game
	) {
		super('rect', x, y, w, h, 0, Texture.fromColor(fillColor, w, h), game);
		this.init(this);
	}

	/**
	 * @description Draws the rect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.fillStyle = this.texture.texture;
			this.game.ctx.fillRect(
				this.position.x,
				this.position.y,
				this.w,
				this.h
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}
}
