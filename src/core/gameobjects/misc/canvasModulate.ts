import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Texture from '../../models/texture';
import Scene from '../../scene';
import GameObject from '../gameObject';

/**
 * @class CanvasModulate
 * @classdesc Creates a DuckEngine CanvasModulate GameObject
 * @description The CanvasModulate Class. A large rectangle with a special zIndex to use as a background, works with lights
 * @extends GameObject
 * @since 2.0.0
 */
export default class CanvasModulate extends GameObject<'color'> {
	/**
	 * @constructor CanvasModulate
	 * @description Creates a CanvasModulate instance.
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {string} fillColor Color to fill the CanvasModulate with
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		fillColor: string,
		game: Game,
		scene: Scene
	) {
		super(
			'rect',
			x,
			y,
			w,
			h,
			0,
			Texture.fromColor(fillColor, w, h),
			game,
			scene
		);

		this.zIndex = Duck.Layers.Rendering.zIndex.canvasModulate;
	}

	/**
	 * @description Draws the CanvasModulate gameobject.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.drawRect(
				this.position.x,
				this.position.y,
				this.w,
				this.h,
				this.texture.texture
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}
}
