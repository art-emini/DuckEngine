/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Duck } from '../../index';
import randomInt from '../math/randomInt';
import Game from '../game';
import Collider from '../physics/collider';
import Vector2 from '../math/vector2';
import clamp from '../math/clamp';
import Raycast from '../misc/raycast';
import Texture from '../models/texture';
import Scene from '../scene';

/**
 * @class GameObject
 * @classdesc Creates a DuckEngine GameObject
 * @description The GameObject Class. All GameObjects extend this class
 * @since 1.0.0-beta
 */
export default class GameObject<textureType extends Duck.Types.Texture.Type> {
	/**
	 * @memberof GameObject
	 * @description The unique identifier for a GameObject
	 * @type number
	 * @since 1.0.0-beta
	 */
	public readonly id: number;

	/**
	 * @memberof GameObject
	 * @description The shape of the GameObject, 'rect', 'circle', 'roundrect', 'sprite', or 'spritesheet'
	 * @type Duck.Types.Collider.ShapeString
	 * @since 1.0.0-beta
	 */
	public readonly shape: Duck.Types.Collider.ShapeString;

	/**
	 * @memberof GameObject
	 * @description The current global position of the GameObject
	 * @type Vector2
	 * @since 2.0.0
	 */
	public position: Vector2;

	/**
	 * @memberof GameObject
	 * @description The width of the GameObject
	 * @type number
	 * @since 1.0.0-beta
	 */
	public w: number;

	/**
	 * @memberof GameObject
	 * @description The height of the GameObject
	 * @type number
	 * @since 1.0.0-beta
	 */
	public h: number;

	/**
	 * @memberof GameObject
	 * @description The radius of the GameObject
	 * @type number
	 * @since 1.0.0-beta
	 */
	public r: number;

	/**
	 * @memberof GameObject
	 * @description The texture of the GameObject
	 * @type Texture
	 * @since 1.0.0-beta
	 */
	public texture: Texture<textureType>;

	/**
	 * @memberof GameObject
	 * @description The Game instance
	 * @type Game
	 * @since 1.0.0-beta
	 */
	public game: Game;

	/**
	 * @memberof GameObject
	 * @description The Scene instance
	 * @type Game
	 * @since 2.0.0-beta
	 */
	public scene: Scene;

	/**
	 * @memberof GameObject
	 * @description An instance of itself, used for colliders
	 * @type GameObject
	 * @since 1.0.0-beta
	 */
	protected self:
		| Duck.TypeClasses.GameObjects.GameObject<textureType>
		| undefined;

	/**
	 * @memberof GameObject
	 * @description Determines if a GameObject should be rendered or not
	 * @type boolean
	 * @since 2.0.0
	 */
	public visible: boolean;

	/**
	 * @memberof GameObject
	 * @description Determines the depth or zIndex of a GameObject
	 * @type boolean
	 * @since 2.0.0
	 */
	public zIndex: number;

	/**
	 * @memberof GameObject
	 * @description Half of the width or the full radius
	 * @type number
	 * @since 1.0.0-beta
	 */
	protected halfW: number;

	/**
	 * @memberof GameObject
	 * @description Half of the height or the full radius
	 * @type number
	 * @since 1.0.0-beta
	 */
	protected halfH: number;

	/**
	 * @memberof GameObject
	 * @description The Collider instance of the GameObject
	 * @type Collider | undefined
	 * @since 1.0.0-beta
	 */
	public collider: Collider | undefined;

	/**
	 * @memberof GameObject
	 * @description Gameobjects that can collide with the GameObject, also used for internalRaycasts
	 * @type GameObject[]
	 * @since 1.0.0-beta
	 */
	public collidesWith: Duck.TypeClasses.GameObjects.GameObject<textureType>[];

	/**
	 * @memberof GameObject
	 * @description The velocity of the GameObject
	 * @type Vector2
	 * @since 2.0.0
	 */
	public velocity: Vector2;

	protected internalRaycasts: {
		top: Raycast;
		bottom: Raycast;
		left: Raycast;
		right: Raycast;
	};

	/**
	 * @memberof GameObject
	 * @description The bounds of the GameObject
	 * @type \{ x: number; y: number; w: number; h: number; }
	 * @since 2.0.0
	 */
	public bounds: {
		x: number;
		y: number;
		w: number;
		h: number;
	};

	// methods

	/**
	 * @memberof GameObject
	 * @description Object that has all the physics method
	 * @type \{ addCollider: (collidesWith: Duck.TypeClasses.GameObjects.GameObject[]) => Collider; setBounds: (x: number, y: number, w: number, h: number) => void }
	 * @since 1.0.0
	 */
	public physics: {
		/**
		 * @memberof GameObject#physics
		 * @description Adds a collider to the GameObject
		 * @param {Duck.TypeClasses.GameObjects.GameObject<textureType>[]} collidesWith What the GameObject collides with
		 * @since 1.0.0-beta
		 */
		addCollider: (
			collidesWith: Duck.TypeClasses.GameObjects.GameObject<textureType>[]
		) => Collider;

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
	 * @description Creates a GameObject instance.
	 * @param {Duck.Types.Collider.ShapeString} shape Shape of the gameobject
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {string} fillColor Fill color or Texture instance
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		texture: Texture<textureType>,
		game: Game,
		scene: Scene
	) {
		this.id = randomInt(0, 100000);
		this.shape = shape;
		this.position = new Vector2(x, y);
		this.w = w;
		this.h = h;
		this.r = r;
		this.texture = texture;
		this.self;
		this.game = game;
		this.scene = scene;

		this.visible = true;
		this.zIndex = 2;

		this.halfW = this.w / 2;
		this.halfH = this.h / 2;

		this.collider;
		this.collidesWith = [];

		this.velocity = Vector2.ZERO;

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

		this.bounds = {
			x: -1000000,
			y: -1000000,
			w: 1000000,
			h: 1000000,
		};

		// methods
		this.physics = {
			addCollider: (
				collidesWith: Duck.Types.GameObject<textureType>[]
			) => {
				this.collidesWith = collidesWith;

				this.collider = new Collider(
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.self!,
					collidesWith,
					this.game
				);

				return this.collider;
			},
			setBounds: (x: number, y: number, w: number, h: number) => {
				this.bounds.x = x;
				this.bounds.y = y;
				this.bounds.w = w;
				this.bounds.h = h;
			},
		};

		// fix
		if (this.game.ctx) {
			this.game.ctx.globalCompositeOperation = 'source-over';
		}
	}

	protected init(self: Duck.Types.GameObject<textureType>) {
		this.self = self;
	}

	/**
	 * @description Draws the gameobject.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {}

	/**
	 * @description Updates the gameobject's position by the velocity. Sets velocity to 0 on every tick.
	 * Clamps position to bounds if exists. Rounds pixels if roundPixels game config is set to true.
	 * Casts internal raycasts. Updates physics server
	 *
	 * DO NOT CALL MANUALLY, CALLED IN SCENE.__tick(deltaTime)
	 *
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
	 * @memberof GameObject
	 * @description Sets the scale of the GameObject
	 * @param {Duck.Types.Misc.Scale|number} scale
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale | number) {
		if (typeof scale !== 'number') {
			if (scale.width) {
				this.w = scale.width;
				this.halfW = this.w / 2;
			}

			if (scale.height) {
				this.h = scale.height;
				this.halfH = this.h / 2;
			}
		} else {
			this.r = scale;
		}
	}

	/**
	 * @memberof GameObject
	 * @description Sets the velocity of an axis
	 * @param {'x'|'y'} axis 'x' or 'y' axis
	 * @param {number} v Velocity value
	 * @since 1.0.0-beta
	 */
	public setVelocity(axis: 'x' | 'y', v: number) {
		if (axis === 'x') {
			this.velocity.x = v;
		}

		if (axis === 'y') {
			this.velocity.y = v;
		}
	}

	/**
	 * @memberof GameObject
	 * @description Sets the fill color of the GameObject
	 * @param {string} fillColor Fill color
	 * @since 1.0.0-beta
	 */
	public setFillColor(fillColor: string) {
		(this.texture.texture as string) = fillColor;
	}

	// position methods

	/**
	 * @memberof GameObject
	 * @description Gets the top most coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getTop() {
		return this.position.y;
	}

	/**
	 * @memberof GameObject
	 * @description Gets the bottom most coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getBottom() {
		return this.position.y + this.h;
	}

	/**
	 * @memberof GameObject
	 * @description Gets the left most coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getLeft() {
		return this.position.x;
	}

	/**
	 * @memberof GameObject
	 * @description Gets the right most coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getRight() {
		return this.position.x + this.w;
	}

	/**
	 * @memberof GameObject
	 * @description Gets the center coordinates of the GameObject
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
	 * @memberof GameObject
	 * @description Gets the centerY coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getCenterY() {
		if (this.shape === 'circle') {
			return this.position.y + this.r;
		} else {
			return this.position.y + this.h / 2;
		}
	}

	/**
	 * @memberof GameObject
	 * @description Gets the centerX coordinate of the GameObject
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public getCenterX() {
		if (this.shape === 'circle') {
			return this.position.x + this.r;
		} else {
			return this.position.x + this.w / 2;
		}
	}

	/**
	 * @memberof GameObject
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
	 * @memberof GameObject
	 * @description Checks if the bottom internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isOnFloor() {
		return this.internalRaycasts.bottom.isIntersecting;
	}

	/**
	 * @memberof GameObject
	 * @description Checks if the top internal raycasts is colliding with this.collidesWith
	 * @returns false | Duck.Types.Raycast.StateValue
	 * @since 2.0.0
	 */
	public get isOnCeiling() {
		return this.internalRaycasts.top.isIntersecting;
	}

	/**
	 * @memberof GameObject
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
