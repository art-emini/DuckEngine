import { Duck } from '../../../index';
import extractNumbers from '../../../utils/extractNumbers';
import Game from '../../game';
import Texture from '../../models/texture';
import Scene from '../../scene';
import GameObject from '../gameObject';

/**
 * @class Text
 * @classdesc Creates a DuckEngine Text
 * @description The Button Class. Renders Text to the canvas
 * @extends GameObject
 * @since 1.0.0-beta
 */
export default class Text extends GameObject<'color'> {
	/**
	 * @memberof Text
	 * @description Text string
	 * @type string
	 * @since 1.0.0-beta
	 */
	public text: string;
	protected config: Duck.Types.Interactive.Text.Config;

	/**
	 * @constructor Text
	 * @description Creates a Text instance.
	 * @param {string} text Text string
	 * @param {Duck.Types.Interactive.Text.Config} config Text configuration, styles, position and more
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(
		text: string,
		config: Duck.Types.Interactive.Text.Config,
		game: Game,
		scene: Scene
	) {
		super(
			'rect',
			config.x,
			config.y,
			0,
			0,
			0,
			Texture.fromColor(text, 0, 0),
			game,
			scene
		);
		this.text = text;
		this.config = config;
		this.game = game;

		// set w and h
		this.w = this.game.renderer.measureText(
			config.styles.fontCSS,
			this.text
		).width;
		this.h = extractNumbers(config.styles.fontCSS);

		this.texture.setScale({
			width: this.w,
			height: this.h,
		});

		this.zIndex = Duck.Layers.Rendering.zIndex.text;
	}

	/**
	 * @description Draws the text.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.setFont(this.config.styles.fontCSS);
			this.game.renderer.setLineWidth(
				this.config.styles.strokeWidth || 1
			);
			this.game.renderer.setStrokeColor(
				this.config.styles.strokeColor || '#000'
			);
			this.game.renderer.setFillColor(
				this.config.styles.fillColor || '#000'
			);

			if (this.config.method === 'draw') {
				this.game.renderer.drawText(
					this.text,
					this.position.x,
					this.position.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method === 'stroke') {
				this.game.renderer.strokeText(
					this.text,
					this.position.x,
					this.position.y,
					this.config.styles.maxWidth
				);
			}

			if (this.config.method === 'draw-stroke') {
				this.game.renderer.drawText(
					this.text,
					this.position.x,
					this.position.y,
					this.config.styles.maxWidth
				);

				this.game.renderer.strokeText(
					this.text,
					this.position.x,
					this.position.y,
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
