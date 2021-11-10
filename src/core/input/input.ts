import Game from '../game';
import Scene from '../scene';
import KeyboardInput from './keyboardInput';
import MouseInput from './mouseInput';

/**
 * @class Input
 * @classdesc Creates a DuckEngine Input
 * @description The Input Class. Main inputs are captured here
 * @since 1.0.0-beta
 */
export default class Input {
	public game: Game;
	public scene: Scene;

	/**
	 * @constructor
	 * @description Creates an Input instance.
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;
	}

	public createKeyboardInput() {
		return new KeyboardInput(this.game, this.scene);
	}

	public createMouseInput() {
		return new MouseInput(this.game, this.scene);
	}
}
