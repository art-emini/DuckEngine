import Debug from '../../debug/debug';
import Game from '../../game';
import GameObject from '../gameObject';

/**
 * @class CanvasModulate
 * @classdesc Creates a DuckEngine CanvasModulate {@link GameObject}
 * @description The CanvasModulate Class. A large rectangle with a special zIndex to use as a background, works with lights
 * @extends GameObject
 * @since 2.0.0
 */
export default class CanvasModulate extends GameObject {
	/**
	 * @constructor
	 * @description Creates a CanvasModulate instance.
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {string} fillColor Color to fill the CanvasModulate with
	 * @param {Game} game Game instance
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		fillColor: string,
		game: Game
	) {
		super('rect', x, y, w, h, 0, fillColor, game);

		this.zIndex = 1;
	}

	/**
	 * @description Draws the CanvasModulate gameobject.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.fillStyle = this.fillColor;
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
