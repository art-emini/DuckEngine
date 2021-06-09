import Game from '../game';
import { Duck } from '../../index';
import Collider from '../physics/collider';
import Debug from '../debug/debug';

export default class Sprite {
	public readonly shape: Duck.Collider.ShapeString;
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public halfW: number;
	public halfH: number;
	private game: Game;

	private rotAngle: number;
	private movingDir: 'up' | 'down' | 'left' | 'right' | 'none';

	private path: string;
	private image: HTMLImageElement;

	private collider: Collider | undefined;
	private collidesWith: Duck.GameObject[];
	public vx: number;
	public vy: number;

	// methods
	public physics: {
		addCollider: (collidesWith: Duck.GameObject[]) => Collider;
		limitToBounds: (x: number, y: number, w: number, h: number) => void;
	};

	constructor(
		x: number,
		y: number,
		imgpath: string,
		game: Game,
		w?: number,
		h?: number
	) {
		this.shape = 'rect';
		this.x = x;
		this.y = y;
		this.path = imgpath;
		this.game = game;

		this.image = new Image();
		this.image.src = this.path;

		this.w = w || this.image.width;
		this.h = h || this.image.height;
		this.halfW = this.image.width / 2;
		this.halfH = this.image.height / 2;

		// more props
		this.movingDir = 'none';
		this.rotAngle = 0;
		this.vx = 0;
		this.vy = 0;

		this.collider;
		this.collidesWith = [];

		// methods
		this.physics = {
			addCollider: (collidesWith: Duck.GameObject[]) => {
				this.collidesWith = collidesWith;
				this.collider = new Collider('rect', this, this.game);
				return this.collider;
			},
			limitToBounds: (x: number, y: number, w: number, h: number) => {},
		};
	}

	public draw() {
		if (this.game.ctx) {
			this.game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
			if (this.collider) {
				this.collider.update(this, this.collidesWith);
			}
		} else {
			console.error(
				'DuckEngine Error : CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}

	public setScale(scale: Duck.Misc.Scale) {
		if (scale.width) {
			this.w = scale.width;
			this.image.width = this.w;
			this.halfW = this.image.width / 2;
		}

		if (scale.height) {
			this.h = scale.height;
			this.image.height = this.h;
			this.halfH = this.image.height / 2;
		}
	}

	public setImagePath(imgpath: string) {
		this.path = imgpath;
		this.image.src = this.path;
	}

	public setVelocity(axis: 'x' | 'y', v: number) {
		if (axis == 'x') {
			this.vx = v;
			this.x += this.vx;
		}

		if (axis == 'y') {
			this.vy = v;
			this.y += this.vy;
		}
	}

	// position methods

	public getTop() {
		return this.y;
	}

	public getBottom() {
		return this.y + this.h;
	}

	public getLeft() {
		return this.x;
	}

	public getRight() {
		return this.x + this.w;
	}

	public getCenterY() {
		return this.y + this.h / 2;
	}

	public getCenterX() {
		return this.x + this.w / 2;
	}
}
