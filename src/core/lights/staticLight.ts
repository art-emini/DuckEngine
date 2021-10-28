import { Duck } from '../../index';
import convertColorToRGBA from '../../helper/color/convertColorToRGBA';
import Debug from '../debug/debug';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';
import Texture from '../models/texture';

/**
 * @class StaticLight
 * @classdesc Creates a DuckEngine StaticLight
 * @description The StaticLight Class. A static light
 * @since 1.0.0-beta
 */
export default class StaticLight extends GameObject<'color'> {
	public x: number;
	public y: number;
	public r: number;
	protected color: string;
	protected alpha: Duck.Types.Helper.AlphaRange;
	public game: Game;

	public visible: boolean;
	public zIndex: number;

	/**
	 * @constructor
	 * @description Creates an instance of a StaticLight
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} r Radius
	 * @param {string} fillColor Color
	 * @param {Duck.Types.Helper.AlphaRange} alpha Alpha
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		alpha: Duck.Types.Helper.AlphaRange,
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
		this.x = x;
		this.y = y;
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
		if (this.game.ctx) {
			this.game.ctx.globalCompositeOperation = 'lighter';
			this.game.ctx.beginPath();
			this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			this.game.ctx.fillStyle = this.texture.texture;
			this.game.ctx.fill();
			this.game.ctx.globalCompositeOperation = 'source-over';
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
