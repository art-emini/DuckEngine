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
		keyString: string,
		keyDown?: (e: KeyboardEvent) => any,
		keyUp?: (e: KeyboardEvent) => any,
		keyJustPressed?: (e: KeyboardEvent) => any,
		keyState?: (e: KeyboardEvent) => any
	) {
		const myKey = new Key(
			keyString,
			this.game,
			this.scene,
			this,
			keyDown,
			keyUp,
			keyJustPressed,
			keyState
		);

		this.keys[keyString.toUpperCase()] = myKey;

		return myKey;
	}

	public addKeys(
		keys: {
			keyString: string;
			keyDown?: (e: KeyboardEvent) => any;
			keyUp?: (e: KeyboardEvent) => any;
			keyJustPressed?: (e: KeyboardEvent) => any;
			keyState?: (e: KeyboardEvent) => any;
		}[]
	) {
		keys.forEach((keyBase) => {
			this.addKey(
				keyBase.keyString,
				keyBase.keyDown,
				keyBase.keyUp,
				keyBase.keyJustPressed,
				keyBase.keyState
			);
		});
	}

	public removeKey(keyString: string) {
		const key = this.keys[keyString];

		if (key) {
			delete this.keys[keyString];
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
