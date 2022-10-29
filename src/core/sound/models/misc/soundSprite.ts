import Game from '../../../game';
import BaseSoundPlayer from '../baseSoundPlayer';

/**
 * @class SoundSprite
 * @classdesc Creates a SoundSprite class.
 * @description The SoundSprite Class. Holds information about a clip of audio
 * @since 3.0.0
 */
export default class SoundSprite {
  /**
   * @memberof SoundSprite
   * @description Key of SoundSprite
   * @type string
   * @readonly
   * @since 3.0.0
   */
  public readonly key: string;

  /**
   * @memberof SoundSprite
   * @description The starting time in milliseconds of when the SoundSprite starts
   * @type number
   * @since 3.0.0
   */
  public start: number;

  /**
   * @memberof SoundSprite
   * @description The ending time in milliseconds of when the SoundSprite ends
   * @type number
   * @since 3.0.0
   */
  public end: number;

  /**
   * @memberof SoundSprite
   * @description The sound player, either HTMLSoundPlayer or WebSoundPlayer
   * @type BaseSoundPlayer
   * @since 3.0.0
   */
  public soundPlayer: BaseSoundPlayer;

  /**
   * @memberof SoundSprite
   * @description Game instance
   * @type game
   * @since 3.0.0
   */
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

  public play() {
    this.soundPlayer.seek(this.start, true);

    // check time if is past end
    const interval = setInterval(() => {
      if (this.soundPlayer.currentTime >= this.end) {
        this.soundPlayer.stop();
        this.soundPlayer.restart(false);
        clearInterval(interval);
      }
    }, 1);
  }
}
