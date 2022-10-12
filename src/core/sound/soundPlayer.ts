import { Duck } from '../../index';
import Debug from '../debug/debug';

/**
 * @class SoundPlayer
 * @classdesc Creates a SoundPlayer class.
 * @description The SoundPlayer Class. Plays audio
 * @since 1.0.0-beta
 */
export default class SoundPlayer {
  public path: string;
  public element: HTMLAudioElement;
  protected sprites: Duck.Types.Sound.Sprite[];

  /**
   * @constructor SoundPlayer
   * @description Creates a SoundPlayer instance
   * @param {string} path Path to sound file
   * @param {Duck.Types.Sound.Config} [options] Sound Configuration
   * @since 1.0.0-beta
   */
  constructor(path: string, options?: Duck.Types.Sound.Config) {
    this.path = path;
    this.element = document.createElement('audio');

    this.element.className = 'duckengine-audio-sound';
    this.element.style.display = 'none';
    this.element.controls = false;
    this.element.src = this.path;
    this.element.volume = options?.volume || 1;
    this.element.autoplay = options?.autoplay || false;
    this.element.loop = options?.loop || false;

    if (options?.volume === 0) {
      this.mute();
    }

    this.sprites = options?.sprites || [];

    document.body.appendChild(this.element);
  }

  /**
   * @memberof Sound
   * @description Plays the audio
   * @since 1.0.0-beta
   */
  public play() {
    this.element.play();
  }

  /**
   * @memberof Sound
   * @description Pauses the audio
   * @since 1.0.0-beta
   */
  public pause() {
    this.element.pause();
  }

  /**
   * @memberof Sound
   * @description Mutes the audio
   * @since 1.1.0
   */
  public mute() {
    this.element.muted = true;
  }

  /**
   * @memberof Sound
   * @description Unmutes the audio
   * @since 1.1.0
   */
  public unmute() {
    this.element.muted = false;
  }

  /**
   * @memberof Sound
   * @description Pauses the audio, alias to SoundPlayer.pause
   * @since 2.1.0
   */
  public stop() {
    this.pause();
  }

  /**
   * @memberof Sound
   * @description Sets the loop of the audio
   * @since 2.1.0
   */
  public loop(loop = true) {
    this.element.loop = loop;
  }

  /**
   * @memberof Sound
   * @description Seeks the audio
   * @param {number} timeInSeconds Time in seconds to seek to
   * @since 1.0.0-beta
   */
  public seek(timeInSeconds: number) {
    this.element.currentTime = timeInSeconds;
  }

  /**
   * @memberof Sound
   * @description Restarts the audio
   * @since 1.0.0-beta
   */
  public restart() {
    this.seek(0);
  }

  /**
   * @memberof Sound
   * @description Sets the volume of the audio
   * @since 1.0.0-beta
   */
  public setVolume(volume: number) {
    this.element.volume = volume;
  }

  /**
   * @memberof Sound
   * @description Gets the duration of the sound
   * @since 1.0.0-beta
   */
  public get duration() {
    return this.element.duration;
  }

  /**
   * @memberof Sound
   * @description Gets the playing state of the sound
   * @since 1.0.0-beta
   */
  public get isPlaying() {
    return !this.element.paused;
  }

  /**
   * @memberof Sound
   * @description Gets the volume of the sound
   * @since 1.0.0-beta
   */
  public get volume() {
    return this.element.volume;
  }

  /**
   * @memberof Sound
   * @description Gets the mute state of the sound
   * @since 1.0.0-beta
   */
  public get isMuted() {
    return this.element.muted;
  }

  /**
   * @memberof Sound
   * @description Plays a sound sprite based on the key
   * @param {string} key Key of the sound sprite
   * @since 1.0.0-beta
   */
  public playSprite(key: string) {
    const foundSprite = this.sprites.find((_sprite) => _sprite.key === key);

    if (foundSprite) {
      this.seek(foundSprite.startSeconds);

      if (!this.isPlaying) {
        this.play();
      }

      const int = setInterval(() => {
        if (foundSprite) {
          if (this.element.currentTime >= foundSprite.endSeconds) {
            clearInterval(int);
            this.pause();
            this.restart();
          }
        }
      }, 1000);
    } else {
      new Debug.Error(`Cannot find sound sprite with key: "${key}".`);
    }
  }

  /**
   * @memberof Sound
   * @description Sets the audio src/path
   * @param {string} path Audio src/path
   * @since 1.0.0-beta
   */
  public setPath(path: string) {
    this.path = path;
    this.element.src = this.path;
  }
}
