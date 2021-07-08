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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onClick(cb: (e: MouseEvent) => any) {
		document.addEventListener('click', cb);
	}

	// place in update loop in your scene

	public get inputs() {
		return this.controller;
	}
}
