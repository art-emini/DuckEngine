/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Scene from '../../scene';
import BaseSoundPlayer from './baseSoundPlayer';
import SoundSprite from './misc/soundSprite';

/**
 * @class WebSoundPlayer
 * @classdesc Creates a WebSoundPlayer class.
 * @description The WebSoundPlayer Class. Uses WebAudio API to play sound
 * @extends BaseSoundPlayer
 * @since 3.0.0
 */
export default class WebSoundPlayer extends BaseSoundPlayer {
  /**
   * @memberof WebSoundPlayer
   * @description The AudioContext
   * @type AudioContext
   * @since 3.0.0
   */
  public context: AudioContext;

  /**
   * @memberof WebSoundPlayer
   * @description The AudioBufferSourceNode
   * @type AudioBufferSourceNode
   * @since 3.0.0
   */
  public sourceNode: AudioBufferSourceNode;

  /**
   * @memberof WebSoundPlayer
   * @description The AudioBuffer
   * @type AudioBuffer
   * @since 3.0.0
   */
  public audioBuffer: AudioBuffer;

  /**
   * @memberof WebSoundPlayer
   * @description The GainNode
   * @type GainNode
   * @since 3.0.0
   */
  public gainNode: GainNode;

  protected seekTo: number | undefined;

  protected paused: boolean;
  protected muted: boolean;
  protected volume: number;
  protected looping: boolean;

  /**
   * @constructor WebSoundPlayer
   * @description Creates a Sound instance
   * @param {string} key Key of preloaded audio buffer
   * @param {Duck.Types.Sound.SoundConfig} soundConfig SoundConfig, optional, defaults => undefined
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(
    key: string,
    game: Game,
    scene: Scene,
    soundConfig?: Duck.Types.Sound.SoundConfig
  ) {
    super(key, game);

    // find preloaded audio buffer
    this.audioBuffer = scene.loader.audioBufferStack.find(
      (a) => a.key === key
    )!.value;

    if (!this.audioBuffer) {
      new Debug.Error(
        `Cannot find AudioBuffer from loader.audioBufferStack with key "${key}"`
      );
    }

    this.context = new AudioContext();
    this.sourceNode = this.context.createBufferSource();
    this.gainNode = this.context.createGain();

    this.gainNode.connect(this.context.destination);
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.buffer = this.audioBuffer;

    this.seekTo = undefined;

    this.paused = true;
    this.muted = false;
    this.volume = 1;
    this.looping = false;

    this.gainNode.gain.value = this.volume; // 1

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

    // use passed soundConfig
    if (soundConfig?.volume) {
      this.setVolume(soundConfig.volume);
    }

    if (soundConfig?.loop) {
      this.loop(soundConfig.loop);
    }

    if (soundConfig?.autoplay) {
      this.play();
    }
  }

  /**
   * @memberof WebSoundPlayer
   * @description Resets context, sourceNode, gainNode. Reconnects gainNode and sourceNode. Resets sourceNode buffer
   * @abstract
   * @since 3.0.0
   */
  public recreateNodes() {
    this.context = new AudioContext();
    this.sourceNode = this.context.createBufferSource();
    this.gainNode = this.context.createGain();

    this.gainNode.connect(this.context.destination);
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.buffer = this.audioBuffer;

    // reset states
    this.setVolume(this.volume);
    if (this.muted) {
      this.mute();
    } else {
      this.unmute();
    }
    this.loop(this.looping);
  }

  public play(offset?: number, duration?: number) {
    this.paused = false;

    if (this.context.state === 'suspended') {
      this.context.resume();
    } else {
      this.sourceNode.start(0, this.seekTo || offset, duration);

      this.seekTo = undefined;
    }
  }

  public pause() {
    if (this.context.state === 'running') {
      this.context.suspend();
      this.paused = true;
    }
  }

  public stop() {
    this.sourceNode.disconnect();
    this.gainNode.disconnect();
  }

  public mute() {
    this.muted = true;

    // preserve original volume
    this.volume = this.gainNode.gain.value;

    // set to 0
    this.gainNode.gain.value = 0;
  }

  public unmute() {
    this.muted = false;

    // use preserved original volume
    this.gainNode.gain.value = this.volume;
  }

  public loop(loop: boolean) {
    this.sourceNode.loop = loop;
    this.looping = loop;
  }

  public seek(timeInMilliseconds: number, play?: boolean) {
    this.pause();
    this.stop();

    this.recreateNodes();

    if (play) {
      this.seekTo = undefined;
      this.play(timeInMilliseconds / 1000);
    } else {
      this.seekTo = timeInMilliseconds / 1000;
    }
  }

  public restart(play?: boolean) {
    this.pause();
    this.stop();

    this.recreateNodes();

    if (play) {
      this.play();
    }
  }

  public setVolume(volume: number) {
    this.volume = volume;
    this.gainNode.gain.value = this.volume;
  }

  public fadeVolume(
    targetVolume: number,
    amount: number,
    ms: number,
    cb?: () => void
  ) {
    // make sure it is positive
    amount = Math.abs(amount);

    const direction = targetVolume < this.currentVolume ? -1 : +1; // determines fade in or fade out
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

      if (direction === 1) {
        const newVolume = this.currentVolume + amount;
        this.setVolume(newVolume); // set volume
      } else {
        const newVolume = this.currentVolume - amount;
        this.setVolume(newVolume); // set volume
      }
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

  public get duration() {
    return this.audioBuffer.duration;
  }

  public get isPlaying() {
    return !this.paused;
  }

  public get isPaused() {
    return this.paused;
  }

  public get currentVolume() {
    return this.gainNode.gain.value;
  }

  public get isMuted() {
    return this.muted;
  }

  public get isLooping() {
    return this.looping;
  }

  public get currentTime() {
    return this.context.currentTime * 1000;
  }
}
