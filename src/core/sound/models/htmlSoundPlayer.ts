import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import BaseSoundPlayer from './baseSoundPlayer';

/**
 * @class HTMLSoundPlayer
 * @classdesc Creates a HTMLSoundPlayer class.
 * @description The HTMLSoundPlayer Class. Uses HTMLAudio to play sound
 * @extends BaseSoundPlayer
 * @since 3.0.0
 */
export default class HTMLSoundPlayer extends BaseSoundPlayer {
  /**
   * @memberof HTMLSoundPlayer
   * @description HTMLAudioElement that is playing audio
   * @type HTMLAudioElement
   * @since 3.0.0
   */
  public element: HTMLAudioElement;

  /**
   * @constructor HTMLSoundPlayer
   * @description Creates a HTMLSoundPlayer instance
   * @param {string} path Path to sound file
   * @param {Game} game Game instance
   * @param {Duck.Types.Sound.HtmlAudioConfig} [htmlAudioOptions] HTMLSoundPlayer Configuration, optional
   * @since 3.0.0
   */
  constructor(
    path: string,
    game: Game,
    htmlAudioOptions?: Duck.Types.Sound.HtmlAudioConfig
  ) {
    super(path, game);

    this.element = document.createElement('audio');

    this.element.className = 'duckengine-audio-sound';
    this.element.style.display = 'none';
    this.element.controls = false;
    this.element.src = this.path;
    this.element.volume = htmlAudioOptions?.volume || 1;
    this.element.autoplay = htmlAudioOptions?.autoplay || false;
    this.element.loop = htmlAudioOptions?.loop || false;

    if (htmlAudioOptions?.volume === 0) {
      this.mute();
    }

    this.sprites = htmlAudioOptions?.sprites || [];

    document.body.appendChild(this.element);
  }

  public play(offset?: number, duration?: number) {
    if (offset) {
      this.seek(this.currentTime + offset);
    }

    if (duration) {
      const timeout = setTimeout(() => {
        this.pause();
        clearTimeout(timeout);
      }, duration);
    }

    this.element.play();
  }

  public pause() {
    this.element.pause();
  }

  public mute() {
    this.element.muted = true;
  }

  public unmute() {
    this.element.muted = false;
  }

  public stop() {
    this.pause();
  }

  public loop(loop = true) {
    this.element.loop = loop;
  }

  public seek(timeInMilliseconds: number) {
    this.element.currentTime = timeInMilliseconds / 1000;
  }

  public restart() {
    this.seek(0);
  }

  public setVolume(volume: number) {
    this.element.volume = volume;
  }

  public get duration() {
    return this.element.duration;
  }

  public get isPlaying() {
    return !this.element.paused;
  }

  public get currentVolume() {
    return this.element.volume;
  }

  public get isMuted() {
    return this.element.muted;
  }

  public get currentTime() {
    return this.element.currentTime * 1000;
  }

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
}
