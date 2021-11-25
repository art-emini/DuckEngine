import { Duck } from '../../index';
import convertColorToRGBA from '../../helper/color/convertColorToRGBA';
import Debug from '../debug/debug';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';
import Texture from '../models/texture';
import Scene from '../scene';

/**
 * @class StaticLight
 * @classdesc Creates a DuckEngine StaticLight
 * @description The StaticLight Class. A static light
 * @extends GameObject<'color'>
 * @since 1.0.0-beta
 */
export default class StaticLight extends GameObject<'color'> {
	protected color: string;
	protected alpha: Duck.Types.Helper.AlphaRange;

	/**
	 * @constructor StaticLight
	 * @description Creates an instance of a StaticLight
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} r Radius
	 * @param {string} fillColor Color
	 * @param {Duck.Types.Helper.AlphaRange} alpha Alpha
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		alpha: Duck.Types.Helper.AlphaRange,
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
		this.r = r;
		this.alpha = alpha;
		this.game = game;

		this.visible = true;
		this.zIndex = 2;

		this.color = fillColor;

		// convert all colors to RGBA
		this.color = convertColorToRGBA(this.color, this.alpha);

		this.texture.texture = this.color;
	}

	/**
	 * @description Draws the StaticLight.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.setBlendMode('lighten');
			this.game.renderer.drawCircle(
				this.position.x,
				this.position.y,
				this.r,
				this.texture.texture
			);
			this.game.renderer.setBlendMode('source-over');
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}

	/**
	 * @memberof StaticLight
	 * @description Sets the fillColor with alpha
	 * @param  {string} color Fill Color
	 * @param  {Duck.Types.Helper.AlphaRange} alpha Alpha
	 * @since 2.0.0
	 */
	public setFillColorAlpha(
		color: string,
		alpha: Duck.Types.Helper.AlphaRange
	) {
		this.color = convertColorToRGBA(color, alpha);
	}
}
