import { Duck } from '../..';
import Debug from '../debug/debug';
import Game from '../game';
import Group from '../group/group';
import clamp from '../math/clamp';
import Vector2 from '../math/vector2';
import Raycast from '../misc/raycast';
import Scene from '../scene';
import Collider from './collider';
import Hitbox from './models/hitbox';

/**
 * @class PhysicsBody
 * @classdesc Creates a DuckEngine PhysicsBody
 * @description The PhysicsBody Class. The GameObject class extends this class
 * @since 2.0.0
 */
export default class PhysicsBody<textureType extends Duck.Types.Texture.Type> {
	/**
	 * @memberof PhysicsBody
	 * @description The unique identifier for a GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public readonly id: number;

	/**
	 * @memberof PhysicsBody
	 * @description The shape of the GameObject, 'rect', 'circle', 'roundrect', 'sprite', or 'spritesheet'
	 * @type Duck.Types.Collider.ShapeString
	 * @since 2.0.0
	 */
	public readonly shape: Duck.Types.Collider.ShapeString;

	/**
	 * @memberof PhysicsBody
	 * @description The current global position of the GameObject
	 * @type Vector2
	 * @since 2.0.0
	 */
	public position: Vector2;

	/**
	 * @memberof PhysicsBody
	 * @description The width of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public w: number;

	/**
	 * @memberof PhysicsBody
	 * @description The height of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public h: number;

	/**
	 * @memberof PhysicsBody
	 * @description The radius of the GameObject
	 * @type number
	 * @since 2.0.0
	 */
	public r: number;

	/**
	 * @memberof PhysicsBody
	 * @description PhysicsBody config, includes: type - KinematicBody | RigidBody | StaticBody, physicsEnabled - enables physics
	 *
	 * defaults: { type: 'KinematicBody', physicsEnabled: true }
	 *
	 * @type Duck.Types.PhysicsBody.Config
	 * @since 2.0.0
	 */
	public options: Duck.Types.PhysicsBody.Config;

	/**
	 * @memberof PhysicsBody
	 * @description The Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof PhysicsBody
	 * @description The Scene instance
	 * @type Game
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof PhysicsBody
	 * @description An instance of itself, used for colliders
	 * @type PhysicsBody
	 * @since 2.0.0
	 */
	protected self: PhysicsBody<textureType> | undefined;

	/**
	 * @memberof PhysicsBody
	 * @description Half of the width or the full radius
	 * @type number
	 * @since 2.0.0
	 */
	protected halfW: number;

	/**
	 * @memberof PhysicsBody
	 * @description Half of the height or the full radius
	 * @type number
	 * @since 2.0.0
	 */
	protected halfH: number;

	/**
	 * @memberof PhysicsBody
	 * @description The Collider instance of the PhysicsBody
	 * @type Collider | undefined
	 * @since 2.0.0
	 */
	public collider: Collider | undefined;

	/**
	 * @memberof PhysicsBody
	 * @description An array or group of GameObjects that can collide with the PhysicsBody, also used for internalRaycasts.cast
	 * @type Duck.TypeClasses.GameObjects.GameObject<textureType>[] | Group<Duck.TypeClasses.GameObjects.GameObject<textureType>>
	 * @since 2.0.0
	 */
	public collidesWith:
		| Duck.TypeClasses.GameObjects.GameObject<textureType>[]
		| Group<Duck.TypeClasses.GameObjects.GameObject<textureType>>;

	/**
	 * @memberof PhysicsBody
	 * @description The Collider Hitbox of the PhysicsBody
	 * @type Hitbox | undefined
	 * @since 2.0.0
	 */
	public hitbox: Hitbox | undefined;

	/**
	 * @memberof PhysicsBody
	 * @description The velocity of the PhysicsBody
	 * @type Vector2
	 * @since 2.0.0
	 */
	public velocity: Vector2;

	/**
	 * @memberof PhysicsBody
	 * @description The bounds of the PhysicsBody
	 * @type Duck.Types.Math.BoundsLike
	 * @since 2.0.0
	 */
	public bounds: Duck.Types.Math.BoundsLike;

	protected internalRaycasts: {
		top: Raycast;
		bottom: Raycast;
		left: Raycast;
		right: Raycast;
	};

	/**
	 * @memberof PhysicsBody
	 * @description Object that has all the physics method
	 * @type { addCollider: (collidesWith: Duck.TypeClasses.GameObjects.GameObject[]) => Collider;
	 *	setBounds: (x: number, y: number, w: number, h: number) => void
	 * }
	 * @since 2.0.0
	 */
	public physics: {
		/**
		 * @memberof PhysicsBody#physics
		 * @description Adds a collider to the PhysicsBody
		 * @param {Duck.TypeClasses.GameObjects.GameObject<textureType>[]} collidesWith What the GameObject collides with
		 * @since 2.0.0
		 */
		addCollider: (
			collidesWith: Duck.TypeClasses.GameObjects.GameObject<textureType>[]
		) => Collider | undefined;

		/**
		 * @memberof PhysicsBody#physics
		 * @description Adds a hitbox to the PhysicsBody
		 * @param {number} [w] Width of hitbox, optional -> defaults: PhysicsBody.w or PhysicsBody.r * 2
		 * @param {number} [h] Height of hitbox, optional -> defaults: PhysicsBody.h or PhysicsBody.r * 2
		 * @param {Vector2} [offset=Vector2.ZERO] Offset of hitbox, optional -> defaults: Vector2.ZERO
		 * @since 2.0.0
		 */
		addHitbox: (w?: number, h?: number, offset?: Vector2) => Hitbox;

		/**
		 * @memberof GameObject#physics
		 * @description Adds bounds to the GameObject
		 * @param {number} x X position
		 * @param {number} y Y position
		 * @param {number} w Width of the bounds
		 * @param {number} h Height of the bounds
		 * @since 2.0.0
		 */
		setBounds: (x: number, y: number, w: number, h: number) => void;
	};

	/**
	 * @constructor
	 * @description Creates a PhysicsBody instance. Extended by GameObject
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of PhysicsBody
	 * @param {number} id ID from GameObject ID
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		id: number,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		game: Game,
		scene: Scene
	) {
		this.shape = shape;
		this.id = id;

		this.position = new Vector2(x, y);
		this.w = w;
		this.h = h;
		this.r = r;

		this.options = {
			type: 'KinematicBody',
			physicsEnabled: true,
		};

		this.game = game;
		this.scene = scene;

		this.halfW = this.w / 2;
		this.halfH = this.h / 2;

		if (this.shape === 'circle') {
			this.halfW = r;
			this.halfH = r;
		}

		this.velocity = Vector2.ZERO;

		this.collider = undefined;
		this.collidesWith = [];

		this.bounds = {
			x: -Infinity,
			y: -Infinity,
			w: Infinity,
			h: Infinity,
		};

		// setup internal raycasts
		const middle = this.getCenter();

		let width = this.w / 2;
		let height = this.h / 2;

		if (this.shape === 'circle') {
			width = this.r;
			height = this.r;
		}

		this.internalRaycasts = {
			top: new Raycast(
				middle,
				Vector2.fromVec(
					middle.clone().setValues(middle.x, middle.y - (height + 1))
				),
				this.game
			),
			bottom: new Raycast(
				middle,
				Vector2.fromVec(
					middle.clone().setValues(middle.x, middle.y + (height + 1))
				),
				this.game
			),
			left: new Raycast(
				middle,
				Vector2.fromVec(
					middle.clone().setValues(middle.x - (width + 1), middle.y)
				),
				this.game
			),
			right: new Raycast(
				middle,
				Vector2.fromVec(
					middle.clone().setValues(middle.x + (width + 1), middle.y)
				),
				this.game
			),
		};

		// methods
		this.physics = {
			addCollider: (
				collidesWith:
					| Duck.Types.GameObject<textureType>[]
					| Group<Duck.Types.GameObject<textureType>>
			) => {
				if (!this.hitbox) {
					new Debug.Error(
						'Cannot add collider to PhysicsObject. No hitbox exists. Create a hitbox first using PhysicsObject.physics.addHitbox'
					);
					return undefined;
				}

				if (!this.game.config.physics?.enabled) {
					new Debug.Error(
						'Cannot add collider to PhysicsObject. Game Config.physics.enabled must be truthy!'
					);
				}

				this.collidesWith = collidesWith;

				this.collider = new Collider(
					this.hitbox,
					collidesWith,
					this.game
				);

				return this.collider;
			},
			addHitbox: (w?: number, h?: number, offset = Vector2.ZERO) => {
				if (!this.game.config.physics?.enabled) {
					new Debug.Error(
						'Cannot add hitbox to PhysicsObject. Game Config.physics.enabled must be truthy!'
					);
				}

				this.hitbox = new Hitbox(
					this.position,
					w || 0,
					h || 0,
					offset,
					this,
					this.game,
					this.scene
				);

				if (!w && !h) {
					this.hitbox.auto(offset);
				}

				return this.hitbox;
			},
			setBounds: (x: number, y: number, w: number, h: number) => {
				this.bounds.x = x;
				this.bounds.y = y;
				this.bounds.w = w;
				this.bounds.h = h;
			},
		};
	}

	/**
	 * @memberof PhysicsBody
	 * @description Initializes the PhysicsBody.self property that is used for colliders
	 * @param {PhysicsBody} self Instance of PhysicsBody
	 * @since 2.0.0
	 */
	protected init(self: PhysicsBody<textureType>) {
		this.self = self;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Updates the PhysicsBody's position by the velocity. Sets velocity to 0 on every tick.
	 * Clamps position to bounds if exists. Rounds pixels if roundPixels game config is set to true.
	 * Casts internal raycasts.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick(deltaTime)
	 *
	 * @since 2.0.0
	 */
	public _update() {
		(this.position.x += this.velocity.x) * this.game.deltaTime;
		(this.position.y += this.velocity.y) * this.game.deltaTime;

		// clamp to bounds
		this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
		this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);

		// set to none
		this.velocity.x = 0;
		this.velocity.y = 0;

		// roundPixels
		if (this.game.config.roundPixels) {
			this.position.round();
		}

		// apply gravity
		if (this.game.config.physics?.gravity) {
			if (
				this.options.type === 'KinematicBody' ||
				this.options.type === 'RigidBody'
			) {
				this.applyGravity(
					Vector2.fromVector2Like(this.game.config.physics.gravity)
				);
			}
		}

		// internal raycasts
		const middle = this.getCenter();

		let width = this.w / 2;
		let height = this.h / 2;

		if (this.shape === 'circle') {
			width = this.r;
			height = this.r;
		}

		this.internalRaycasts.top.position = middle;
		this.internalRaycasts.bottom.position = middle;
		this.internalRaycasts.left.position = middle;
		this.internalRaycasts.right.position = middle;

		this.internalRaycasts.top.positionEnd = Vector2.fromVec(
			middle.clone().setValues(middle.x, middle.y - (height + 1))
		);
		this.internalRaycasts.bottom.positionEnd = Vector2.fromVec(
			middle.clone().setValues(middle.x, middle.y + (height + 1))
		);
		this.internalRaycasts.left.positionEnd = Vector2.fromVec(
			middle.clone().setValues(middle.x - (width + 1), middle.y)
		);
		this.internalRaycasts.right.positionEnd = Vector2.fromVec(
			middle.clone().setValues(middle.x + (width + 1), middle.y)
		);

		// cast internal raycasts
		this.internalRaycasts.top.cast(this.collidesWith);
		this.internalRaycasts.bottom.cast(this.collidesWith);
		this.internalRaycasts.left.cast(this.collidesWith);
		this.internalRaycasts.right.cast(this.collidesWith);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity based on an axis
	 * @param {'x'|'y'} axis The axis to set the velocity of
	 * @param {number} v The value to set the velocity axis as
	 * @since 2.0.0
	 */
	public setVelocity(axis: 'x' | 'y', v: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}

		if (axis === 'x') {
			this.velocity.x = v;
		}

		if (axis === 'y') {
			this.velocity.y = v;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity.x
	 * @param {number} v The value to set the velocity.x as
	 * @since 2.0.0
	 */
	public setVelocityX(v: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity X as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}
		this.velocity.x = v;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Sets the velocity.y
	 * @param {number} v The value to set the velocity.y as
	 * @since 2.0.0
	 */
	public setVelocityY(v: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot set velocity Y as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}
		this.velocity.y = v;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Accelerates the velocity by an amount
	 * @param {Vector2} target The target velocity
	 * @param {number} amount The value to increase the velocity by
	 * @since 2.0.0
	 */
	public accelerateVelocity(target: Vector2, amount: number) {
		if (this.options.type !== 'KinematicBody') {
			new Debug.Error(
				`Cannot accelerate velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody.`
			);
			return;
		}
		this.velocity.moveTowards(this.velocity, target, amount);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies friction to the velocity by an amount
	 * @param {number} frictionAmount The value to decrease the velocity by
	 * @since 2.0.0
	 */
	public applyFriction(frictionAmount: Vector2) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot apply friction as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}
		this.velocity.subtract(frictionAmount).clampMin(0);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies gravity to the velocity by a Vector2
	 * @param {Vector2} gravity The Vector2 to add to the velocity by
	 * @since 2.0.0
	 */
	public applyGravity(gravity: Vector2) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot apply gravity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}
		if (gravity.x !== 0) {
			this.velocity.x += gravity.x;
		}
		if (gravity.y !== 0) {
			this.velocity.y += gravity.y;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Applies gravity to the velocity by a Vector2
	 * @param {Duck.Types.Math.BoundsLike} [bounds=PhysicsBody.bounds] The bounds of the PhysicsBody, optional -> defaults: PhysicsBody.bounds, if none
	 * are set, it is infinite
	 * @param {number} [restitution=1] How much energy is lost when bouncing, a number between 0-1 to loose energy,
	 * 1-any to increase energy, 1 = none, must be a positive number
	 * @since 2.0.0
	 */
	public bounceVelocityBounds(bounds = this.bounds, restitution = 1) {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot bounce velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}
		if (this.position.x > bounds.w || this.position.x < bounds.x) {
			this.velocity.x = this.velocity.x * -restitution;
		}
		if (this.position.y > bounds.h || this.position.y < bounds.y) {
			this.velocity.y = this.velocity.y * -restitution;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Reflects the velocity, sets the velocity as the opposite value of the velocity
	 *
	 * @example myPhysicsBody.setVelocity('x', 3);
	 * myPhysicsBody.reflect(); // velocity: 0, -3
	 *
	 * @since 2.0.0
	 */
	public reflectVelocity() {
		if (
			this.options.type !== 'KinematicBody' &&
			this.options.type !== 'RigidBody'
		) {
			new Debug.Error(
				`Cannot reflect velocity as PhysicsBody.options.type is ${this.options.type} instead of KinematicBody or RigidBody.`
			);
			return;
		}
		this.velocity.reflect();
	}

	public autoFitHitbox(offset = Vector2.ZERO) {
		this.hitbox?.auto(offset);
	}

	public scaleHitbox(scale: Vector2) {
		this.hitbox?.scale(scale);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the top most coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getTop() {
		return this.position.y;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the bottom most coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getBottom() {
		return this.position.y + this.h;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the left most coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getLeft() {
		return this.position.x;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the right most coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getRight() {
		return this.position.x + this.w;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the center coordinates of the PhysicsBody
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public getCenter() {
		if (this.shape === 'circle') {
			return new Vector2(this.position.x, this.position.y);
		} else {
			return new Vector2(
				this.position.x + this.w / 2,
				this.position.y + this.h / 2
			);
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the centerY coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getCenterY() {
		if (this.shape === 'circle') {
			return this.position.y + this.r;
		} else {
			return this.position.y + this.h / 2;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Gets the centerX coordinate of the PhysicsBody
	 * @returns number
	 * @since 2.0.0
	 */
	public getCenterX() {
		if (this.shape === 'circle') {
			return this.position.x + this.r;
		} else {
			return this.position.x + this.w / 2;
		}
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks if any one of the internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isColliding() {
		return (
			this.internalRaycasts.top.isIntersecting ||
			this.internalRaycasts.bottom.isIntersecting ||
			this.internalRaycasts.left.isIntersecting ||
			this.internalRaycasts.right.isIntersecting
		);
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks if the bottom internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isOnFloor() {
		return this.internalRaycasts.bottom.isIntersecting;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks if the top internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isOnCeiling() {
		return this.internalRaycasts.top.isIntersecting;
	}

	/**
	 * @memberof PhysicsBody
	 * @description Checks if the left or right internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isOnWall() {
		return (
			this.internalRaycasts.left.isIntersecting ||
			this.internalRaycasts.right.isIntersecting
		);
	}
}
