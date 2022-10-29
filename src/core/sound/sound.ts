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
   * @param {Duck.Types.Sound.SoundPlayerType} [soundPlayerType] Specify preference for WebAudio use or HTMLAudio use, optional, default => AUTO
   * @param {Duck.Types.Sound.SoundConfig} [soundConfig] SoundConfig, for use in both WebAudio and HtmlAudio sound players, option, default => undefined
   * @since 3.0.0
   */
  constructor(
    pathOrKey: string,
    game: Game,
    scene: Scene,
    soundPlayerType?: Duck.Types.Sound.SoundPlayerType,
    soundConfig?: Duck.Types.Sound.SoundConfig
  ) {
    this.pathOrKey = pathOrKey;
    this.game = game;
    this.scene = scene;

    if (soundPlayerType === 'WebAudio') {
      this.soundPlayer = new WebSoundPlayer(
        this.pathOrKey,
        this.game,
        this.scene,
        soundConfig
      );
    } else if (soundPlayerType === 'HTMLAudio') {
      this.soundPlayer = new HTMLSoundPlayer(
        this.pathOrKey,
        this.game,
        soundConfig
      );
    } else if (window.AudioContext) {
      this.soundPlayer = new WebSoundPlayer(
        this.pathOrKey,
        this.game,
        this.scene,
        soundConfig
      );
    } else {
      this.soundPlayer = new HTMLSoundPlayer(
        this.pathOrKey,
        this.game,
        soundConfig
      );
    }
  }
}
