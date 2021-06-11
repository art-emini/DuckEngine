import { Duck } from '../../index';
import randomInt from '../../utils/randomInt';

export default class Input {
	private controller: Duck.Input.Controller;
	private listeners: Duck.Input.Listener[];

	constructor() {
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
		};

		this.listeners = [];

		this.listener();
	}

	private listener() {
		document.addEventListener('keydown', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() == key) {
					this.controller[key] = true;
				}
			});
		});

		let a = document.addEventListener('keyup', (e) => {
			Object.keys(this.controller).forEach((key) => {
				if (e.key.toLowerCase() == key) {
					this.controller[key] = false;
					return this.controller;
				}
			});
		});
	}

	public on(
		type: 'keydown' | 'keyup',
		key: string,
		cb: (e: KeyboardEvent) => void
	) {
		let e = document.addEventListener(type, cb);
		this.listeners.push({
			fn: cb,
			key: key,
			type: type,
		});
	}

	public off(key: string) {
		let foundListener = this.listeners.find(
			(_listener) => _listener.key === key
		);
		if (foundListener) {
			document.removeEventListener(
				foundListener.type,
				foundListener.fn,
				true
			);
		}
	}

	// place in update loop in your scene

	public get inputs() {
		return this.controller;
	}
}
