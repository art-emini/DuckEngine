import Game from '../../../game';
import BaseSoundPlayer from '../baseSoundPlayer';

/**
 * @class SoundSprite
 * @classdesc Creates a SoundSprite class.
 * @description The SoundSprite Class. Holds information about a clip of audio
 * @since 3.0.0
 */
export default class SoundSprite {
  public readonly key: string;

  public start: number;
  public end: number;

  public soundPlayer: BaseSoundPlayer;
  public game: Game;

  /**
   * @constructor SoundSprite
   * @description Creates a SoundSprite instance
   * @param {string} path Path to sound file
   * @param {Game} game Game instance
   * @since 3.0.0
   */
  constructor(
    key: string,
    startInMilliseconds: number,
    endInMilliseconds: number,
    soundPlayer: BaseSoundPlayer,
    game: Game
  ) {
    this.key = key;

    this.start = startInMilliseconds;
    this.end = endInMilliseconds;

    this.soundPlayer = soundPlayer;
    this.game = game;
  }
}
