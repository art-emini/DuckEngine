import { Duck } from '../../..';
import Game from '../../game';
import Vector2 from '../../math/vector2';
import Scene from '../../scene';
import PhysicsBody from '../physicsBody';

export default class Hitbox {
	public position: Vector2;
	public offset: Vector2;
	public w: number;
	public h: number;
	public game: Game;
	public scene: Scene;
	public physicsObject: PhysicsBody<Duck.Types.Texture.Type>;

	constructor(
		position: Vector2,
		w: number,
		h: number,
		offset: Vector2,
		physicsObject: PhysicsBody<Duck.Types.Texture.Type>,
		game: Game,
		scene: Scene
	) {
		this.position = position;
		this.offset = offset;
		this.w = w;
		this.h = h;
		this.game = game;
		this.scene = scene;
		this.physicsObject = physicsObject;
	}

	public __update(physicsObject: PhysicsBody<Duck.Types.Texture.Type>) {
		this.physicsObject = physicsObject;

		this.position = this.physicsObject.position.add(this.offset);
	}

	public scale(scale: Vector2) {
		this.w = scale.x;
		this.h = scale.y;
	}

	public setPosition(position: Vector2, offset = Vector2.ZERO) {
		this.position = position.add(offset);
	}

	public auto(offset = Vector2.ZERO) {
		if (this.physicsObject.shape === 'circle') {
			// top left corner
			const topLeft = new Vector2(
				this.physicsObject.position.x - this.physicsObject.r,
				this.physicsObject.position.y - this.physicsObject.r
			);

			topLeft.add(offset);

			this.position = topLeft;

			this.scale(
				new Vector2(this.physicsObject.r * 2, this.physicsObject.r * 2)
			);
		} else {
			this.position = this.physicsObject.position;
			this.position.add(offset);

			this.scale(new Vector2(this.physicsObject.w, this.physicsObject.h));
		}
	}
}
