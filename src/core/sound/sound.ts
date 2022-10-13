import { Duck } from '../..';
import Game from '../game';
import Scene from '../scene';
import BaseSoundPlayer from './models/baseSoundPlayer';
import HTMLSoundPlayer from './models/htmlSoundPlayer';
import WebSoundPlayer from './models/webSoundPlayer';

/**
 * @class Sound
 * @classdesc Creates a Sound class.
 * @description The Sound Class. Uses either the DuckEngine WebAudio or HTMLAudio sound player classes to play audio
 * @since 3.0.0
 */
export default class Sound {
  /**
   * @memberof Sound
   * @description Path to sound file for HTMLSoundPlayer OR the key of a preloaded AudioBuffer for WebSoundPlayer
   * @type string
   * @since 3.0.0
   */
  public pathOrKey: string;

  /**
   * @memberof Sound
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

  /**
   * @memberof Sound
   * @description Scene instance
   * @type Scene
   * @since 3.0.0
   */
  public scene: Scene;

  /**
   * @memberof Sound
   * @description The DuckEngine sound player being used
   * @type BaseSoundPlayer
   * @since 3.0.0
   */
  public soundPlayer: BaseSoundPlayer;

  /**
   * @constructor Sound
   * @description Creates a Sound instance
   * @param {string} path Path to sound file
   * @param {Game} game Game instance
   * @param {Duck.Types.Sound.SoundPlayerType} [soundPlayer] Specify preference for WebAudio use or HTMLAudio use, optional, default => AUTO
   * @param {Duck.Types.Sound.HtmlAudioConfig} [htmlAudioOptions] HTMLSoundPlayer Configuration, optional, only in use if HTMLSoundPlayer is being used
   * @since 3.0.0
   */
  constructor(
    pathOrKey: string,
    game: Game,
    scene: Scene,
    soundPlayer?: Duck.Types.Sound.SoundPlayerType,
    htmlAudioOptions?: Duck.Types.Sound.HtmlAudioConfig
  ) {
    this.pathOrKey = pathOrKey;
    this.game = game;
    this.scene = scene;

    if (soundPlayer === 'WebAudio') {
      this.soundPlayer = new WebSoundPlayer(
        this.pathOrKey,
        this.game,
        this.scene
      );
    } else if (soundPlayer === 'HTMLAudio') {
      this.soundPlayer = new HTMLSoundPlayer(
        this.pathOrKey,
        this.game,
        htmlAudioOptions
      );
    } else if (window.AudioContext) {
      this.soundPlayer = new WebSoundPlayer(
        this.pathOrKey,
        this.game,
        this.scene
      );
    } else {
      this.soundPlayer = new HTMLSoundPlayer(
        this.pathOrKey,
        this.game,
        htmlAudioOptions
      );
    }
  }
}
