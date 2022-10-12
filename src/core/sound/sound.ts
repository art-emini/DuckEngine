import Game from '../game';

/**
 * @class Sound
 * @classdesc Creates a Sound class.
 * @description The Sound Class. Uses either the DuckEngine WebAudio or HTMLAudio sound player classes to play audio
 * @since 3.0.0
 */
export default class Sound {
  /**
   * @memberof Sound
   * @description Path to sound file
   * @type string
   * @since 3.0.0
   */
  public path: string;

  /**
   * @memberof Sound
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

  /**
   * @memberof Sound
   * @description The DuckEngine sound player being used
   * @type Game
   * @since 3.0.0
   */

  constructor(path: string, game: Game) {
    this.path = path;
    this.game = game;
  }
}
