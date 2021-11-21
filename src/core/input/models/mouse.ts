/* eslint-disable @typescript-eslint/no-explicit-any */
import Game from '../../game';
import Scene from '../../scene';
import MouseInput from '../mouseInput';

export default class Mouse {
	/**
	 * @memberof Mouse
	 * @description The Mouse button
	 * @type number
	 * @since 2.0.0
	 */
	public button: 0 | 1 | 2 | 3 | 4;

	/**
	 * @memberof Mouse
	 * @description The Mouse descriptor
	 * @type string
	 * @since 2.0.0
	 */
	public descriptor: string;

	/**
	 * @memberof Mouse
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof Mouse
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Mouse
	 * @description The MouseInput that the Mouse is attached to
	 * @type MouseInput
	 * @since 2.0.0
	 */
	public mouseInput: MouseInput;

	/**
	 * @constructor Mouse
	 * @description Creates a Mouse instance
	 * @param { 0 | 1 | 2 | 3 | 4 } button Mouse button
	 * @param {string} descriptor Mouse descriptor
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {MouseInput} mouseInput MouseInput that the Mouse is attached to
	 * @param { (e:MouseEvent) => any } [mouseDown] Mouse down callback
	 * @param { (e:MouseEvent) => any } [mouseUp] Mouse up callback
	 * @param { (e:MouseEvent) => any } [mouseMove] Mouse move callback
	 * @since 2.0.0
	 */
	constructor(
		button: 0 | 1 | 2 | 3 | 4,
		descriptor: string,
		game: Game,
		scene: Scene,
		mouseInput: MouseInput,
		mouseDown?: (e: MouseEvent) => any,
		mouseUp?: (e: MouseEvent) => any,
		mouseMove?: (e: MouseEvent) => any
	) {
		this.button = button;
		this.descriptor = descriptor.toUpperCase();
		this.game = game;
		this.scene = scene;
		this.mouseInput = mouseInput;

		if (mouseDown) {
			this.mouseInput.eventEmitter.on(
				`MOUSE_DOWN_${this.descriptor}`,
				mouseDown
			);
		}

		if (mouseUp) {
			this.mouseInput.eventEmitter.on(
				`MOUSE_UP_${this.descriptor}`,
				mouseUp
			);
		}

		if (mouseMove) {
			this.mouseInput.eventEmitter.on(
				`MOUSE_MOVE_${this.descriptor}`,
				mouseMove
			);
		}

		this.registerListeners();
	}

	protected registerListeners() {
		document.addEventListener('mousedown', (e) => {
			if (e.button === this.button) {
				this.mouseInput.eventEmitter.emit(
					`MOUSE_DOWN_${this.descriptor}`,
					e
				);
			}
		});
		document.addEventListener('mouseup', (e) => {
			if (e.button === this.button) {
				this.mouseInput.eventEmitter.emit(
					`MOUSE_UP_${this.descriptor}`,
					e
				);
			}
		});
		document.addEventListener('mousemove', (e) => {
			if (e.button === this.button) {
				this.mouseInput.eventEmitter.emit(
					`MOUSE_MOVE_${this.descriptor}`,
					e
				);
			}
		});
	}
}
