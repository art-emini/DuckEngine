import supportsWebGL from '../../utils/supportsWebGL';
import Game from '../game';
import CanvasRenderer from './canvas/canvasRenderer';
import WebGLRenderer from './webgl/webglRenderer';

export default class Renderer {
	public game: Game;

	public api: CanvasRenderer | WebGLRenderer;

	constructor(game: Game) {
		this.game = game;

		if (supportsWebGL()) {
			this.api = new WebGLRenderer(this.game);
		} else {
			this.api = new CanvasRenderer(this.game);
		}
	}
}
