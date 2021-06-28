import { Duck } from '../../index';
import Debug from '../debug/debug';
import Game from '../game';

export default class Input {
	private game: Game;
	private controller: Duck.Input.Controller;
	private listeners: Duck.Input.Listener[];

	constructor(game: Game) {
		this.game = game;
		this.controller = {
			w: false,
			a: false,
			s: false,
			d: false,
			arrow_up: false,
			arrow_down: false,
			arrow_left: false,
			arrow_right: false,
			spacebar: false,
			mouse: false,
		};

		this.listeners = [];

		this.listener();
	}

	private listener() {
		document.addEventListener('keydown', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() === key) {
					this.controller[key] = true;
				}
			});
		});

		document.addEventListener('keyup', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() === key) {
					this.controller[key] = false;
					return this.controller;
				}
			});
		});

		document.addEventListener('click', () => {
			this.controller.mouse = true;
			setTimeout(() => {
				this.controller.mouse = false;
			}, 10);
		});
	}

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

	// place in update loop in your scene

	public get inputs() {
		return this.controller;
	}
}
