import { Duck } from '../../..';
import Game from '../../game';
import randomInt from '../../math/randomInt';
import Scene from '../../scene';
import PhysicsBody from '../physicsBody';

export default class Area extends PhysicsBody<'color'> {
	public collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[];

	public bodies: PhysicsBody<Duck.Types.Texture.Type>[];

	public onBodyEnter:
		| ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown)
		| undefined;

	public onBodyLeave:
		| ((physicsBody: PhysicsBody<Duck.Types.Texture.Type>) => unknown)
		| undefined;

	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[],
		game: Game,
		scene: Scene
	) {
		const id = randomInt(0, 100000);

		super('rect', id, x, y, w, h, 0, game, scene);

		this.collisionFilter = collisionFilter;
		this.bodies = [];

		this.physics.addHitbox(w, h);
	}

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
		const exists = this.bodyIsIntersecting(physicsBody);

		if (!exists) {
			this.bodies.push(physicsBody);
			if (this.onBodyEnter) {
				this.onBodyEnter(physicsBody);
			}
		}
	}

	protected removeBody(physicsBody: PhysicsBody<Duck.Types.Texture.Type>) {
		const exists = this.bodyIsIntersecting(physicsBody);

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

	public bodyIsIntersecting(
		physicsBody: PhysicsBody<Duck.Types.Texture.Type>
	) {
		const f = this.bodies.find((object) => object.id === physicsBody.id);
		return f ? f : false;
	}
}
