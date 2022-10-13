import { Duck } from '../../..';
import Game from '../../game';

/**
 * @class BaseSoundPlayer
 * @classdesc Abstract BaseSoundPlayer class.
 * @description The BaseSoundPlayer Class. WebSoundPlayer and HTMLSoundPlayer classes extend this abstract class
 * @abstract
 * @since 3.0.0
 */
export default abstract class BaseSoundPlayer {
  /**
   * @memberof BaseSoundPlayer
   * @description Path to sound file
   * @type string
   * @since 3.0.0
   */
  public path: string;

  /**
   * @memberof BaseSoundPlayer
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

  /**
   * @memberof BaseSoundPlayer
   * @description Audio Sprites
   * @type Duck.Types.Sound.Sprite[]
   * @since 3.0.0
   */
  protected sprites: Duck.Types.Sound.Sprite[];

  constructor(path: string, game: Game) {
    this.path = path;
    this.game = game;
    this.sprites = [];
  }

  /**
   * @memberof BaseSoundPlayer
   * @description Plays the audio
   * @abstract
   * @since 3.0.0
   */
  public abstract play(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Pauses the audio
   * @abstract
   * @since 3.0.0
   */
  public abstract pause(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Stops the audio, disconnects nodes for WebSoundPlayer, **not an alias to BaseSoundPlayer.pause**
   * @abstract
   * @since 3.0.0
   */
  public abstract stop(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Mutes the audio
   * @abstract
   * @since 3.0.0
   */
  public abstract mute(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Unmutes the audio
   * @abstract
   * @since 3.0.0
   */
  public abstract unmute(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Sets a boolean if the audio should loop or not
   * @param {boolean} loop Boolean to loop the audio or not
   * @abstract
   * @since 3.0.0
   */
  public abstract loop(loop: boolean): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Seeks the audio
   * @param {number} timeInSeconds The time in seconds to seek to
   * @abstract
   * @since 3.0.0
   */
  public abstract seek(timeInSeconds: number): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Restarts the audio
   * @abstract
   * @since 3.0.0
   */
  public abstract restart(): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Sets the volume of the audio
   * @param {number} volume The volume to set the audio to, a decimal value (0.1 - 1)
   * @abstract
   * @since 3.0.0
   */
  public abstract setVolume(volume: number): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Gets the duration of the sound
   * @abstract
   * @since 3.0.0
   */
  public abstract get duration(): number;

  /**
   * @memberof BaseSoundPlayer
   * @description Gets the playing state of the sound
   * @abstract
   * @since 3.0.0
   */
  public abstract get isPlaying(): boolean;

  /**
   * @memberof BaseSoundPlayer
   * @description Gets the current volume of the sound
   * @abstract
   * @since 3.0.0
   */
  public abstract get currentVolume(): number;

  /**
   * @memberof BaseSoundPlayer
   * @description Gets the mute state of the sound
   * @abstract
   * @since 3.0.0
   */
  public abstract get isMuted(): boolean;
}
