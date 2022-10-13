/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Debug from '../../debug/debug';
import Game from '../../game';
import Scene from '../../scene';
import BaseSoundPlayer from './baseSoundPlayer';

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

  protected paused: boolean;
  protected muted: boolean;
  protected volume: number;

  /**
   * @constructor WebSoundPlayer
   * @description Creates a Sound instance
   * @param {string} key Key of preloaded audio buffer
   * @param {Game} game Game instance
   * @since 3.0.0
   */
  constructor(key: string, game: Game, scene: Scene) {
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

    this.paused = true;
    this.muted = false;
    this.volume = 1;

    this.gainNode.gain.value = 1;
  }

  public play() {
    this.paused = false;

    if (this.context.state === 'suspended') {
      this.context.resume();
    } else {
      this.sourceNode.start(0);
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
  }

  public seek(timeInSeconds: number) {
    this.stop();

    this.paused = false;
    this.sourceNode.start(0, timeInSeconds);
  }

  public restart() {
    this.stop();

    this.paused = false;
    this.sourceNode.start(0, 0);
  }

  public setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }

  public get duration() {
    return this.audioBuffer.duration;
  }

  public get isPlaying() {
    return !this.paused;
  }

  public get currentVolume() {
    return this.gainNode.gain.value;
  }

  public get isMuted() {
    return this.muted;
  }
}
