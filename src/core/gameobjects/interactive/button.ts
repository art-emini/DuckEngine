import { Duck } from '../../../index';
import Debug from '../../debug/debug';
import Game from '../../game';
import GameObject from '../gameObject';
import rectToRectIntersect from '../../physics/rectToRectIntersect';
import Scene from '../../scene';
import Text from './text';
import Texture from '../../models/texture';

/**
 * @class Button
 * @classdesc Creates a DuckEngine Button
 * @description The Button Class. Acts like a Button
 * @extends GameObject
 * @since 1.0.0
 */
export default class Button extends GameObject<'either'> {
	public shape: Duck.Types.Interactive.Button.Shape;
	public text: Text;

	public hovering: boolean;
	protected listeners: Duck.Types.Interactive.Button.Listener[];

	/**
	 * @constructor
	 * @description Creates a Button instance
	 * @param {Duck.Types.Interactive.Button.Shape} shape Shape of the button, 'rect', 'roundrect', or 'sprite'
	 * @param {number} x X position
	 * @param {number} y Y position
	 * @param {number} w Width
	 * @param {number} h Height
	 * @param {number} r Radius
	 * @param {string} fillColorOrIMGPath Fill Color or Image path of the button
	 * @param {Text} text Text instance to render on top of the button
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0
	 */
	constructor(
		shape: Duck.Types.Interactive.Button.Shape,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		fillColorOrIMGPath: string,
		text: Text,
		game: Game,
		scene: Scene
	) {
		super(
			shape,
			x,
			y,
			w,
			h,
			r,
			Texture.fromEither(fillColorOrIMGPath, w, h),
			game,
			scene
		);
		this.shape = shape;
		this.text = text;

		this.hovering = false;

		this.zIndex = Duck.Layers.Rendering.zIndex.button;

		this.listeners = [];

		if (this.game.canvas) {
			this.game.canvas.addEventListener('click', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				const buttonPos = { x: this.position.x, y: this.position.y };

				if (this.scene.currentCamera) {
					const coords = this.scene.currentCamera.worldToScreen(
						this.position.x,
						this.position.y,
						this
					);
					buttonPos.x = coords.position.x;
					buttonPos.y = coords.position.y;
				}

				if (
					rectToRectIntersect(
						{
							position: buttonPos,
							w: this.w,
							h: this.h,
						},
						{
							position: { x: mousePos.x, y: mousePos.y },
							w: 1,
							h: 1,
						}
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

				const buttonPos = { x: this.position.x, y: this.position.y };

				if (this.scene.currentCamera) {
					const coords = this.scene.currentCamera.worldToScreen(
						this.position.x,
						this.position.y,
						this
					);
					buttonPos.x = coords.position.x;
					buttonPos.y = coords.position.y;
				}

				if (
					rectToRectIntersect(
						{
							position: buttonPos,
							w: this.w,
							h: this.h,
						},
						{
							position: { x: mousePos.x, y: mousePos.y },
							w: 1,
							h: 1,
						}
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

	/**
	 * @description Draws the button.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.game.ctx) {
			switch (this.shape) {
				case 'rect':
					this.game.ctx.fillStyle = this.texture.texture as string;
					this.game.ctx.fillRect(
						this.position.x,
						this.position.y,
						this.w,
						this.h
					);
					break;

				case 'roundrect':
					if (this.w < 2 * this.r) this.r = this.w / 2;
					if (this.h < 2 * this.r) this.r = this.h / 2;
					this.game.ctx.fillStyle = this.texture.texture as string;
					this.game.ctx.beginPath();
					this.game.ctx.moveTo(
						this.position.x + this.r,
						this.position.y
					);
					this.game.ctx.arcTo(
						this.position.x + this.w,
						this.position.y,
						this.position.x + this.w,
						this.position.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x + this.w,
						this.position.y + this.h,
						this.position.x,
						this.position.y + this.h,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x,
						this.position.y + this.h,
						this.position.x,
						this.position.y,
						this.r
					);
					this.game.ctx.arcTo(
						this.position.x,
						this.position.y,
						this.position.x + this.w,
						this.position.y,
						this.r
					);
					this.game.ctx.closePath();
					this.game.ctx.fill();
					break;

				case 'sprite':
					this.game.ctx.drawImage(
						this.texture.texture as HTMLImageElement,
						this.position.x,
						this.position.y,
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
	}

	/**
	 * @memberof Button
	 * @description Adds an event listener to the button
	 * @param {Duck.Types.Interactive.Button.ListenerType} type Listener Type, type of event
	 * @param {Duck.Types.Interactive.Button.ListenerFunc} func Callback function, called on event
	 * @since 1.0.0
	 */
	public on(
		type: Duck.Types.Interactive.Button.ListenerType,
		func: Duck.Types.Interactive.Button.ListenerFunc
	) {
		this.listeners.push({
			type,
			func,
		});
	}

	/**
	 * @memberof Button
	 * @description Removes an event listener from the button
	 * @param {Duck.Types.Interactive.Button.ListenerType} type Listener Type, type of event
	 * @since 1.0.0
	 */
	public off(type: Duck.Types.Interactive.Button.ListenerType) {
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
