/* eslint-disable @typescript-eslint/no-explicit-any */
import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Scene from '../../scene';
import GamepadInput from '../gamepadInput';

export default class GamepadModel<t extends Duck.Types.GamepadInput.Mapping> {
	public mapping: t;
	public game: Game;
	public scene: Scene;
	public gamepadInput: GamepadInput;

	public controller: Gamepad;

	constructor(
		mappingType: Duck.Types.GamepadInput.MappingType,
		game: Game,
		scene: Scene,
		gamepadInput: GamepadInput
	) {
		this.mapping =
			mappingType === 'Xbox'
				? (Duck.Types.GamepadInput.XboxMapping as any)
				: (Duck.Types.GamepadInput.PlaystationMapping as any);
		this.game = game;
		this.scene = scene;
		this.gamepadInput = gamepadInput;

		if (navigator.getGamepads()[0]) {
			this.controller = navigator.getGamepads()[0] as Gamepad;
		} else {
			this.controller = navigator.getGamepads()[0] as Gamepad;
			new Debug.Warn('No controller found.');
		}
	}

	public getButton(button: keyof t) {
		if (this.buttonExistsOnMapping(button)) {
			for (const button of this.controller.buttons) {
				if (button.value === this.buttonCode(button as any)) {
					return button;
				}
			}
		}
	}

	public buttonExistsOnMapping(button: keyof t) {
		return button in this.mapping;
	}

	public buttonCode(button: keyof t) {
		return this.mapping[button] as unknown as number;
	}
}
