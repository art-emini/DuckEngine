/* eslint-disable @typescript-eslint/no-explicit-any */
import Game from '../../game';
import Scene from '../../scene';
import MouseInput from '../mouseInput';

export default class Mouse {
	public button: 0 | 1 | 2 | 3 | 4;
	public descriptor: string;
	public game: Game;
	public scene: Scene;
	public mouseInput: MouseInput;

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
