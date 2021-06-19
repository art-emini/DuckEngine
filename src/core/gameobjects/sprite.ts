import Game from '../game';
import { Duck } from '../../index';
import Debug from '../debug/debug';
import GameObject from './gameObject';

export default class Sprite extends GameObject {
	private image: HTMLImageElement;
	private path: string;

	constructor(
		x: number,
		y: number,
		imgpath: string,
		game: Game,
		w?: number,
		h?: number
	) {
		super('sprite', x, y, 0, 0, 0, imgpath, game);
		this.init(this);

		if (w) {
			this.setScale({ width: w });
		}
		if (h) {
			this.setScale({ width: h });
		}

		this.path = imgpath;

		this.image = new Image();
		this.image.src = this.path;

		this.w = w || this.image.width;
		this.h = h || this.image.height;
	}

	public draw() {
		if (this.game.ctx) {
			this.game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}

	public setScale(scale: Duck.Misc.Scale) {
		if (scale.width) {
			this.w = scale.width;
			this.halfW = this.w / 2;
		}

		if (scale.height) {
			this.h = scale.height;
			this.halfH = this.h / 2;
		}
	}

	public setImagePath(imgpath: string) {
		this.path = imgpath;
		this.image.src = this.path;
	}
}
