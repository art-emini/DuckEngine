/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Game from '../../game';
import Texture from '../../models/texture';
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
		this.ctx.clearRect(
			0,
			0,
			this.game.canvas.width,
			this.game.canvas.height
		);
	}

	public clearRect(x: number, y: number, w: number, h: number) {
		this.ctx.clearRect(x, y, w, h);
	}

	public drawRect(x: number, y: number, w: number, h: number, color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);
	}

	public drawCircle(x: number, y: number, r: number, color: string) {
		this.ctx.fillStyle = color;
		this.game.ctx.beginPath();
		this.game.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		this.game.ctx.fillStyle = color;
		this.game.ctx.fill();
	}

	public drawRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		color: string
	) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.game.ctx.fillStyle = color;
		this.game.ctx.beginPath();
		this.game.ctx.moveTo(x + r, y);
		this.game.ctx.arcTo(x + w, y, x + w, y + h, r);
		this.game.ctx.arcTo(x + w, y + h, x, y + h, r);
		this.game.ctx.arcTo(x, y + h, x, y, r);
		this.game.ctx.arcTo(x, y, x + w, y, r);
		this.game.ctx.closePath();
		this.game.ctx.fill();
	}

	public drawSprite(
		x: number,
		y: number,
		w: number,
		h: number,
		texture: Texture<'image'>,
		frameWidth?: number,
		frameHeight?: number,
		currentRow?: number,
		currentCol?: number
	) {
		if (frameWidth) {
			// spritesheet
			this.game.ctx.drawImage(
				texture.texture, // image
				(currentCol! - 1) * frameWidth!, // source x
				(currentRow! - 1) * frameHeight!, // source y
				frameWidth!, // source width
				frameHeight!, // source height
				x, // target x
				y, // target y
				frameWidth!, // target width
				frameHeight! // target height
			);
		} else {
			// normal sprite
			this.game.ctx.drawImage(texture.texture, x, y, w, h);
		}
	}
}
