// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html

/* 

TODO

CREATE RECT TO RECT COLLISION RESPONSE

*/

import { Duck } from '../../index';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';

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
			if (otherShape.shape == 'rect' || otherShape.shape == 'roundrect') {
				this.collideRectangle(otherShape as Rect);
			}

			if (otherShape.shape == 'circle') {
				if (this.collideCircle(otherShape as Circle)) {
					this.resolveCircle(otherShape as Circle);
				}
			}
		});
	}

	private collideRectangle(rect: Rect) {
		let rectCX = rect.x + rect.w * 0.5;
		let rectCY = rect.y + rect.h * 0.5;

		let thisCX = this.shape.x + this.shape.w * 0.5;
		let thisCY = this.shape.y + this.shape.h * 0.5;

		var dx = rectCX - thisCX; // x difference between centers
		var dy = rectCY - thisCY; // y difference between centers
		var aw = (rect.w + this.shape.w) * 0.5; // average width
		var ah = (rect.h + this.shape.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.shape.w) > Math.abs(dy / this.shape.h)) {
			if (dx < 0) this.shape.x = rect.x + rect.w;
			// left
			else this.shape.x = rect.x - rect.w; // right
		} else {
			if (dy < 0) this.shape.y = rect.y + rect.h;
			// top
			else this.shape.y = rect.y - rect.h; // bottom
		}

		return true;
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
