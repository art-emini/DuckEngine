import { Duck } from '../../index';
import Game from '../game';
import GameObject from '../gameobjects/gameObject';

export default class Text extends GameObject {
	public text: string;
	private config: Duck.Types.Interactive.Text.Config;
	public x: number;
	public y: number;
	public game: Game;

	constructor(
		text: string,
		config: Duck.Types.Interactive.Text.Config,
		game: Game
	) {
		super('rect', config.x, config.y, 0, 0, 0, text, game);
		this.text = text;
		this.config = config;
		this.x = this.config.x;
		this.y = this.config.y;
		this.game = game;
	}

	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.font = this.config.styles.fontCSS;

			if (this.config.method === 'draw') {
				this.game.ctx.fillStyle =
					this.config.styles.fillColor || '#000';
				this.game.ctx.strokeStyle =
					this.config.styles.strokeColor || '#000';

				this.game.ctx.fillText(
					this.text,
					this.x,
					this.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method === 'stroke') {
				this.game.ctx.lineWidth = this.config.styles.strokeWidth || 1;

				this.game.ctx.strokeText(
					this.text,
					this.x,
					this.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method === 'draw-stroke') {
				this.game.ctx.lineWidth = this.config.styles.strokeWidth || 1;
				this.game.ctx.strokeStyle =
					this.config.styles.strokeColor || '#000';
				this.game.ctx.fillStyle =
					this.config.styles.fillColor || '#000';

				this.game.ctx.fillText(
					this.text,
					this.x,
					this.y,
					this.config.styles.maxWidth
				);

				this.game.ctx.strokeText(
					this.text,
					this.x,
					this.y,
					this.config.styles.maxWidth
				);
			}
		}
	}

	public setText(text: string) {
		this.text = text;
	}
}
