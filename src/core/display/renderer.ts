import Game from '../game';
import CanvasRenderer from './canvas/canvasRenderer';

export default class Renderer {
	public game: Game;

	public api: CanvasRenderer;

	constructor(game: Game) {
		this.game = game;

		this.api = new CanvasRenderer(this.game);
	}
}
