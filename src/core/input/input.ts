import { Duck } from '../../index';

export default class Input {
	private object: Duck.GameObject;
	private mapping: Duck.Input.Mapping;
	private controller: Duck.Input.Controller;

	constructor(gameobject: Duck.GameObject, mapping: Duck.Input.Mapping) {
		this.object = gameobject;
		this.mapping = mapping;

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

	// place in update loop in your scene

	public get inputs() {
		return this.controller;
	}
}
