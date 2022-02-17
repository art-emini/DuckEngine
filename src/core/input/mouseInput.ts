/* eslint-disable @typescript-eslint/no-explicit-any */
import { Duck } from '../..';
import EventEmitter from '../events/eventEmitter';
import Game from '../game';
import Scene from '../scene';
import Mouse from './models/mouse';

/**
 * @class MouseInput
 * @classdesc Creates a DuckEngine MouseInput
 * @description The MouseInput Class. Use the mouse as input
 * @since 1.0.0-beta
 */
export default class MouseInput {
	/**
	 * @memberof MouseInput
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof MouseInput
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof MouseInput
	 * @description The EventEmitter used to emit for Mouse events
	 * @type EventEmitter
	 * @since 2.0.0
	 */
	public eventEmitter: EventEmitter;

	/**
	 * @memberof MouseInput
	 * @description All of the Mice added to the MouseInput
	 * @type { [key: string]: Mouse }
	 * @since 2.0.0
	 */
	public mice: {
		[key: string]: Mouse;
	};

	/**
	 * @memberof MouseInput
	 * @description Creates a MouseInput instance
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
		this.eventEmitter = new EventEmitter();

		this.mice = {};
	}

	/**
	 * @memberof MouseInput
	 * @description Adds a Mouse to the MouseInput
	 * @param { 0 | 1 | 2 | 3 | 4 } button Mouse Button
	 * @param {string} descriptor The Mouse descriptor, used to set the value to MouseInput.mouse
	 * @param { (e: MouseEvent) => any } [mouseDown] Mouse down callback
	 * @param { (e: MouseEvent) => any } [mouseUp] Mouse up callback
	 * @param { (e: MouseEvent) => any } [mouseMove] Mouse move callback
	 * @returns {Mouse}
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof MouseInput
	 * @description Adds Mice to the MouseInput
	 * @param {Duck.Types.MouseInput.MouseBase[]} mice An array of Mouse Base configuration to use to add mice to the MouseInput
	 * @since 2.0.0
	 */
	public addMice(mice: Duck.Types.MouseInput.MouseBase[]) {
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

	/**
	 * @memberof MouseInput
	 * @description Returns MouseInput.mice
	 * @returns {{ [key: string]: Mouse }}
	 * @since 2.0.0
	 */
	public get inputs() {
		return this.mice;
	}
}
