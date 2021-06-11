import { Duck } from '../../index';
import Game from '../game';
import Collider from '../physics/collider';
import Debug from '../debug/debug';

export default class Circle {
	public readonly shape: Duck.Collider.ShapeString;
	public x: number;
	public y: number;
	public r: number;
	public fillColor: string;
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
		r: number,
		fillColor: string,
		game: Game
	) {
		this.shape = 'circle';
		this.x = x;
		this.y = y;
		this.r = r;
		this.fillColor = fillColor;
		this.game = game;

		this.rotAngle = 0;
		this.movingDir = 'none';

		this.collider;
		this.collidesWith = [];
		this.vx = 0;
		this.vy = 0;

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
			this.game.ctx.beginPath();
			this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			this.game.ctx.fillStyle = this.fillColor;
			this.game.ctx.fill();
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}

	public setScale(r: number) {
		this.r = r;
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

	public getCenterY() {
		return this.y + this.r;
	}

	public getCenterX() {
		return this.x + this.r;
	}
}
