import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import BaseSoundPlayer from './baseSoundPlayer';

export default class HTMLSoundPlayer extends BaseSoundPlayer {
  public element: HTMLAudioElement;

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

  public play() {
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

  public seek(timeInSeconds: number) {
    this.element.currentTime = timeInSeconds;
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
