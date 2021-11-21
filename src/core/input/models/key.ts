/* eslint-disable @typescript-eslint/no-explicit-any */
import Game from '../../game';
import Scene from '../../scene';
import KeyboardInput from '../keyboardInput';

/**
 * @class Key
 * @classdesc Creates a DuckEngine Key
 * @description The Key Class. Stores info about a key's state
 * @since 2.0.0
 */
export default class Key {
	/**
	 * @memberof Key
	 * @description The keyCode
	 * @type number
	 * @since 2.0.0
	 */
	public keyCode: number;

	/**
	 * @memberof Key
	 * @description The Key descriptor
	 * @type string
	 * @since 2.0.0
	 */
	public descriptor: string;

	/**
	 * @memberof Key
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof Key
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Key
	 * @description The KeyboardInput that the key is attached to
	 * @type KeyboardInput
	 * @since 2.0.0
	 */
	public keyboardInput: KeyboardInput;

	/**
	 * @memberof Key
	 * @description Key down state
	 * @type boolean
	 * @since 2.0.0
	 */
	public isDown: boolean;

	/**
	 * @memberof Key
	 * @description Key up state
	 * @type boolean
	 * @since 2.0.0
	 */
	public isUp: boolean;

	/**
	 * @memberof Key
	 * @description Key just pressed state
	 * @type boolean
	 * @since 2.0.0
	 */
	public isJustPressed: boolean;

	/**
	 * @memberof Key
	 * @description Key basic state of up or down, up being false, down being true
	 * @type boolean
	 * @since 2.0.0
	 */
	public state: boolean;

	/**
	 * @constructor Key
	 * @description Creates a Key instance
	 * @param {number} keyCode The Key keyCode
	 * @param {string} descriptor The Key descriptor, used to set the value to KeyboardInput.keys
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param { (e:KeyboardEvent) => any } [keyDown] Key Down callback
	 * @param { (e:KeyboardEvent) => any } [keyUp] Key Up callback
	 * @param { (e:KeyboardEvent) => any } [keyJustPressed] Key Just Pressed callback
	 * @param { (e:KeyboardEvent) => any } [keyState] Key State callback
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof Key
	 * @description Creates on event on event emitter to listen for input
	 * @param {(key:Key, e:KeyboardEvent) => any} cb Callback to call on input
	 * @since 2.0.0
	 */
	public onInput(cb: (key: Key, e: KeyboardEvent) => any) {
		this.keyboardInput.eventEmitter.on(`KEY_INPUT_${this.descriptor}`, cb);
	}
}
