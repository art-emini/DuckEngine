import { Duck } from '../../index';
import Game from '../game';
import Vector2 from '../math/vector2';
import GameObject from '../gameobjects/gameObject';

/**
 * @class Raycast
 * @classdesc Creates a DuckEngine Raycast
 * @description The Raycast Class. Creates a Raycast that can be used to test for collisions
 * @extends GameObject
 * @since 2.0.0
 */
export default class Raycast {
	public game: Game;

	protected state: Duck.Types.Raycast.State;

	/**
	 * @memberof Raycast
	 * @description The start position of the Raycast
	 * @type Vector2
	 * @since 2.0.0
	 */

	public position: Vector2;
	/**
	 * @memberof Raycast
	 * @description The end position of the Raycast
	 * @type Vector2
	 * @since 2.0.0
	 */
	public positionEnd: Vector2;

	/**
	 * @constructor
	 * @description Creates a Raycast instance.
	 * @param {Vector2} begin Start position Vector2 of raycast
	 * @param {Vector2} end End position Vector2 of raycast
	 * @param {Scene} scene Scene instance
	 * @param {Game} game Game instance
	 */
	constructor(begin: Vector2, end: Vector2, game: Game) {
		this.game = game;

		this.position = begin;
		this.positionEnd = end;

		this.state = {
			colliding: false,
			collidingTop: false,
			collidingBottom: false,
			collidingLeft: false,
			collidingRight: false,
		};
	}

	/**
	 * @memberof Raycast
	 * @description Draws a line representing the raycast, purely for debug
	 * @param {string} lineColor Line color
	 * @param {number} lineWidth Line width
	 * @since 2.0.0
	 */
	public show(lineColor: string, lineWidth: number) {
		// set line stroke and line width
		this.game.ctx.strokeStyle = lineColor;
		this.game.ctx.lineWidth = lineWidth;

		// draw a red line
		this.game.ctx.beginPath();
		this.game.ctx.moveTo(this.position.x, this.position.y);
		this.game.ctx.lineTo(this.positionEnd.x, this.positionEnd.y);
		this.game.ctx.stroke();
	}

	/**
	 * @memberof Raycast
	 * @description Casts the ray from the passed begin and to the end Vector2, sets state based on if intersecting or not
	 * @param {GameObject<Duck.Types.Texture.Type>[]} objects Objects to check if intersecting with
	 * @since 2.0.0
	 */
	public cast(objects: GameObject<Duck.Types.Texture.Type>[]) {
		objects.forEach((object) => {
			if (object.shape !== 'circle') {
				this.checkIntersectingRect(
					this.positionEnd.x,
					this.positionEnd.y,
					this.position.x,
					this.position.y,
					object.position.x,
					object.position.y,
					object.w,
					object.h,
					object
				);
			} else {
				// circle's x and y are in the center
				// get correct x and y
				const objX = object.position.x - object.r;
				const objY = object.position.y - object.r;

				const diameter = object.r * 2;

				this.checkIntersectingRect(
					this.positionEnd.x,
					this.positionEnd.y,
					this.position.x,
					this.position.y,
					objX,
					objY,
					diameter,
					diameter,
					object
				);
			}
		});
	}

	protected checkIntersectingRect(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		rx: number,
		ry: number,
		rw: number,
		rh: number,
		obj: GameObject<Duck.Types.Texture.Type>
	) {
		const left = this.isIntersectingLine(
			x1,
			y1,
			x2,
			y2,
			rx,
			ry,
			rx,
			ry + rh,
			obj
		);
		const right = this.isIntersectingLine(
			x1,
			y1,
			x2,
			y2,
			rx + rw,
			ry,
			rx + rw,
			ry + rh,
			obj
		);
		const top = this.isIntersectingLine(
			x1,
			y1,
			x2,
			y2,
			rx,
			ry,
			rx + rw,
			ry,
			obj
		);
		const bottom = this.isIntersectingLine(
			x1,
			y1,
			x2,
			y2,
			rx,
			ry + rh,
			rx + rw,
			ry + rh,
			obj
		);

		// set states
		this.state.collidingLeft = left;
		this.state.collidingRight = right;
		this.state.collidingTop = top;
		this.state.collidingBottom = bottom;

		// if any of the above are true, the ray is intersecting
		if (left || right || top || bottom) {
			this.state.colliding = left || right || top || bottom;
			return true;
		}
		this.state.colliding = false;
		return false;
	}

	protected isIntersectingLine(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		x4: number,
		y4: number,
		obj: GameObject<Duck.Types.Texture.Type>
	) {
		const uA =
			((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
			((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

		const uB =
			((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
			((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

		// if uA and uB are between 0-1, lines are colliding
		if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
			const intersectionX = x1 + uA * (x2 - x1);
			const intersectionY = y1 + uA * (y2 - y1);

			return this.createStateValue(intersectionX, intersectionY, obj);
		} else {
			return false;
		}
	}

	protected createStateValue(
		x: number,
		y: number,
		obj: GameObject<Duck.Types.Texture.Type>
	): Duck.Types.Raycast.StateValue {
		return {
			intersection: new Vector2(x, y),
			with: obj,
		};
	}

	public setPosition(begin: Vector2, end?: Vector2) {
		this.position.setValuesVec(begin);
		if (end) {
			this.positionEnd.setValuesVec(end);
		}
	}

	/**
	 * @memberof Raycast
	 * @description Returns the Raycast intersecting state
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isIntersecting() {
		return this.state.colliding;
	}

	/**
	 * @memberof Raycast
	 * @description Returns the Raycast intersecting top state
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isIntersectingTop() {
		return this.state.collidingTop;
	}

	/**
	 * @memberof Raycast
	 * @description Returns the Raycast intersecting bottom state
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isIntersectingBottom() {
		return this.state.collidingBottom;
	}

	/**
	 * @memberof Raycast
	 * @description Returns the Raycast intersecting left state
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isIntersectingLeft() {
		return this.state.collidingLeft;
	}

	/**
	 * @memberof Raycast
	 * @description Returns the Raycast intersecting right state
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isIntersectingRight() {
		return this.state.collidingRight;
	}
}
