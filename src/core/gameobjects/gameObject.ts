/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Duck } from '../../index';
import randomInt from '../math/randomInt';
import Game from '../game';
import Collider from '../physics/collider';
import Vector2 from '../math/vector2';

export default class GameObject {
	public readonly id: number;
	public readonly shape: Duck.Types.Collider.ShapeString;
	public position: Vector2;
	public w: number;
	public h: number;
	public r: number;
	public fillColor: string;
	protected game: Game;
	private self: Duck.GameObjects.GameObject | undefined;

	protected halfW: number;
	protected halfH: number;

	public collider: Collider | undefined;
	public collidesWith: Duck.GameObjects.GameObject[];
	public velocity: Vector2;

	// methods
	public physics: {
		addCollider: (collidesWith: Duck.GameObjects.GameObject[]) => Collider;
	};

	constructor(
		shape: Duck.Types.Collider.ShapeString,
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
		this.position = new Vector2(x, y);
		this.w = w;
		this.h = h;
		this.r = r;
		this.fillColor = fillColor;
		this.self;
		this.game = game;

		this.halfW = this.w / 2;
		this.halfH = this.h / 2;

		this.collider;
		this.collidesWith = [];
		this.velocity = Vector2.ZERO;

		// methods
		this.physics = {
			addCollider: (collidesWith: Duck.Types.GameObject[]) => {
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

	protected init(self: Duck.Types.GameObject) {
		this.self = self;
	}

	public draw() {}

	public _update() {
		(this.position.x += this.velocity.x) * this.game.deltaTime;
		(this.position.y += this.velocity.y) * this.game.deltaTime;

		// set to none
		this.velocity.x = 0;
		this.velocity.y = 0;
	}

	public setScale(scale: Duck.Types.Misc.Scale | number) {
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
			this.velocity.x = v;
		}

		if (axis === 'y') {
			this.velocity.y = v;
		}

		// normalize vector
		this.velocity.normalize();
	}

	public setFillColor(fillColor: string) {
		this.fillColor = fillColor;
	}

	// position methods

	public getTop() {
		return this.position.y;
	}

	public getBottom() {
		return this.position.y + this.h;
	}

	public getLeft() {
		return this.position.x;
	}

	public getRight() {
		return this.position.x + this.w;
	}

	public getCenterY() {
		if (this.shape === 'circle') {
			return this.position.y + this.r;
		} else {
			return this.position.y + this.h / 2;
		}
	}

	public getCenterX() {
		if (this.shape === 'circle') {
			return this.position.x + this.r;
		} else {
			return this.position.x + this.w / 2;
		}
	}
}
