/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
	public scene: Scene;

	private frameWidth: number;
	private frameHeight: number;

	private rows: number;
	private cols: number;
	public currentRow: number;
	public currentCol: number;

	public animating: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private animationInterval: any | undefined;

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
			game
		);
		this.init(this);

		this.scene = scene;

		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;

		this.rows = rows;
		this.cols = cols;

		this.currentRow = currentRow;
		this.currentCol = currentCol;

		this.animating = false;
		this.animationInterval;
	}

	/**
	 * @memberof SpriteSheet
	 * @description Changes the current column to the next
	 * @since 1.0.0
	 */
	public nextCol() {
		if (this.currentCol < this.cols) {
			this.currentCol += 1;
		}
	}

	/**
	 * @memberof SpriteSheet
	 * @description Changes the current row to the next
	 * @since 1.0.0
	 */
	public nextRow() {
		if (this.currentRow < this.rows) {
			this.currentRow += 1;
		}
	}

	/**
	 * @memberof SpriteSheet
	 * @description Stops the animation
	 * @since 1.0.0
	 */
	public startAnimation() {
		this.animating = true;
	}

	/**
	 * @memberof SpriteSheet
	 * @description Animates the spritesheet
	 * @param {number} fps Frames per second
	 * @param {boolean} [switchRowOnEnd] Determines if there is no column next to switch the row to the next
	 * @since 1.0.0
	 */
	public animate(fps: number, switchRowOnEnd?: boolean) {
		this.animationInterval = setInterval(() => {
			if (this.animating) {
				this.nextCol();

				if (this.currentCol === this.cols && !switchRowOnEnd) {
					this.currentCol = 1; // draw subtracts one so it equals 0
				}

				if (this.currentCol === this.cols && switchRowOnEnd) {
					this.currentCol = 1; // draw subtracts one so it equals 0
					this.nextRow();
				}
			}
		}, 1000 / fps);
	}

	/**
	 * @memberof SpriteSheet
	 * @description Animates the spritesheet for a duration
	 * @param {number} fps Frames per second
	 * @param {number} timeMS Duration in milliseconds
	 * @param {boolean} [switchRowOnEnd] Determines if there is no column next to switch the row to the next
	 * @since 1.0.0
	 */
	public animateFor(fps: number, timeMS: number, switchRowOnEnd?: boolean) {
		this.animate(fps, switchRowOnEnd);
		setTimeout(() => {
			this.stopAnimation();
		}, timeMS);
	}

	/**
	 * @memberof SpriteSheet
	 * @description Animates the spritesheet in between frames
	 * @param {number} fps Frames per second
	 * @param {number} col Start column
	 * @param {number} row Start row
	 * @param {number} stopCol End column
	 * @param {number} stopRow End row
	 * @param {boolean} [switchRowOnEnd] Determines if there is no column next to switch the row to the next
	 * @since 1.0.0
	 */
	public animateFrames(
		fps: number,
		col: number,
		row: number,
		stopCol: number,
		stopRow: number,
		switchRowOnEnd?: boolean
	) {
		this.currentCol = col;
		this.currentRow = row;

		this.animationInterval = setInterval(() => {
			if (this.animating) {
				if (this.currentCol !== stopCol) {
					this.nextCol();

					if (this.currentCol === stopCol && !switchRowOnEnd) {
						this.currentCol = stopCol; // draw subtracts one so it equals 0
					}

					if (this.currentCol === this.cols && switchRowOnEnd) {
						if (this.currentRow !== stopRow) {
							this.nextRow();
						} else {
							this.currentCol = stopCol; // draw subtracts one so it equals 0
						}
					}
				} else {
					this.stopAnimation();
				}
			}
		}, 1000 / fps);
	}

	/**
	 * @memberof SpriteSheet
	 * @description Animates the spritesheet with no set fps, works only with a being called in any loop
	 * @param {boolean} [switchRowOnEnd] Determines if there is no column next to switch the row to the next
	 * @since 1.0.0
	 */
	public animateNoFPS(switchRowOnEnd?: boolean) {
		if (this.animating) {
			this.nextCol();

			if (this.currentCol === this.cols && !switchRowOnEnd) {
				this.currentCol = 1; // draw subtracts one so it equals 0
			}

			if (this.currentCol === this.cols && switchRowOnEnd) {
				this.currentCol = 1; // draw subtracts one so it equals 0
				this.nextRow();
			}
		}
	}

	/**
	 * @memberof SpriteSheet
	 * @description Stops the animation
	 * @since 1.0.0
	 */
	public stopAnimation() {
		this.animating = false;

		if (this.animationInterval !== undefined) {
			clearInterval(this.animationInterval);
		}
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
