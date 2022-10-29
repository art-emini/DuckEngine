import Game from '../../game';
import SoundSprite from './misc/soundSprite';

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
   * @type SoundSprite[]
   * @since 3.0.0
   */
  protected soundSprites: SoundSprite[];

  constructor(path: string, game: Game) {
    this.path = path;
    this.game = game;
    this.soundSprites = [];
  }

  /**
   * @memberof BaseSoundPlayer
   * @description Plays the audio
   * @param {number} [offset] Where to start play the audio, in milliseconds, optional -> default: undefined
   * @param {number} [duration] Where to start play the audio, in milliseconds, optional -> default: undefined
   * @abstract
   * @since 3.0.0
   */
  public abstract play(offset?: number, duration?: number): void;

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
   * @description Seeks and plays the audio
   * @param {number} timeInMilliseconds The time in milliseconds to seek to
   * @param {boolean} [play] Determines to play right after seeking, optional, defaults -> false
   * @abstract
   * @since 3.0.0
   */
  public abstract seek(timeInMilliseconds: number, play?: boolean): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Restarts the audio
   * @param {boolean} [play] Determines to play right after restarting, optional, defaults -> false
   * @abstract
   * @since 3.0.0
   */
  public abstract restart(play?: boolean): void;

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
   * @description Plays a SoundSprite based of passed key
   * @param {string} key The key of the SoundSprite to find and play
   * @abstract
   * @since 3.0.0
   */
  public abstract playSoundSprite(key: string): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Creates a SoundSprite
   * @param {string} key The key of the SoundSprite
   * @param {number} startInMilliseconds The starting time in milliseconds of when the SoundSprite starts
   * @param {number} endInMilliseconds The ending time in milliseconds of when the SoundSprite ends
   * @abstract
   * @since 3.0.0
   */
  public abstract createSoundSprite(
    key: string,
    startInMilliseconds: number,
    endInMilliseconds: number
  ): void;

  /**
   * @memberof BaseSoundPlayer
   * @description Removes a SoundSprite from the soundSprites array
   * @param {string} key The key of the SoundSprite to find and remove
   * @abstract
   * @since 3.0.0
   */
  public abstract removeSoundSprite(key: string): void;

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

  /**
   * @memberof BaseSoundPlayer
   * @description Gets the current time of the sound playing in milliseconds
   * @abstract
   * @since 3.0.0
   */
  public abstract get currentTime(): number;
}
