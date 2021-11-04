import Game from '../../game';
import Vector2 from '../../math/vector2';
import Scene from '../../scene';

export default class PhysicsServer {
	public game: Game;
	public scene: Scene;

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
	}

	public __tick() {
		this.scene.physicsList.enabledFilter(true).forEach((r) => {
			r._update();

			if (r.collider && r.collidesWith && r.hitbox) {
				r.hitbox._update(r);

				r.collider._update(r.hitbox, r.collidesWith);

				if (this.game.config.physics?.gravity) {
					r.applyGravity(
						Vector2.fromVector2Like(
							this.game.config.physics.gravity
						)
					);
				}
			}
		});
	}
}
