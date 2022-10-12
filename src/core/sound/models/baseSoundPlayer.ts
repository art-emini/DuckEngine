import Game from '../../game';

export default abstract class BaseSoundPlayer {
  public path: string;
  public game: Game;

  constructor(path: string, game: Game) {
    this.path = path;
    this.game = game;
  }

  abstract play(): void;
  abstract play(duration: number): void;

  abstract pause(): void;
  abstract stop(): void;

  abstract mute(): void;
  abstract unmute(): void;

  abstract loop(loop?: boolean): void;

  abstract seek(timeInSeconds: number): void;
  abstract restart(): void;

  abstract setVolume(volume: number): void;

  abstract get duration(): number;
  abstract get isPlaying(): boolean;
  abstract get currentVolume(): number;
  abstract get isMuted(): boolean;

  abstract playSprite(key: string): void;
}
