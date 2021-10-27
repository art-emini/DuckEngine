import { Duck } from '../../../index';
import Game from '../../game';
import GameObject from '../gameObject';

/**
 * @class Text
 * @classdesc Creates a DuckEngine Text
 * @description The Button Class. Renders Text to the canvas
 * @extends GameObject
 * @since 1.0.0-beta
 */
export default class Text extends GameObject {
	public text: string;
	private config: Duck.Types.Interactive.Text.Config;
	public x: number;
	public y: number;
	public game: Game;
	/**
	 * @constructor
	 * @description Creates a Text instance.
	 * @param {string} text Text string
	 * @param {Duck.Types.Interactive.Text.Config} config Text configuration, styles, position and more
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
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

		this.zIndex = 4;
	}

	/**
	 * @description Draws the text.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
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

	/**
	 * @memberof Text
	 * @description Sets the text string
	 * @param {string} text
	 * @since 1.0.0-beta
	 */
	public setText(text: string) {
		this.text = text;
	}
}
