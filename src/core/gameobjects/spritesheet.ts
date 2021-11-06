/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Animation from '../animation/animation';
import AnimationManager from '../animation/animationManager';
import Game from '../game';
import Scene from '../scene';
import GameObject from './gameObject';

/**
 * @class SpriteSheet
 * @classdesc Creates a DuckEngine SpriteSheet
 * @description The SpriteSheet Class. Represents a image with multiple frames
 * @since 1.0.0-beta
 */
export default class SpriteSheet extends GameObject<'image'> {
	protected frameWidth: number;
	protected frameHeight: number;

	protected rows: number;
	protected cols: number;
	public currentRow: number;
	public currentCol: number;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected animationInterval: any | undefined;

	public anims: AnimationManager;
	public defaultAnim: Animation;

	/**
	 * @memberof SpriteSheet
	 * @description Creates a SpriteSheet instance
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {string} textureKey The key of the preloaded texture used from Scene.loader.loadImage(path, key)
	 * @param {number} frameWidth How wide one frame is
	 * @param {number} frameHeight How tall one frame is
	 * @param {number} rows How many rows are there in the image
	 * @param {number} cols How many columns are there in the image
	 * @param {number} currentRow The initial row to set it to
	 * @param {number} currentCol The initial column to set it to
	 * @param {Game} game Game instance
	 * @since 1.0.0
	 */
	constructor(
		x: number,
		y: number,
		textureKey: string,
		frameWidth: number,
		frameHeight: number,
		rows: number,
		cols: number,
		currentRow: number,
		currentCol: number,
		game: Game,
		scene: Scene
	) {
		super(
			'spritesheet',
			x,
			y,
			frameWidth,
			frameHeight,
			0,
			scene.loader.imageStack.find((t) => t.key === textureKey)!.value,
			game,
			scene
		);
		this.init(this);

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
					col: this.currentCol,
					row: this.currentRow,
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
	 * @description Draws the spritesheet.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.drawImage(
				this.texture.texture, // image
				(this.currentCol - 1) * this.frameWidth, // source x
				(this.currentRow - 1) * this.frameHeight, // source y
				this.frameWidth, // source width
				this.frameHeight, // source height
				this.position.x, // target x
				this.position.y, // target y
				this.frameWidth, // target width
				this.frameHeight // target height
			);
		}
	}
}
