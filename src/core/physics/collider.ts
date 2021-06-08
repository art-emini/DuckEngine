// rect collision physics from https://developer.ibm.com/languages/javascript/tutorials/wa-build2dphysicsengine/
// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html

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
				if (this.collideRect(otherShape)) {
					this.resolveRect(otherShape);
				}
			}
		});
	}

	public collideRect(shape2: Duck.GameObject) {
		if (shape2 instanceof Rect && this.shape instanceof Rect) {
			let l1 = this.shape.getLeft();
			let t1 = this.shape.getTop();
			let r1 = this.shape.getRight();
			let b1 = this.shape.getBottom();

			let l2 = shape2.getLeft();
			let t2 = shape2.getTop();
			let r2 = shape2.getRight();
			let b2 = shape2.getBottom();

			// not colliding
			if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
				return false;
			}

			// collides
			return true;
		}
	}

	public resolveRect(entity: Duck.GameObject) {
		if (entity instanceof Rect && this.shape instanceof Rect) {
			let abs = Math.abs;

			// Find the mid points of the entity and player
			let pMidX = this.shape.getCenterX();
			let pMidY = this.shape.getCenterY();
			let aMidX = entity.getCenterX();
			let aMidY = entity.getCenterY();

			// To find the side of entry calculate based on
			// the normalized sides
			let dx = (aMidX - pMidX) / entity.halfW;
			let dy = (aMidY - pMidY) / entity.halfH;

			// Calculate the absolute change in x and y
			let absDX = abs(dx);
			let absDY = abs(dy);

			// If the distance between the normalized x and y
			// position is less than a small threshold (.1 in this case)
			// then this object is approaching from a corner
			if (abs(absDX - absDY) < 0.1) {
				// If the player is approaching from positive X
				if (dx < 0) {
					// Set the player x to the right side
					this.shape.x = entity.getRight();

					// If the player is approaching from negative X
				} else {
					// Set the player x to the left side
					this.shape.x = entity.getLeft() - this.shape.w;
				}

				// If the player is approaching from positive Y
				if (dy < 0) {
					// Set the player y to the bottom
					this.shape.y = entity.getBottom();

					// If the player is approaching from negative Y
				} else {
					// Set the player y to the top
					this.shape.y = entity.getTop() - this.shape.h;
				}
			}
		}
	}

	public collideCircle(circle2: Duck.GameObject) {
		if (circle2 instanceof Circle && this.shape instanceof Circle) {
			/* first we get the x and y distance between the two circles. */
			let distance_x = this.shape.x - circle2.x;
			let distance_y = this.shape.y - circle2.y;
			/* Then we get the sum of their radii. */
			let radii_sum = this.shape.r + circle2.r;

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
	}

	public resolveCircle(c2: Duck.GameObject) {
		if (c2 instanceof Circle && this.shape instanceof Circle) {
			let distance_x = this.shape.x - c2.x;
			let distance_y = this.shape.y - c2.y;
			let radii_sum = this.shape.r + c2.r;
			let length =
				Math.sqrt(distance_x * distance_x + distance_y * distance_y) ||
				1;
			let unit_x = distance_x / length;
			let unit_y = distance_y / length;

			this.shape.x = c2.x + (radii_sum + 1) * unit_x;
			this.shape.y = c2.y + (radii_sum + 1) * unit_y;
		}
	}
}
