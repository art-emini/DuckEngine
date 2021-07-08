import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';
import rectToRectIntersect from '../physics/rectToRectIntersect';
import Scene from '../scene';
import Text from './text';

export default class Button {
	public shape: Duck.Interactive.Button.Shape;
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public r: number;
	public fillColor: string;
	public text: Text;
	private game: Game;
	private scene: Scene;

	public hovering: boolean;
	private listeners: Duck.Interactive.Button.Listener[];

	private image: HTMLImageElement | undefined;

	constructor(
		shape: Duck.Interactive.Button.Shape,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColor: string,
		text: Text,
		game: Game,
		scene: Scene
	) {
		this.shape = shape;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.r = r;
		this.fillColor = fillColor;
		this.text = text;
		this.game = game;
		this.scene = scene;

		this.hovering = false;

		this.listeners = [];

		if (this.shape === 'sprite') {
			this.image = new Image();
			this.image.src = this.fillColor;
		}

		if (this.game.canvas) {
			this.game.canvas.addEventListener('click', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				if (
					rectToRectIntersect(
						{ x: this.x, y: this.y, w: this.w, h: this.h },
						{ x: mousePos.x, y: mousePos.y, w: 1, h: 1 }
					) &&
					this.scene.visible
				) {
					const f = this.listeners.find(
						(a) => a.type.toLowerCase() === 'click'
					);

					if (f) {
						f.func({
							x: mousePos.x,
							y: mousePos.y,
							type: 'CLICK',
						});
					}
				}
			});

			// hover
			this.game.canvas.addEventListener('mousemove', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				if (
					rectToRectIntersect(
						{ x: this.x, y: this.y, w: this.w, h: this.h },
						{ x: mousePos.x, y: mousePos.y, w: 1, h: 1 }
					) &&
					this.scene.visible
				) {
					const f = this.listeners.find(
						(a) => a.type.toLowerCase() === 'hover'
					);

					if (f) {
						f.func({
							x: mousePos.x,
							y: mousePos.y,
							type: 'HOVER',
						});
					}

					this.hovering = true;
				} else if (this.scene.visible) {
					const f = this.listeners.find(
						(a) => a.type.toLowerCase() === 'nothover'
					);

					if (f) {
						f.func({
							x: mousePos.x,
							y: mousePos.y,
							type: 'NOTHOVER',
						});
					}

					this.hovering = false;
				}
			});
		} else {
			new Debug.Error(
				'Cannot add event listeners to canvas for mouseover and click for button. Canvas element is undefined or null.'
			);
		}
	}

	public draw() {
		if (this.game.ctx) {
			switch (this.shape) {
				case 'rect':
					this.game.ctx.fillStyle = this.fillColor;
					this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
					break;

				case 'roundrect':
					if (this.w < 2 * this.r) this.r = this.w / 2;
					if (this.h < 2 * this.r) this.r = this.h / 2;
					this.game.ctx.fillStyle = this.fillColor;
					this.game.ctx.beginPath();
					this.game.ctx.moveTo(this.x + this.r, this.y);
					this.game.ctx.arcTo(
						this.x + this.w,
						this.y,
						this.x + this.w,
						this.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.x + this.w,
						this.y + this.h,
						this.x,
						this.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.x,
						this.y + this.h,
						this.x,
						this.y,
						this.r
					);
					this.game.ctx.arcTo(
						this.x,
						this.y,
						this.x + this.w,
						this.y,
						this.r
					);
					this.game.ctx.closePath();
					this.game.ctx.fill();
					break;

				case 'sprite':
					this.game.ctx.drawImage(
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						this.image!,
						this.x,
						this.y,
						this.w,
						this.h
					);
					break;

				default:
					new Debug.Error(
						'Cannot draw button. Shape must be a rect, roundrect, or sprite.'
					);
					break;
			}
		}

		this.text.draw();
	}

	public on(
		type: Duck.Interactive.Button.ListenerType,
		func: Duck.Interactive.Button.ListenerFunc
	) {
		this.listeners.push({
			type,
			func,
		});
	}

	public off(type: Duck.Interactive.Button.ListenerType) {
		const f = this.listeners.find(
			(l) => l.type.toLowerCase() === type.toLowerCase()
		);

		if (f) {
			this.listeners.splice(this.listeners.indexOf(f), 1);
			if (this.game.config.debug) {
				new Debug.Log(
					`Removed event listener of type "${type}" from button.`
				);
			}
		} else {
			new Debug.Error(
				`Cannot remove event listener from button. Event Listener of type "${type}" does not exist.`
			);
		}
	}
}
