import Game from '../../game';
import BaseSoundPlayer from './baseSoundPlayer';

export default class WebSoundPlayer extends BaseSoundPlayer {
  constructor(path: string, game: Game) {
    super(path, game);
  }
}
