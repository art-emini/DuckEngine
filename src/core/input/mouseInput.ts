/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from '../events/eventEmitter';
import Game from '../game';
import Scene from '../scene';
import Mouse from './models/mouse';

export default class MouseInput {
	public game: Game;
	public scene: Scene;
	public eventEmitter: EventEmitter;

	public mice: {
		[key: string]: Mouse;
	};

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
		this.eventEmitter = new EventEmitter();

		this.mice = {};
	}

	public addMouse(
		button: 0 | 1 | 2 | 3 | 4,
		descriptor: string,
		mouseDown?: (e: MouseEvent) => any,
		mouseUp?: (e: MouseEvent) => any,
		mouseMove?: (e: MouseEvent) => any
	) {
		const myMouse = new Mouse(
			button,
			descriptor,
			this.game,
			this.scene,
			this,
			mouseDown,
			mouseUp,
			mouseMove
		);

		this.mice[descriptor] = myMouse;

		return myMouse;
	}

	public addMice(
		mice: {
			button: 0 | 1 | 2 | 3 | 4;
			descriptor: string;
			mouseDown?: (e: MouseEvent) => any;
			mouseUp?: (e: MouseEvent) => any;
			mouseMove?: (e: MouseEvent) => any;
		}[]
	) {
		mice.forEach((mouseBase) => {
			this.addMouse(
				mouseBase.button,
				mouseBase.descriptor,
				mouseBase.mouseDown,
				mouseBase.mouseUp,
				mouseBase.mouseDown
			);
		});
	}

	public get inputs() {
		return this.mice;
	}
}
