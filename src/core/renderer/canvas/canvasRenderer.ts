/* eslint-disable @typescript-eslint/no-non-null-assertion */
import EVENTS from '../../events/events';
import Game from '../../game';
import Texture from '../../models/texture';
import BaseRenderer from '../baseRenderer';
import { BlendModes } from './const/blendModes';
import RendererPipeline from './pipeline/rendererPipeline';

export default class CanvasRenderer extends BaseRenderer {
	public ctx: CanvasRenderingContext2D;

	public pipeline: RendererPipeline;

	constructor(game: Game, poolingInterval = 1000) {
		super(game);

		this.ctx = this.game.canvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		this.pipeline = new RendererPipeline(this.game, poolingInterval);
	}

	public save() {
		this.ctx.save();
	}

	public restore() {
		this.ctx.restore();
	}

	public translate(x: number, y: number) {
		this.ctx.translate(x, y);
	}

	public transform(
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	) {
		this.ctx.transform(a, b, c, d, e, f);
	}

	public scale(x: number, y: number) {
		this.ctx.scale(x, y);
	}

	public setFont(font: string) {
		this.ctx.font = font;
	}

	public measureText(font: string, text: string) {
		this.setFont(font);
		return this.ctx.measureText(text);
	}

	public setFillColor(color: string) {
		this.ctx.fillStyle = color;
	}

	public setStrokeColor(color: string) {
		this.ctx.strokeStyle = color;
	}

	public setLineWidth(width: number) {
		this.ctx.lineWidth = width;
	}

	public drawText(text: string, x: number, y: number, maxWidth?: number) {
		this.ctx.fillText(text, x, y, maxWidth);
	}

	public strokeText(text: string, x: number, y: number, maxWidth?: number) {
		this.ctx.strokeText(text, x, y, maxWidth);
	}

	public clearFrame() {
		this.ctx.clearRect(
			0,
			0,
			this.game.canvas.width,
			this.game.canvas.height
		);
		this.game.eventEmitter.emit(EVENTS.RENDERER.CLEAR_FRAME);
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
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = color;
		this.ctx.fill();
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
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x + r, y);
		this.ctx.arcTo(x + w, y, x + w, y + h, r);
		this.ctx.arcTo(x + w, y + h, x, y + h, r);
		this.ctx.arcTo(x, y + h, x, y, r);
		this.ctx.arcTo(x, y, x + w, y, r);
		this.ctx.closePath();
		this.ctx.fill();
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
			this.ctx.drawImage(
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
			this.ctx.drawImage(texture.texture, x, y, w, h);
		}
	}

	public setBlendMode(blendMode: keyof typeof BlendModes) {
		this.ctx.globalCompositeOperation = blendMode;
	}
}
