import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';
import Collider from '../physics/collider';

export default class RoundRect {
	public readonly shape: Duck.Collider.ShapeString;
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public r: number;
	public fillColor: string;
	public halfW: number;
	public halfH: number;
	private game: Game;

	private rotAngle: number;
	private movingDir: 'up' | 'down' | 'left' | 'right' | 'none';

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
		w: number,
		h: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		this.shape = 'roundrect';
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.fillColor = fillColor;
		this.game = game;

		this.halfW = this.w / 2;
		this.halfH = this.h / 2;

		this.rotAngle = 0;
		this.movingDir = 'none';
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
			if (this.w < 2 * this.r) this.r = this.w / 2;
			if (this.h < 2 * this.r) this.r = this.h / 2;
			this.game.ctx.fillStyle = this.fillColor;
			this.game.ctx.beginPath();
			this.game.ctx.moveTo(this.x + this.r, this.y);
			this.game.ctx.arcTo(
				this.x + this.w,
				this.y,
				this.x + this.w,
				this.y + this.h,
				this.r
			);
			this.game.ctx.arcTo(
				this.x + this.w,
				this.y + this.h,
				this.x,
				this.y + this.h,
				this.r
			);
			this.game.ctx.arcTo(
				this.x,
				this.y + this.h,
				this.x,
				this.y,
				this.r
			);
			this.game.ctx.arcTo(
				this.x,
				this.y,
				this.x + this.w,
				this.y,
				this.r
			);
			this.game.ctx.closePath();
			this.game.ctx.fill();
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined as Canvas is undefined.'
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

	public setFillColor(fillColor: string) {
		this.fillColor = fillColor;
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
