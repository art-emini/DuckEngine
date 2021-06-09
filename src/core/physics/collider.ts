// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html

/* 

TODO

CREATE RECT TO RECT COLLISION RESPONSE

*/

import { Duck } from '../../index';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';

export default class Collider {
	public readonly shapeType: string;
	public shape: Duck.GameObject;
	private game: Game;

	constructor(
		shapeType: Duck.Collider.ShapeString,
		shape: Duck.GameObject,
		game: Game
	) {
		this.shapeType = shapeType;
		this.shape = shape;
		this.game = game;
	}

	public update(shape: Duck.GameObject, otherShapes: Duck.GameObject[]) {
		this.shape = shape;
		otherShapes.forEach((otherShape) => {
			if (otherShape.shape == 'rect') {
				if (this.collideRect(otherShape as Rect)) {
					this.resolveRect(otherShape as Rect);
				}
			}

			if (otherShape.shape == 'circle') {
				if (this.collideCircle(otherShape as Circle)) {
					this.resolveCircle(otherShape as Circle);
				}
			}
		});
	}

	private collideRect(rect: Rect) {
		let l1 = (this.shape as Rect).getLeft();
		let t1 = (this.shape as Rect).getTop();
		let r1 = (this.shape as Rect).getRight();
		let b1 = (this.shape as Rect).getBottom();

		let l2 = rect.getLeft();
		let t2 = rect.getTop();
		let r2 = rect.getRight();
		let b2 = rect.getBottom();

		// not colliding
		if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
			return false;
		}

		// collides
		return true;
	}

	private resolveRect(rect: Rect) {
		let l1 = (this.shape as Rect).getLeft();
		let t1 = (this.shape as Rect).getTop();
		let r1 = (this.shape as Rect).getRight();
		let b1 = (this.shape as Rect).getBottom();

		let l2 = rect.getLeft();
		let t2 = rect.getTop();
		let r2 = rect.getRight();
		let b2 = rect.getBottom();

		// bottom
		if (b1 > t2) {
			(this.shape as Rect).y = rect.y;
		}

		// top
		if (t1 < b2) {
			(this.shape as Rect).y = rect.y + rect.h;
		}

		// right
		if (r1 > l2) {
			(this.shape as Rect).x = rect.x;
		}

		// left
		if (l1 < r2) {
			(this.shape as Rect).x = rect.x + rect.w;
		}
	}

	private collideCircle(circle2: Circle) {
		/* first we get the x and y distance between the two circles. */
		let distance_x = this.shape.x - circle2.x;
		let distance_y = this.shape.y - circle2.y;
		/* Then we get the sum of their radii. */
		let radii_sum = (this.shape as Circle).r + circle2.r;

		/* Then we test to see if the square of their distance is greater than the
        square of their radii. If it is, then there is no collision. If it isn't,
        then we have a collision. */
		if (
			distance_x * distance_x + distance_y * distance_y <=
			radii_sum * radii_sum
		)
			return true;

		return false;
	}

	private resolveCircle(c2: Circle) {
		let distance_x = this.shape.x - c2.x;
		let distance_y = this.shape.y - c2.y;
		let radii_sum = (this.shape as Circle).r + c2.r;
		let length =
			Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
		let unit_x = distance_x / length;
		let unit_y = distance_y / length;

		this.shape.x = c2.x + (radii_sum + 1) * unit_x;
		this.shape.y = c2.y + (radii_sum + 1) * unit_y;
	}
}
