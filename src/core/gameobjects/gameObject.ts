/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Duck } from '../../index';
import randomInt from '../math/randomInt';
import Game from '../game';
import Texture from '../models/texture';
import Scene from '../scene';
import PhysicsBody from '../physics/physicsBody';

/**
 * @class GameObject
 * @classdesc Creates a DuckEngine GameObject
 * @description The GameObject Class. All GameObjects extend this class
 * @since 1.0.0-beta
 */
export default class GameObject<
	textureType extends Duck.Types.Texture.Type
> extends PhysicsBody<textureType> {
	/**
	 * @memberof GameObject
	 * @description The texture of the GameObject
	 * @type Texture
	 * @since 1.0.0-beta
	 */
	public texture: Texture<textureType>;

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
	 * @type number
	 * @since 2.0.0
	 */
	public zIndex: number;

	// methods

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
		const id = randomInt(0, 100000);

		super(shape, id, x, y, w, h, r, game, scene);

		this.texture = texture;

		this.visible = true;
		this.zIndex = Duck.Layers.Rendering.zIndex.gameobject;

		// fix
		if (this.game.ctx) {
			this.game.ctx.globalCompositeOperation = 'source-over';
		}
	}

	/**
	 * @memberof GameObject
	 * @description Draws the gameobject.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 * @since 1.0.0-beta
	 */
	public _draw() {}

	/**
	 * @memberof GameObject
	 * @description Sets the scale of the GameObject
	 * @param {Duck.Types.Misc.Scale|number} scale Scale of the gameobject, can be a number to change the radius
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale | number) {
		if (typeof scale !== 'number') {
			if (scale.width) {
				this.w = scale.width;
			}

			if (scale.height) {
				this.h = scale.height;
			}
		} else {
			this.r = scale;
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
}
