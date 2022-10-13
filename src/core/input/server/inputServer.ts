import Game from '../../game';
import Scene from '../../scene';

/**
 * @class InputServer
 * @classdesc Creates a DuckEngine InputServer
 * @description The InputServer Class. Handles all input updates
 * @since 3.0.0
 */
export default class InputServer {
  /**
   * @memberof InputServer
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

  /**
   * @memberof InputServer
   * @description Scene instance
   * @type Scene
   * @since 3.0.0
   */
  public scene: Scene;

  /**
   * @constructor InputServer
   * @description Creates a InputServer instance
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(game: Game, scene: Scene) {
    this.game = game;
    this.scene = scene;
  }

  /**
   * @memberof InputServer
   * @description Uses InputServer.Scene.inputList to pool and update inputs such as touch and gamepad inputs, (Key and Mouse inputs are not pooled)
   *
   * *DO NOT CALL MANUALLY! CALLED IN SCENE.__TICK*
   *
   * @since 3.0.0
   */
  public __tick() {
    // implement
  }
}
