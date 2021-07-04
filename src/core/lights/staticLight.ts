import convertColorToRGBA from '../../helper/color/convertColorToRGBA';
import Debug from '../debug/debug';
import Game from '../game';

export default class StaticLight {
	public x: number;
	public y: number;
	public r: number;
	private color: string;
	private alpha: number;
	private game: Game;

	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		alpha: number,
		game: Game
	) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.alpha = alpha;
		this.game = game;

		this.color = fillColor;

		// convert all colors to RGBA
		this.color = convertColorToRGBA(this.color, this.alpha);
	}

	public draw() {
		if (this.game.ctx) {
			this.game.ctx.globalCompositeOperation = 'lighter';
			this.game.ctx.beginPath();
			this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			this.game.ctx.fillStyle = this.color;
			this.game.ctx.fill();
			this.game.ctx.globalCompositeOperation = 'source-over';
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}

	public setFillColor(color: string, alpha: number) {
		this.color = convertColorToRGBA(color, alpha);
	}
}
