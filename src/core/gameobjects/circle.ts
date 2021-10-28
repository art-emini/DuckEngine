import Game from '../game';
import Debug from '../debug/debug';
import GameObject from './gameObject';
import Texture from '../models/texture';

/**
 * @class Circle
 * @classdesc Creates a DuckEngine Circle
 * @description The Circle Class. Represents a circle
 * @since 1.0.0-beta
 */
export default class Circle extends GameObject<'color'> {
	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		super(
			'circle',
			x,
			y,
			0,
			0,
			r,
			Texture.fromColor(fillColor, r, r),
			game
		);
		this.init(this);
	}

	/**
	 * @description Draws the circle.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.beginPath();
			this.game.ctx.arc(
				this.position.x,
				this.position.y,
				this.r,
				0,
				2 * Math.PI,
				false
			);
			this.game.ctx.fillStyle = this.texture.texture;
			this.game.ctx.fill();
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}
}
