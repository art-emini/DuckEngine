/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from '../../events/eventEmitter';
import Game from '../../game';
import Scene from '../../scene';

export default class Key {
	public keyString: string;
	public game: Game;
	public scene: Scene;

	public isDown: boolean;
	public isUp: boolean;
	public isJustPressed: boolean;

	public state: boolean;

	public eventEmitter: EventEmitter;

	constructor(
		keyString: string,
		game: Game,
		scene: Scene,
		keyDown?: (e: KeyboardEvent) => any,
		keyUp?: (e: KeyboardEvent) => any,
		keyJustPressed?: (e: KeyboardEvent) => any,
		keyState?: (e: KeyboardEvent) => any
	) {
		this.keyString = keyString.toUpperCase();
		this.game = game;
		this.scene = scene;

		this.isDown = false;
		this.isUp = false;
		this.isJustPressed = false;
		this.state = false;

		this.eventEmitter = new EventEmitter();

		if (keyDown) {
			this.eventEmitter.on(`KEY_DOWN_${this.keyString}`, keyDown);
		}
		if (keyUp) {
			this.eventEmitter.on(`KEY_UP_${this.keyString}`, keyUp);
		}
		if (keyJustPressed) {
			this.eventEmitter.on(
				`KEY_JUST_PRESSED_${this.keyString}`,
				keyJustPressed
			);
		}
		if (keyState) {
			this.eventEmitter.on(`KEY_STATE_${this.keyString}`, keyState);
		}

		this.registerListeners();
	}

	protected registerListeners() {
		document.addEventListener('keydown', (e) => {
			if (e.key.toUpperCase() === this.keyString) {
				this.state = true;
				this.eventEmitter.emit(`KEY_STATE_${this.keyString}`, e);

				if (!e.repeat) {
					this.isDown = false;
					this.isUp = false;
					this.isJustPressed = true;

					this.eventEmitter.emit(
						`KEY_JUST_PRESSED_${this.keyString}`,
						e
					);
					this.eventEmitter.emit(
						`KEY_INPUT_${this.keyString}`,
						this,
						e
					);
				} else {
					this.isDown = true;
					this.isUp = false;
					this.isJustPressed = false;

					this.eventEmitter.emit(`KEY_DOWN_${this.keyString}`, e);
					this.eventEmitter.emit(
						`KEY_INPUT_${this.keyString}`,
						this,
						e
					);
				}
			}
		});
		document.addEventListener('keyup', (e) => {
			if (e.key.toUpperCase() === this.keyString) {
				this.state = false;
				this.eventEmitter.emit(`KEY_STATE_${this.keyString}`, e);

				this.isDown = false;
				this.isUp = true;
				this.isJustPressed = false;

				this.eventEmitter.emit(`KEY_UP_${this.keyString}`, e);
				this.eventEmitter.emit(`KEY_INPUT_${this.keyString}`, this, e);
			}
		});
	}

	public onInput(cb: (key: Key, e: KeyboardEvent) => any) {
		this.eventEmitter.on(`KEY_INPUT_${this.keyString}`, cb);
	}
}
