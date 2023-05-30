import Game from '../game';
import Scene from '../scene';
import KeyboardInput from './keyboardInput';
import MouseInput from './mouseInput';

/**
 * @class Input
 * @classdesc Creates a DuckEngine Input
 * @description The Input Class. Main inputs are captured here
 * @since 1.0.0-beta
 */
export default class Input {
  /**
   * @memberof Input
   * @description Game instance
   * @type Game
   * @since 1.0.0-beta
   */
  public game: Game;

  /**
   * @memberof Input
   * @description Scene instance
   * @type Scene
   * @since 2.0.0
   */
  public scene: Scene;

  /**
   * @constructor Input
   * @description Creates an Input instance.
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 1.0.0-beta
   */
  constructor(game: Game, scene: Scene) {
    this.game = game;
    this.scene = scene;
  }

  /**
   * @memberof Input
   * @description Creates a KeyboardInput instance
   * @returns {KeyboardInput}
   * @since 2.0.0
   */
  public createKeyboardInput() {
    return new KeyboardInput(this.game, this.scene);
  }

  /**
   * @memberof Input
   * @description Creates a MouseInput instance
   * @returns {MouseInput}
   * @since 2.0.0
   */
  public createMouseInput() {
    return new MouseInput(this.game, this.scene);
  }
}
