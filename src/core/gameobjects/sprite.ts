/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Game from '../game';
import { Duck } from '../../index';
import Debug from '../debug/debug';
import GameObject from './gameObject';
import Scene from '../scene';
import AnimationManager from '../animation/animationManager';
import Animation from '../animation/animation';

/**
 * @class Sprite
 * @classdesc Creates a DuckEngine Sprite
 * @description The Sprite Class. Represents a gameobject image
 * @since 1.0.0-beta
 */
export default class Sprite extends GameObject<'image'> {
	protected frameWidth: number | undefined;
	protected frameHeight: number | undefined;

	protected rows: number | undefined;
	protected cols: number | undefined;

	/**
	 * @memberof Sprite
	 * @description The current row of the spritesheet texture, only if sprite texture is a spritesheet
	 * @type number | undefined
	 * @since 2.0.0
	 */
	public currentRow: number | undefined;

	/**
	 * @memberof Sprite
	 * @description The current column of the spritesheet texture, only if sprite texture is a spritesheet
	 * @type number | undefined
	 * @since 2.0.0
	 */
	public currentCol: number | undefined;

	/**
	 * @memberof Sprite
	 * @description The AnimationManager instance, if the texture is a spritesheet
	 * @type AnimationManager | undefined
	 * @since 2.0.0
	 */
	public anims: AnimationManager | undefined;

	/**
	 * @memberof Sprite
	 * @description The Default Animation instance, if the texture is a spritesheet
	 * @type Animation | undefined
	 * @since 2.0.0
	 */
	public defaultAnim: Animation | undefined;

	/**
	 * @constructor Sprite
	 * @description Creates a Sprite instance
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width of Sprite
	 * @param {number} h Height of Sprite
	 * @param {string} textureKey Key of a preloaded texture
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {number} [frameWidth] Frame Width for spritesheet texture
	 * @param {number} [frameHeight] Frame Height for spritesheet texture
	 * @param {number} [rows] Amount of rows for the spritesheet texture
	 * @param {number} [cols] Amount of columns for the spritesheet texture
	 * @param {number} [currentRow] The default row to use for the spritesheet texture
	 * @param {number} [currentCol] The default column to use for the spritesheet texture
	 * @since 1.0.0-beta
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		textureKey: string,
		game: Game,
		scene: Scene,
		frameWidth?: number,
		frameHeight?: number,
		rows?: number,
		cols?: number,
		currentRow?: number,
		currentCol?: number
	) {
		super(
			'sprite',
			x,
			y,
			w,
			h,
			0,
			scene.loader.imageStack.find((t) => t.key === textureKey)!.value,
			game,
			scene
		);

		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;

		this.rows = rows;
		this.cols = cols;
		this.currentRow = currentRow;
		this.currentCol = currentCol;

		const defaultAnimConfig = {
			key: '__default',
			frameRate: 0,
			frames: [
				{
					col: this.currentCol!,
					row: this.currentRow!,
				},
			],
		};

		this.anims = new AnimationManager(
			this.game,
			this.scene,
			this,
			defaultAnimConfig
		);
		this.defaultAnim = this.anims.get('__default') as Animation;
	}

	/**
	 * @description Draws the sprite.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.drawSprite(
				this.position.x,
				this.position.y,
				this.w,
				this.h,
				this.texture,
				this.frameWidth,
				this.frameHeight,
				this.currentRow,
				this.currentCol
			);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}

	/**
	 * @memberof Sprite
	 * @description Sets the scale of the Sprite
	 * @param {Duck.Types.Misc.Scale|number} scale
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale) {
		if (scale.width) {
			this.w = scale.width;
		}

		if (scale.height) {
			this.h = scale.height;
		}
	}

	/**
	 * @memberof Sprite
	 * @description Sets the image path of the sprite
	 * @param {string} imgpath Image Path
	 * @since 1.0.0-beta
	 */
	public setImagePath(imgpath: string) {
		this.texture.texture.src = imgpath;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public setFillColor(color: string) {
		new Debug.Warn(
			'Cannot fill color of a sprite. Changed the image path instead. Use setImagePath instead.'
		);
	}
}
