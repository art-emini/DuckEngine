import Game from '../../game';
import Vector2 from '../../math/vector2';
import Scene from '../../scene';

/**
 * @class PhysicsServer
 * @classdesc Creates a DuckEngine PhysicsServer
 * @description The PhysicsServer Class. Handles all Physics updates
 * @since 2.0.0
 */
export default class PhysicsServer {
	/**
	 * @memberof PhysicsServer
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof PhysicsServer
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @constructor PhysicsServer
	 * @description Creates a PhysicsServer instance
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
	}

	/**
	 * @memberof PhysicsServer
	 * @description Uses PhysicsServer.Scene.physicsList and filters all enabled PhysicsBodies and calls PhysicsBody._update,
	 * PhysicsBody.hitbox._update, and PhysicsBody.collider._update
	 *
	 * *DO NOT CALL MANUALLY! CALLED IN SCENE.__TICK*
	 *
	 * @since 2.0.0
	 */
	public __tick() {
		this.scene.physicsList.enabledFilter(true).forEach((r) => {
			r._update();

			if (r.collider && r.collidesWith && r.hitbox) {
				r.hitbox._update(r);

				r.collider._update(r.hitbox, r.collidesWith);
			}
		});
	}
}
