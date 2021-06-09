// import

import Game from './core/game';
import Circle from './core/gameobjects/circle';
import Rect from './core/gameobjects/rect';
import Sprite from './core/gameobjects/sprite';
import Scene from './core/scene';

// main

// spec
export namespace Duck {
	export type GameObject = Sprite | Rect | Circle;
	export namespace Game {
		export interface Config {
			canvas: HTMLCanvasElement | null;
			scale?: Misc.Scale;
			physics?: boolean;
			debug?: boolean;
			storage?: Storage.Config;
			defaultScene: string;
		}

		export interface Stack {
			cameras: any[];
			scenes: Scene[];
			defaultScene: string;
		}
	}

	export namespace Misc {
		export interface Scale {
			width?: number;
			height?: number;
		}
	}

	export namespace Scene {}

	export namespace Collider {
		export type ShapeString = 'rect' | 'circle';
	}

	export namespace Storage {
		export interface Config {
			save: {
				scenes?: Scene[];
				data?: any[];
				gameConfig?: boolean;
			};
		}

		export type LoadType = 'scenes' | 'data' | 'gameConfig' | 'all';
	}

	export namespace Sound {
		export interface Sprite {
			startSeconds: number;
			endSeconds: number;
			key: string;
		}

		export interface Config {
			autoplay?: boolean;
			sprites?: Sprite[];
		}
	}
	export namespace Input {
		export interface Mapping {
			w?: boolean;
			a?: boolean;
			s?: boolean;
			d?: boolean;
			arrow_up?: boolean;
			arrow_down?: boolean;
			arrow_left?: boolean;
			arrow_right?: boolean;
			spacebar?: boolean;
		}

		export interface Controller {
			[key: string]: any;
			w: boolean;
			a: boolean;
			s: boolean;
			d: boolean;
			arrow_up: boolean;
			arrow_down: boolean;
			arrow_left: boolean;
			arrow_right: boolean;
			spacebar: boolean;
		}
	}
}

// export

const DuckEngine = {
	Game: Game,
	Scene: Scene,
};

export default DuckEngine;
