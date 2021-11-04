import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Vector2 from '../../math/vector2';
import Scene from '../../scene';
import PhysicsBody from '../physicsBody';
import rectToRectIntersect from '../rectToRectIntersect';

export default class Hitbox {
	public readonly id: number;

	public position: Vector2;
	public offset: Vector2;
	public w: number;
	public h: number;
	public game: Game;
	public scene: Scene;
	public physicsObject: PhysicsBody<Duck.Types.Texture.Type>;

	public debugColor: string | undefined;
	public visible: boolean;
	public zIndex: number;

	constructor(
		id: number,
		position: Vector2,
		w: number,
		h: number,
		offset: Vector2,
		physicsObject: PhysicsBody<Duck.Types.Texture.Type>,
		game: Game,
		scene: Scene,
		debugColor?: string
	) {
		this.id = id;
		this.position = position;
		this.offset = offset;
		this.w = w;
		this.h = h;
		this.game = game;
		this.scene = scene;
		this.physicsObject = physicsObject;

		this.debugColor = debugColor;
		this.visible = debugColor ? true : false;
		this.zIndex = Duck.Layers.Rendering.zIndex.graphicDebug;
	}

	public _draw() {
		if (this.game.ctx) {
			if (this.debugColor) {
				this.game.ctx.fillStyle = this.debugColor;
				this.game.ctx.fillRect(
					this.position.x,
					this.position.y,
					this.w,
					this.h
				);
			}
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. HTMLCanvasElement is undefined.'
			);
		}
	}

	public _update(physicsObject: PhysicsBody<Duck.Types.Texture.Type>) {
		this.physicsObject = physicsObject;

		this.position = this.physicsObject.position.add(this.offset);
	}

	public setDebugColor(debugColor: string) {
		this.debugColor = debugColor;
		this.visible = true;
	}

	public scale(scale: Vector2) {
		this.w = scale.x;
		this.h = scale.y;
	}

	public setPosition(newPosition: Vector2, offset = Vector2.ZERO) {
		this.offset = offset;
		this.position = newPosition.add(this.offset);
	}

	public auto(offset?: Vector2) {
		if (this.physicsObject.shape === 'circle') {
			// top left corner
			const topLeft = new Vector2(
				this.physicsObject.position.x - this.physicsObject.r,
				this.physicsObject.position.y - this.physicsObject.r
			);

			if (offset) {
				topLeft.add(offset);
			}

			this.position = topLeft;

			this.scale(
				new Vector2(this.physicsObject.r * 2, this.physicsObject.r * 2)
			);
		} else {
			this.position = this.physicsObject.position;

			if (offset) {
				this.position.add(offset);
			}

			this.scale(new Vector2(this.physicsObject.w, this.physicsObject.h));
		}
	}

	public intersectsWith(hitbox: Hitbox) {
		return rectToRectIntersect(
			{
				position: {
					x: this.position.x,
					y: this.position.y,
				},
				w: this.w,
				h: this.h,
			},
			{
				position: {
					x: hitbox.position.x,
					y: hitbox.position.y,
				},
				w: hitbox.w,
				h: hitbox.h,
			}
		);
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the top most coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getTop() {
		return this.position.y;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the bottom most coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getBottom() {
		return this.position.y + this.h;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the left most coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getLeft() {
		return this.position.x;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the right most coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getRight() {
		return this.position.x + this.w;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the center coordinates of the Hitbox
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public getCenter() {
		return new Vector2(
			this.position.x + this.w / 2,
			this.position.y + this.h / 2
		);
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the centerY coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getCenterY() {
		return this.position.y + this.h / 2;
	}

	/**
	 * @memberof Hitbox
	 * @description Gets the centerX coordinate of the Hitbox
	 * @returns number
	 * @since 2.0.0
	 */
	public getCenterX() {
		return this.position.x + this.w / 2;
	}
}
