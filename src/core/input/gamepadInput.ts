/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from '../events/eventEmitter';
import Game from '../game';
import Scene from '../scene';

export default class GamepadInput {
	public game: Game;
	public scene: Scene;
	public eventEmitter: EventEmitter;

	public gamepads: {
		[key: string]: any;
	};

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
		this.eventEmitter = new EventEmitter();

		this.gamepads = {};
	}
}
