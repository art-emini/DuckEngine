// circle collision physics from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/circle-collision-response/circle-collision-response.html
// most of rect physics also from PothOnProgramming

import { Duck } from '../../../index';
import Game from '../../game';
import GameObject from '../../gameobjects/gameObject';
import Group from '../../group/group';
import Hitbox from './hitbox';

/**
 * @class Collider
 * @classdesc Creates a DuckEngine Collider
 * @description The Collider Class. Collision Handler and Resolver
 * @since 1.0.0-beta
 */
export default class Collider {
	public hitbox: Hitbox;
	public collidesWith:
		| GameObject<Duck.Types.Texture.Type>[]
		| Group<GameObject<Duck.Types.Texture.Type>>;
	public game: Game;

	/**
	 * @constructor Collider
	 * @description Creates a Collider instance
	 * @param {Hitbox} hitbox Hitbox to append the collider to
	 * @param {GameObject<Duck.Types.Texture.Type>[] | Group<GameObject<Duck.Types.Texture.Type>>} collidesWith What the PhysicsBody collides with
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(
		hitbox: Hitbox,
		collidesWith:
			| GameObject<Duck.Types.Texture.Type>[]
			| Group<GameObject<Duck.Types.Texture.Type>>,
		game: Game
	) {
		this.hitbox = hitbox;
		this.collidesWith = collidesWith;
		this.game = game;
	}

	/**
	 * @memberof Collider
	 * @description Updates the collider and checks for collisions with the updated version of the object, and collides with.
	 *
	 * DO NOT CALL MANUALLY! CALLED IN PHYSICS SERVER!
	 *
	 * @param {Hitbox} hitbox The updated hitbox that the collider is attached
	 * @param {GameObject<Duck.Types.Texture.Type>[] | Group<GameObject<Duck.Types.Texture.Type>>} updatedCollidesWith Updated version of what the object collides with
	 * @since 2.0.0
	 */
	public _update(
		hitbox: Hitbox,
		updatedCollidesWith:
			| GameObject<Duck.Types.Texture.Type>[]
			| Group<GameObject<Duck.Types.Texture.Type>>
	) {
		this.hitbox = hitbox;

		this.collidesWith = updatedCollidesWith;

		if (Array.isArray(this.collidesWith)) {
			this.collidesWith.forEach((otherObject) => {
				if (otherObject.hitbox) {
					this.collideHitboxes(otherObject.hitbox);
				}
			});
		} else {
			this.collidesWith.each((otherObject) => {
				if (otherObject.hitbox) {
					this.collideHitboxes(otherObject.hitbox);
				}
			});
		}
	}

	protected collideHitboxes(
		hitbox2: Hitbox
	): Duck.Types.Collider.CollisionResponseType {
		const rectCX = hitbox2.position.x + hitbox2.w * 0.5;
		const rectCY = hitbox2.position.y + hitbox2.h * 0.5;

		const thisCX = this.hitbox.position.x + this.hitbox.w * 0.5;
		const thisCY = this.hitbox.position.y + this.hitbox.h * 0.5;

		const dx = rectCX - thisCX; // x difference between centers
		const dy = rectCY - thisCY; // y difference between centers
		const aw = (hitbox2.w + this.hitbox.w) * 0.5; // average width
		const ah = (hitbox2.h + this.hitbox.h) * 0.5; // average height

		/* If either distance is greater than the average dimension there is no collision. */
		if (Math.abs(dx) > aw || Math.abs(dy) > ah) {
			return 'none';
		}

		/* To determine which region of this rectangle the rect's center
          point is in, we have to account for the scale of the this rectangle.
          To do that, we divide dx and dy by it's width and height respectively. */
		if (Math.abs(dx / this.hitbox.w) > Math.abs(dy / this.hitbox.h)) {
			if (dx < 0) {
				// left
				this.hitbox.position.x = hitbox2.position.x + hitbox2.w;

				return 'left';
			} else {
				// right
				this.hitbox.position.x = hitbox2.position.x - this.hitbox.w;

				return 'right';
			}
		} else {
			if (dy < 0) {
				// top
				this.hitbox.position.y = hitbox2.position.y + hitbox2.h;

				return 'top';
			} else {
				// bottom
				this.hitbox.position.y = hitbox2.position.y - this.hitbox.h;

				return 'bottom';
			}
		}
	}
}
