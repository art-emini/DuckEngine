/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from '../events/eventEmitter';
import Game from '../game';
import Scene from '../scene';
import Key from './models/key';

export default class KeyboardInput {
	public game: Game;
	public scene: Scene;
	public eventEmitter: EventEmitter;

	public keys: {
		[key: string]: Key;
	};

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
		this.eventEmitter = new EventEmitter();

		this.keys = {};
	}

	public addKey(
		keyCode: number,
		descriptor: string,
		keyDown?: (e: KeyboardEvent) => any,
		keyUp?: (e: KeyboardEvent) => any,
		keyJustPressed?: (e: KeyboardEvent) => any,
		keyState?: (e: KeyboardEvent) => any
	) {
		const myKey = new Key(
			keyCode,
			descriptor,
			this.game,
			this.scene,
			this,
			keyDown,
			keyUp,
			keyJustPressed,
			keyState
		);

		this.keys[descriptor] = myKey;

		return myKey;
	}

	public addKeys(
		keys: {
			keyCode: number;
			descriptor: string;
			keyDown?: (e: KeyboardEvent) => any;
			keyUp?: (e: KeyboardEvent) => any;
			keyJustPressed?: (e: KeyboardEvent) => any;
			keyState?: (e: KeyboardEvent) => any;
		}[]
	) {
		keys.forEach((keyBase) => {
			this.addKey(
				keyBase.keyCode,
				keyBase.descriptor,
				keyBase.keyDown,
				keyBase.keyUp,
				keyBase.keyJustPressed,
				keyBase.keyState
			);
		});
	}

	public removeKey(descriptor: string) {
		const key = this.keys[descriptor];

		if (key) {
			delete this.keys[descriptor];
		}
	}

	public onInput(cb: (key: Key, e: KeyboardEvent) => any) {
		for (const key in this.keys) {
			if (Object.prototype.hasOwnProperty.call(this.keys, key)) {
				const myKey = this.keys[key];
				myKey.onInput(cb);
			}
		}
	}

	public get inputs() {
		return this.keys;
	}
}
