import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import BaseSoundPlayer from './baseSoundPlayer';
import SoundSprite from './misc/soundSprite';

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
   * @param {Duck.Types.Sound.SoundConfig} [soundConfig] SoundConfig, optional, defaults => undefined
   * @since 3.0.0
   */
  constructor(
    path: string,
    game: Game,
    soundConfig?: Duck.Types.Sound.SoundConfig
  ) {
    super(path, game);

    this.element = document.createElement('audio');

    this.element.className = 'duckengine-audio-sound';
    this.element.style.display = 'none';
    this.element.controls = false;
    this.element.src = this.path;
    this.element.volume = soundConfig?.volume || 1;
    this.element.autoplay = soundConfig?.autoplay || false;
    this.element.loop = soundConfig?.loop || false;

    if (soundConfig?.volume === 0) {
      this.mute();
    }

    this.soundSprites = [];

    // populate SoundSprites
    if (soundConfig?.spriteStructs) {
      for (const struct of soundConfig.spriteStructs) {
        this.soundSprites.push(
          new SoundSprite(
            struct.key,
            struct.startInMilliSeconds,
            struct.endInMilliSeconds,
            this,
            this.game
          )
        );
      }
    }

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

  public seek(timeInMilliseconds: number, play?: boolean) {
    this.element.currentTime = timeInMilliseconds / 1000;
    if (play) {
      this.play();
    }
  }

  public restart(play?: boolean) {
    this.seek(0);

    if (play) {
      this.play;
    }
  }

  public playSoundSprite(key: string) {
    const foundSprite = this.soundSprites.find(
      (_sprite) => _sprite.key === key
    );

    if (foundSprite) {
      foundSprite.play();
    } else {
      new Debug.Error(`Cannot find sound sprite with key: "${key}".`);
    }
  }

  public createSoundSprite(
    key: string,
    startInMilliseconds: number,
    endInMilliseconds: number
  ) {
    this.soundSprites.push(
      new SoundSprite(
        key,
        startInMilliseconds,
        endInMilliseconds,
        this,
        this.game
      )
    );
  }

  public removeSoundSprite(key: string) {
    const foundSprite = this.soundSprites.find(
      (_sprite) => _sprite.key === key
    );

    if (foundSprite) {
      const index = this.soundSprites.indexOf(foundSprite);
      this.soundSprites.splice(index, 1);
    }
  }

  public setVolume(volume: number) {
    this.element.volume = volume;
  }

  public fadeVolume(
    targetVolume: number,
    amount: number,
    ms: number,
    cb?: () => void
  ) {
    const direction = amount < 0 ? -1 : +1; // determines fade in or fade out
    const interval = setInterval(() => {
      // check if currentVolume reached or surpassed targetVolume
      const fixedVolume = Number(this.currentVolume.toFixed(2));
      if (direction === 1) {
        if (fixedVolume >= targetVolume) {
          this.setVolume(targetVolume);

          if (cb) {
            cb();
          }

          clearInterval(interval);
          return;
        }
      } else {
        if (fixedVolume <= targetVolume) {
          this.setVolume(targetVolume);

          if (cb) {
            cb();
          }

          clearInterval(interval);
          return;
        }
      }

      const newVolume = this.currentVolume + amount;
      this.setVolume(newVolume); // set volume
    }, ms);
  }

  public fadeVolumeAndPlay(
    targetVolume: number,
    amount: number,
    ms: number,
    cb?: () => void,
    offset?: number,
    duration?: number
  ) {
    const direction = amount < 0 ? -1 : +1;
    if (direction === 1) {
      // set volume to 0
      this.setVolume(0);
    }
    if (direction === -1) {
      // set volume to 1
      this.setVolume(1);
    }
    this.fadeVolume(targetVolume, amount, ms, cb);
    this.play(offset, duration);
  }

  public fadeVolumeAndPause(
    targetVolume: number,
    amount: number,
    ms: number,
    cb?: () => void
  ) {
    this.fadeVolume(targetVolume, amount, ms, () => {
      this.pause();
      if (cb) {
        cb();
      }
    });
  }

  public fadeVolumeAndStop(
    targetVolume: number,
    amount: number,
    ms: number,
    cb?: () => void
  ) {
    this.fadeVolume(targetVolume, amount, ms, () => {
      this.stop();
      if (cb) {
        cb();
      }
    });
  }

  public get duration() {
    return this.element.duration;
  }

  public get isPlaying() {
    return !this.element.paused;
  }

  public get isPaused() {
    return this.element.paused;
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
}
