import Game from '../../game';
import BaseRenderer from '../baseRenderer';

export default class WebGLRenderer extends BaseRenderer {
	public gl: WebGLRenderingContext;

	constructor(game: Game) {
		super(game);

		this.gl = this.game.canvas.getContext(
			'webgl2'
		) as WebGLRenderingContext;
	}

	public clearFrame() {
		// not implemented
	}

	public drawRect() {
		// not implemented
	}

	public drawCircle() {
		// not implemented
	}

	public drawRoundRect() {
		// not implemented
	}

	public drawSprite() {
		// not implemented
	}
}
