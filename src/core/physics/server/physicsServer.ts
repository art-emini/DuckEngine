import Game from '../../game';
import GameObject from '../../gameobjects/gameObject';
import Scene from '../../scene';

export default class PhysicsServer {
	public game: Game;
	public scene: Scene;

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
	}

	public __tick() {
		this.scene.displayList.visibilityFilter(true).forEach((r) => {
			if (r instanceof GameObject) {
				if (r.collider && r.collidesWith) {
					r.collider.__update(r, r.collidesWith);
				}
			}
		});
	}
}
