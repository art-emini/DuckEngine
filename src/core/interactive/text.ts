import { Duck } from '../../index';
import Game from '../game';

export default class Text {
	private text: string;
	private config: Duck.Interactive.Text.Config;
	private game: Game;

	constructor(
		text: string,
		config: Duck.Interactive.Text.Config,
		game: Game
	) {
		this.text = text;
		this.config = config;
		this.game = game;
	}

	public draw() {
		if (this.game.ctx) {
			this.game.ctx.font = this.config.styles.fontCSS;

			if (this.config.method == 'draw') {
				this.game.ctx.fillStyle =
					this.config.styles.fillColor || '#000';
				this.game.ctx.strokeStyle =
					this.config.styles.strokeColor || '#000';

				this.game.ctx.fillText(
					this.text,
					this.config.x,
					this.config.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method == 'stroke') {
				this.game.ctx.lineWidth = this.config.styles.strokeWidth || 1;

				this.game.ctx.strokeText(
					this.text,
					this.config.x,
					this.config.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method == 'draw-stroke') {
				this.game.ctx.lineWidth = this.config.styles.strokeWidth || 1;
				this.game.ctx.strokeStyle =
					this.config.styles.strokeColor || '#000';
				this.game.ctx.fillStyle =
					this.config.styles.fillColor || '#000';

				this.game.ctx.fillText(
					this.text,
					this.config.x,
					this.config.y,
					this.config.styles.maxWidth
				);

				this.game.ctx.strokeText(
					this.text,
					this.config.x,
					this.config.y,
					this.config.styles.maxWidth
				);
			}
		}
	}
}
