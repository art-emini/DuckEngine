import Game from '../../game';
import BaseRenderer from '../baseRenderer';

export default class CanvasRenderer extends BaseRenderer {
	public ctx: CanvasRenderingContext2D;

	constructor(game: Game) {
		super(game);

		this.ctx = this.game.canvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;
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
