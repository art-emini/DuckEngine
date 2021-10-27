import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';

/**
 * @class Input
 * @classdesc Creates a DuckEngine Input
 * @description The Input Class. Main inputs are captured here
 * @since 1.0.0-beta
 */
export default class Input {
	public game: Game;
	private controller: Duck.Types.Input.Controller;
	private listeners: Duck.Types.Input.Listener[];

	/**
	 * @constructor
	 * @description Creates an Input instance.
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(game: Game) {
		this.game = game;
		this.controller = {
			w: false,
			a: false,
			s: false,
			d: false,
			ArrowUp: false,
			ArrowDown: false,
			ArrowLeft: false,
			ArrowRight: false,
			spacebar: false,
		};

		this.listeners = [];

		this.listener();
	}

	private listener() {
		document.addEventListener('keydown', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() === key.toLowerCase()) {
					this.controller[key] = true;
				}
				if (e.keyCode === 32) {
					this.controller.spacebar = true;
				}
			});
		});

		document.addEventListener('keyup', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() === key.toLowerCase()) {
					this.controller[key] = false;
					return this.controller;
				}
				if (e.keyCode === 32) {
					this.controller.spacebar = false;
				}
			});
		});
	}

	/**
	 * @memberof Input
	 * @description Adds an key event listener to Input
	 * @param {'keydown' | 'keyup'} type Listener type, 'keydown' or 'keyup'
	 * @param {string} description Description of what the key event does or the key of the event listener, used to disable the event
	 * @param {(e: KeyboardEvent) => void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public on(
		type: 'keydown' | 'keyup',
		description: string,
		cb: (e: KeyboardEvent) => void
	) {
		document.addEventListener(type, cb);
		this.listeners.push({
			fn: cb,
			description: description,
			type: type,
		});
		if (this.game.config.debug) {
			new Debug.Log('Added event listener to Input.');
		}
	}

	/**
	 * @memberof Input
	 * @description Removes an key event listener from Input
	 * @param {string} description Description of what the key event does or the key of the event listener, used to disable the event
	 * @since 1.0.0-beta
	 */
	public off(description: string) {
		const foundListener = this.listeners.find(
			(_listener) => _listener.description === description
		);
		if (foundListener) {
			document.removeEventListener(
				foundListener.type,
				foundListener.fn,
				true
			);
			if (this.game.config.debug) {
				new Debug.Log('Removed event listener from Input.');
			}
		}
	}

	/**
	 * @memberof Input
	 * @description Adds a keydown event listener to the DOM
	 * @param {string} key Key string to check for
	 * @param {(e:KeyboardEvent)=>void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public onKeyDown(key: string, cb: (e: KeyboardEvent) => void) {
		document.addEventListener('keydown', (e) => {
			if (e.key === key) {
				cb(e);
			}
		});
	}

	/**
	 * @memberof Input
	 * @description Adds a keyup event listener to the DOM
	 * @param {string} key Key string to check for
	 * @param {(e:KeyboardEvent)=>void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public onKeyUp(key: string, cb: (e: KeyboardEvent) => void) {
		document.addEventListener('keyup', (e) => {
			if (e.key === key) {
				cb(e);
			}
		});
	}

	/**
	 * @memberof Input
	 * @description Adds a mouseMove event listener to the DOM
	 * @param {(mousePos: { x:number; y:number }) => void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public onMouseMove(cb: (mousePos: { x: number; y: number }) => void) {
		if (this.game.canvas) {
			this.game.canvas.addEventListener('mousemove', (e) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const rect = this.game.canvas!.getBoundingClientRect();
				const mousePos = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};

				cb(mousePos);
			});
		}
	}

	/**
	 * @memberof Input
	 * @description Adds a click event to the DOM
	 * @param {(e: MouseEvent) => void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public onClick(cb: (e: MouseEvent) => void) {
		document.addEventListener('click', cb);
	}

	/**
	 * @memberof Input
	 * @description Gets the current state of the InputController, place in update loop
	 * @returns Duck.Types.Input.Controller
	 * @since 1.0.0-beta
	 */
	public get inputs() {
		return this.controller;
	}
}
