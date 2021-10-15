import Game from '../game';
import { Duck } from '../../index';
import Debug from '../debug/debug';
import GameObject from './gameObject';

/**
 * @class Sprite
 * @classdesc Creates a DuckEngine Sprite
 * @description The Sprite Class. Represents a gameobject image
 * @since 1.0.0-beta
 */
export default class Sprite extends GameObject {
	public image: HTMLImageElement;
	public path: string;

	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		imgpath: string,
		game: Game
	) {
		super('sprite', x, y, w, h, 0, imgpath, game);
		this.init(this);

		this.path = imgpath;

		this.image = new Image();
		this.image.src = this.path;

		this.w = w;
		this.h = h;
	}

	/**
	 * @description Draws the sprite.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.drawImage(
				this.image,
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

	/**
	 * @memberof Sprite
	 * @description Sets the scale of the Sprite
	 * @param {Duck.Types.Misc.Scale|number} scale
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale) {
		if (scale.width) {
			this.w = scale.width;
			this.halfW = this.w / 2;
		}

		if (scale.height) {
			this.h = scale.height;
			this.halfH = this.h / 2;
		}
	}

	/**
	 * @memberof Sprite
	 * @description Sets the image path of the sprite
	 * @param {string} imgpath Image Path
	 * @since 1.0.0-beta
	 */
	public setImagePath(imgpath: string) {
		this.path = imgpath;
		this.image.src = this.path;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public setFillColor(color: string) {
		new Debug.Warn(
			'Cannot fill color of a sprite. Changed the image path instead. Use setImagePath instead.'
		);
	}

	/**
	 * @memberof Sprite
	 * @description Applies a filter to the Sprite image
	 * @param {'lightness'} filter Filter, 'lightness'
	 * @param {number} value Value
	 * @since 1.0.0-beta
	 */
	public applyFilter(filter: 'lightness', value: number) {
		if (this.game.ctx) {
			if (filter === 'lightness') {
				const id = this.game.ctx.getImageData(
					this.position.x,
					this.position.y,
					this.w,
					this.h
				);
				const data = id.data;

				for (let i = 0; i < data.length; i++) {
					const red = data[i];
					const green = data[i + 1];
					const blue = data[i + 2];

					const brightenedRed = value * red;
					const brightenedGreen = value * green;
					const brightenedBlue = value * blue;

					data[i] = brightenedRed;
					data[i + 1] = brightenedGreen;
					data[i + 2] = brightenedBlue;
				}

				this.game.ctx.putImageData(
					id,
					this.position.x,
					this.position.y
				);
			}
		}
	}
}
