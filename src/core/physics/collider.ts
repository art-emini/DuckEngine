// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html
// most of rect physics also from PothOnProgramming

import { Duck } from '../../index';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import Sprite from '../gameobjects/sprite';
import PhysicsBody from './physicsBody';

/**
 * @class Collider
 * @classdesc Creates a DuckEngine Collider
 * @description The Collider Class. Collision Handler and Resolver
 * @since 1.0.0-beta
 */
export default class Collider {
	public object: PhysicsBody<Duck.Types.Texture.Type>;
	public collidesWith: PhysicsBody<Duck.Types.Texture.Type>[];
	public game: Game;

	/**
	 * @constructor Collider
	 * @description Creates a Collider instance
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object PhysicsBody to append the collider to
	 * @param {PhysicsBody<Duck.Types.Texture.Type>[]} collidesWith What the PhysicsBody collides with
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(
		object: PhysicsBody<Duck.Types.Texture.Type>,
		collidesWith: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[],
		game: Game
	) {
		this.object = object;
		this.collidesWith = collidesWith;
		this.game = game;
	}

	/**
	 * @memberof Collider
	 * @description Updates the collider and checks for collisions with the updated version of the object, and collides with.
	 *
	 * DO NOT CALL MANUALLY! CALLED IN PHYSICS SERVER!
	 *
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} object The PhysicsBody that the collider is attached
	 * @param {PhysicsBody<Duck.Types.Texture.Type>[]} updatedCollidesWith Updated version of what the object collides with
	 * @since 1.0.0-beta
	 */
	public __update(
		object: PhysicsBody<Duck.Types.Texture.Type>,
		updatedCollidesWith: PhysicsBody<Duck.Types.Texture.Type>[]
	) {
		this.object = object;

		this.collidesWith = updatedCollidesWith;

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

	protected collideRectangle(rect: Rect) {
		const rectCX = rect.position.x + rect.w * 0.5;
		const rectCY = rect.position.y + rect.h * 0.5;

		const thisCX = this.object.position.x + this.object.w * 0.5;
		const thisCY = this.object.position.y + this.object.h * 0.5;

		const dx = rectCX - thisCX; // x difference between centers
		const dy = rectCY - thisCY; // y difference between centers
		const aw = (rect.w + this.object.w) * 0.5; // average width
		const ah = (rect.h + this.object.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.object.w) > Math.abs(dy / this.object.h)) {
			if (dx < 0) this.object.position.x = rect.position.x + rect.w;
			// left
			else this.object.position.x = rect.position.x - this.object.w; // right
		} else {
			if (dy < 0) this.object.position.y = rect.position.y + rect.h;
			// top
			else this.object.position.y = rect.position.y - this.object.h; // bottom
		}

		return true;
	}

	protected collideSprite(sprite: Sprite) {
		const rectCX = sprite.position.x + sprite.w * 0.5;
		const rectCY = sprite.position.y + sprite.h * 0.5;

		const thisCX = this.object.position.x + this.object.w * 0.5;
		const thisCY = this.object.position.y + this.object.h * 0.5;

		const dx = rectCX - thisCX; // x difference between centers
		const dy = rectCY - thisCY; // y difference between centers
		const aw = (sprite.w + this.object.w) * 0.5; // average width
		const ah = (sprite.h + this.object.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.object.w) > Math.abs(dy / this.object.h)) {
			if (dx < 0) this.object.position.x = sprite.position.x + sprite.w;
			// left
			else this.object.position.x = sprite.position.x - this.object.w; // right
		} else {
			if (dy < 0) this.object.position.y = sprite.position.y + sprite.h;
			// top
			else this.object.position.y = sprite.position.y - this.object.h; // bottom
		}

		return true;
	}

	protected collideCircle(circle2: Circle) {
		/* first we get the x and y distance between the two circles. */
		const distance_x = this.object.position.x - circle2.position.x;
		const distance_y = this.object.position.y - circle2.position.y;
		/* Then we get the sum of their radii. */
		const radii_sum = (this.object as Circle).r + circle2.r;

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

	protected resolveCircle(c2: Circle) {
		const distance_x = this.object.position.x - c2.position.x;
		const distance_y = this.object.position.y - c2.position.y;
		const radii_sum = (this.object as Circle).r + c2.r;
		const length =
			Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
		const unit_x = distance_x / length;
		const unit_y = distance_y / length;

		this.object.position.x = c2.position.x + (radii_sum + 1) * unit_x;
		this.object.position.y = c2.position.y + (radii_sum + 1) * unit_y;
	}
}
