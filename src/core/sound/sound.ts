import { Duck } from '../..';
import Game from '../game';
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
   * @description Path to sound file
   * @type string
   * @since 3.0.0
   */
  public path: string;

  /**
   * @memberof Sound
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

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
   * @since 1.0.0-beta
   */
  constructor(
    path: string,
    game: Game,
    soundPlayer?: Duck.Types.Sound.SoundPlayerType,
    htmlAudioOptions?: Duck.Types.Sound.HtmlAudioConfig
  ) {
    this.path = path;
    this.game = game;

    if (soundPlayer === 'WebAudio') {
      this.soundPlayer = new WebSoundPlayer(this.path, this.game);
    } else if (soundPlayer === 'HTMLAudio') {
      this.soundPlayer = new HTMLSoundPlayer(
        this.path,
        this.game,
        htmlAudioOptions
      );
    } else if (window.AudioContext) {
      this.soundPlayer = new WebSoundPlayer(this.path, this.game);
    } else {
      this.soundPlayer = new HTMLSoundPlayer(
        this.path,
        this.game,
        htmlAudioOptions
      );
    }
  }
}
