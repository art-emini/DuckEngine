// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html
// most of rect physics also from PothOnProgramming

/* 

TODO

CREATE CIRCLE TO RECT COLLISION RESPONSE

*/

import { Duck } from '../../index';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import Sprite from '../gameobjects/sprite';

/**
 * @class Collider
 * @classdesc Creates a DuckEngine Collider
 * @description The Collider Class. Collision Handler and Resolver
 * @since 1.0.0-beta
 */
export default class Collider {
	public shape: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>;
	public collidesWith: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[];
	public game: Game;

	/**
	 * @constructor Collider
	 * @description Creates a Collider instance
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>} shape Gameobject to append the collider to
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[]} collidesWith What the gameobject collides with
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(
		shape: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>,
		collidesWith: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[],
		game: Game
	) {
		this.shape = shape;
		this.collidesWith = collidesWith;
		this.game = game;
	}

	/**
	 * @memberof Collider
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>} shape The gameobject that the collider is attached
	 * @param {Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[]} [diffCollidesWith] Overwrite what the gameobject collides with, optional
	 * @since 1.0.0-beta
	 */
	public update(
		shape: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>,
		diffCollidesWith?: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[]
	) {
		this.shape = shape;

		if (diffCollidesWith) {
			this.collidesWith = diffCollidesWith;
		}

		this.collidesWith.forEach((otherShape) => {
			if (
				otherShape.shape === 'rect' ||
				otherShape.shape === 'roundrect'
			) {
				this.collideRectangle(otherShape as Rect);
			}

			if (
				otherShape.shape === 'sprite' ||
				otherShape.shape === 'spritesheet'
			) {
				this.collideSprite(otherShape as Sprite);
			}

			if (otherShape.shape === 'circle') {
				if (this.collideCircle(otherShape as Circle)) {
					this.resolveCircle(otherShape as Circle);
				}
			}
		});
	}

	private collideRectangle(rect: Rect) {
		const rectCX = rect.position.x + rect.w * 0.5;
		const rectCY = rect.position.y + rect.h * 0.5;

		const thisCX = this.shape.position.x + this.shape.w * 0.5;
		const thisCY = this.shape.position.y + this.shape.h * 0.5;

		const dx = rectCX - thisCX; // x difference between centers
		const dy = rectCY - thisCY; // y difference between centers
		const aw = (rect.w + this.shape.w) * 0.5; // average width
		const ah = (rect.h + this.shape.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.shape.w) > Math.abs(dy / this.shape.h)) {
			if (dx < 0) this.shape.position.x = rect.position.x + rect.w;
			// left
			else this.shape.position.x = rect.position.x - this.shape.w; // right
		} else {
			if (dy < 0) this.shape.position.y = rect.position.y + rect.h;
			// top
			else this.shape.position.y = rect.position.y - this.shape.h; // bottom
		}

		return true;
	}

	private collideSprite(sprite: Sprite) {
		const rectCX = sprite.position.x + sprite.w * 0.5;
		const rectCY = sprite.position.y + sprite.h * 0.5;

		const thisCX = this.shape.position.x + this.shape.w * 0.5;
		const thisCY = this.shape.position.y + this.shape.h * 0.5;

		const dx = rectCX - thisCX; // x difference between centers
		const dy = rectCY - thisCY; // y difference between centers
		const aw = (sprite.w + this.shape.w) * 0.5; // average width
		const ah = (sprite.h + this.shape.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.shape.w) > Math.abs(dy / this.shape.h)) {
			if (dx < 0) this.shape.position.x = sprite.position.x + sprite.w;
			// left
			else this.shape.position.x = sprite.position.x - this.shape.w; // right
		} else {
			if (dy < 0) this.shape.position.y = sprite.position.y + sprite.h;
			// top
			else this.shape.position.y = sprite.position.y - this.shape.h; // bottom
		}

		return true;
	}

	private collideCircle(circle2: Circle) {
		/* first we get the x and y distance between the two circles. */
		const distance_x = this.shape.position.x - circle2.position.x;
		const distance_y = this.shape.position.y - circle2.position.y;
		/* Then we get the sum of their radii. */
		const radii_sum = (this.shape as Circle).r + circle2.r;

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
		const distance_x = this.shape.position.x - c2.position.x;
		const distance_y = this.shape.position.y - c2.position.y;
		const radii_sum = (this.shape as Circle).r + c2.r;
		const length =
			Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
		const unit_x = distance_x / length;
		const unit_y = distance_y / length;

		this.shape.position.x = c2.position.x + (radii_sum + 1) * unit_x;
		this.shape.position.y = c2.position.y + (radii_sum + 1) * unit_y;
	}
}
