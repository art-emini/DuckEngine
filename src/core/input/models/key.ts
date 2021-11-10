/* eslint-disable @typescript-eslint/no-explicit-any */
import Game from '../../game';
import Scene from '../../scene';
import KeyboardInput from '../keyboardInput';

export default class Key {
	public keyCode: number;
	public descriptor: string;
	public game: Game;
	public scene: Scene;
	public keyboardInput: KeyboardInput;

	public isDown: boolean;
	public isUp: boolean;
	public isJustPressed: boolean;

	public state: boolean;

	constructor(
		keyCode: number,
		descriptor: string,
		game: Game,
		scene: Scene,
		keyboardInput: KeyboardInput,
		keyDown?: (e: KeyboardEvent) => any,
		keyUp?: (e: KeyboardEvent) => any,
		keyJustPressed?: (e: KeyboardEvent) => any,
		keyState?: (e: KeyboardEvent, state: boolean) => any
	) {
		this.keyCode = keyCode;
		this.descriptor = descriptor.toUpperCase();
		this.game = game;
		this.scene = scene;

		this.isDown = false;
		this.isUp = false;
		this.isJustPressed = false;
		this.state = false;

		this.keyboardInput = keyboardInput;

		if (keyDown) {
			this.keyboardInput.eventEmitter.on(
				`KEY_DOWN_${this.descriptor}`,
				keyDown
			);
		}
		if (keyUp) {
			this.keyboardInput.eventEmitter.on(
				`KEY_UP_${this.descriptor}`,
				keyUp
			);
		}
		if (keyJustPressed) {
			this.keyboardInput.eventEmitter.on(
				`KEY_JUST_PRESSED_${this.descriptor}`,
				keyJustPressed
			);
		}
		if (keyState) {
			this.keyboardInput.eventEmitter.on(
				`KEY_STATE_${this.descriptor}`,
				keyState
			);
		}

		this.registerListeners();
	}

	protected registerListeners() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === this.keyCode) {
				this.state = true;
				this.keyboardInput.eventEmitter.emit(
					`KEY_STATE_${this.descriptor}`,
					e,
					this.state
				);

				if (!e.repeat) {
					this.isDown = false;
					this.isUp = false;
					this.isJustPressed = true;

					this.keyboardInput.eventEmitter.emit(
						`KEY_JUST_PRESSED_${this.descriptor}`,
						e
					);
					this.keyboardInput.eventEmitter.emit(
						`KEY_INPUT_${this.descriptor}`,
						this,
						e
					);
				} else {
					this.isDown = true;
					this.isUp = false;
					this.isJustPressed = false;

					this.keyboardInput.eventEmitter.emit(
						`KEY_DOWN_${this.descriptor}`,
						e
					);
					this.keyboardInput.eventEmitter.emit(
						`KEY_INPUT_${this.descriptor}`,
						this,
						e
					);
				}
			}
		});
		document.addEventListener('keyup', (e) => {
			if (e.keyCode === this.keyCode) {
				this.state = false;
				this.keyboardInput.eventEmitter.emit(
					`KEY_STATE_${this.descriptor}`,
					e,
					this.state
				);

				this.isDown = false;
				this.isUp = true;
				this.isJustPressed = false;

				this.keyboardInput.eventEmitter.emit(
					`KEY_UP_${this.descriptor}`,
					e
				);
				this.keyboardInput.eventEmitter.emit(
					`KEY_INPUT_${this.descriptor}`,
					this,
					e
				);
			}
		});
	}

	public onInput(cb: (key: Key, e: KeyboardEvent) => any) {
		this.keyboardInput.eventEmitter.on(`KEY_INPUT_${this.descriptor}`, cb);
	}
}
