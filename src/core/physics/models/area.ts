import { Duck } from '../../..';
import uniqueID from '../../../utils/uniqueID';
import Game from '../../game';
import Scene from '../../scene';
import PhysicsBody from '../physicsBody';

/**
 * @class Area
 * @classdesc Creates a DuckEngine Area
 * @description The Area Class. Detects Hitboxes entering and leaving an area
 * @extends PhysicsBody<'color'>
 * @since 2.0.0
 */
export default class Area extends PhysicsBody<'color'> {
	/**
	 * @memberof Area
	 * @description An array of PhysicsBodies with Hitboxes to check for entering and leaving the area
	 * @type PhysicsBody<Duck.Types.Texture.Type>[]
	 * @since 2.0.0
	 */
	public collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[];

	/**
	 * @memberof Area
	 * @description An array of PhysicsBodies that are currently in the area
	 * @type PhysicsBody<Duck.Types.Texture.Type>[]
	 * @since 2.0.0
	 */
	public bodies: PhysicsBody<Duck.Types.Texture.Type>[];

	/**
	 * @memberof Area
	 * @description Callback to call when a PhysicsBody with a Hitbox enters
	 * @type ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown) | undefined
	 * @since 2.0.0
	 */
	public onBodyEnter:
		| ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown)
		| undefined;

	/**
	 * @memberof Area
	 * @description Callback to call when a PhysicsBody with a Hitbox leaves the area
	 * @type ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown) | undefined
	 * @since 2.0.0
	 */
	public onBodyLeave:
		| ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown)
		| undefined;
	/**
	 * @constructor Area
	 * @description Creates an Area instance
	 * @param {number} x X position of the area
	 * @param {number} y Y position of the area
	 * @param {number} w Width of the area
	 * @param {number} h Height of the area
	 * @param {PhysicsBody<Duck.Types.Texture.Type>[]} collisionFilter An array of PhysicsBodies, with Hitboxes attached to them,
	 * to check for when it leaves/enters the area
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[],
		game: Game,
		scene: Scene
	) {
		const id = uniqueID();

		super('rect', id, x, y, w, h, 0, game, scene);

		this.collisionFilter = collisionFilter;
		this.bodies = [];

		this.physics.addHitbox(w, h);
	}

	/**
	 * @memberof Area
	 * @description Updates the Area, check for Hitbox intersections with the passed collisionFilter array of PhysicsBodies
	 *
	 * *DO NOT CALL MANUALLY! CALLED IN SCENE.PHYSICS SERVER.__tick*
	 *
	 * @since 2.0.0
	 */
	public _update() {
		this.collisionFilter.forEach((object) => {
			if (object.hitbox && this.hitbox) {
				// add body
				if (this.hitbox.intersectsWith(object.hitbox)) {
					this.addBody(object);
				}
				// remove body
				if (!this.hitbox.intersectsWith(object.hitbox)) {
					this.removeBody(object);
				}
			}
		});
	}

	protected addBody(physicsBody: PhysicsBody<Duck.Types.Texture.Type>) {
		const exists = this.bodyIsInArea(physicsBody);

		if (!exists) {
			this.bodies.push(physicsBody);
			if (this.onBodyEnter) {
				this.onBodyEnter(physicsBody);
			}
		}
	}

	protected removeBody(physicsBody: PhysicsBody<Duck.Types.Texture.Type>) {
		const exists = this.bodyIsInArea(physicsBody);

		if (exists) {
			this.bodies.splice(
				this.bodies.findIndex((object) => object.id === physicsBody.id),
				1
			);
			if (this.onBodyLeave) {
				this.onBodyLeave(physicsBody);
			}
		}
	}

	/**
	 * @memberof Area
	 * @description Checks if the body is currently in the area
	 * @param {PhysicsBody<Duck.Types.Texture.Type>} physicsBody PhysicsBody to check
	 * @returns {boolean}
	 */
	public bodyIsInArea(physicsBody: PhysicsBody<Duck.Types.Texture.Type>) {
		const f = this.bodies.find((object) => object.id === physicsBody.id);
		return f ? true : false;
	}
}
