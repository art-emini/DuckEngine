/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Duck } from '../../index';
import randomInt from '../../utils/randomInt';
import Game from '../game';
import Collider from '../physics/collider';

export default class GameObject {
	public readonly id: number;
	public readonly shape: Duck.Collider.ShapeString;
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public r: number;
	public fillColor: string;
	protected game: Game;
	private self: Duck.GameObject | undefined;

	protected halfW: number;
	protected halfH: number;

	private rotAngle: number;

	public collider: Collider | undefined;
	public collidesWith: Duck.GameObject[];
	public vx: number;
	public vy: number;

	// methods
	public physics: {
		addCollider: (collidesWith: Duck.GameObject[]) => Collider;
	};

	constructor(
		shape: Duck.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		this.id = randomInt(0, 100000);
		this.shape = shape;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.fillColor = fillColor;
		this.self;
		this.game = game;

		this.halfW = this.w / 2;
		this.halfH = this.h / 2;

		this.rotAngle = 0;

		this.collider;
		this.collidesWith = [];
		this.vx = 0;
		this.vy = 0;

		// methods
		this.physics = {
			addCollider: (collidesWith: Duck.GameObject[]) => {
				this.collidesWith = collidesWith;

				this.collider = new Collider(
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.self!,
					collidesWith,
					this.game
				);

				return this.collider;
			},
		};

		// fix
		if (this.game.ctx) {
			this.game.ctx.globalCompositeOperation = 'source-over';
		}
	}

	protected init(self: Duck.GameObject) {
		this.self = self;
	}

	public draw() {}

	public setScale(scale: Duck.Misc.Scale | number) {
		if (typeof scale !== 'number') {
			if (scale.width) {
				this.w = scale.width;
				this.halfW = this.w / 2;
			}

			if (scale.height) {
				this.h = scale.height;
				this.halfH = this.h / 2;
			}
		} else {
			this.r = scale;
		}
	}

	public setVelocity(axis: 'x' | 'y', v: number) {
		if (axis === 'x') {
			this.vx = v;
			this.x += this.vx;
		}

		if (axis === 'y') {
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
		if (this.shape === 'circle') {
			return this.y + this.r;
		} else {
			return this.y + this.h / 2;
		}
	}

	public getCenterX() {
		if (this.shape === 'circle') {
			return this.x + this.r;
		} else {
			return this.x + this.w / 2;
		}
	}
}
