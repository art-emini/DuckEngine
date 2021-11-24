import Game from '../game';
import Debug from '../debug/debug';
import GameObject from './gameObject';
import Texture from '../models/texture';
import Scene from '../scene';

/**
 * @class Circle
 * @classdesc Creates a DuckEngine Circle
 * @description The Circle Class. Represents a circle
 * @since 1.0.0-beta
 */
export default class Circle extends GameObject<'color'> {
	/**
	 * @constructor Circle
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} r Radius of Circle
	 * @param {string} fillColor Fill Color of Circle
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		game: Game,
		scene: Scene
	) {
		super(
			'circle',
			x,
			y,
			0,
			0,
			r,
			Texture.fromColor(fillColor, r, r),
			game,
			scene
		);
	}

	/**
	 * @description Draws the circle.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.renderer.drawCircle(
				this.position.x,
				this.position.y,
				this.r,
				this.texture.texture
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}
}
