import Game from '../game';

export default abstract class BaseRenderer {
	public game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	abstract clearFrame(): void;
	abstract drawRect(): void;
	abstract drawCircle(): void;
	abstract drawRoundRect(): void;
	abstract drawSprite(): void;
}
