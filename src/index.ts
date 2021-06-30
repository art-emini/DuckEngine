// import

import Camera from './core/camera/camera';
import Game from './core/game';
import Scene from './core/scene';
import Text from './core/interactive/text';
import StaticLight from './core/lights/staticLight';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Collider from './core/physics/collider';
import GameObjectClass from './core/gameobjects/gameObject';

// main

// spec
export namespace Duck {
	export type GameObject = GameObjectClass;
	export namespace Game {
		export interface Config {
			canvas: HTMLCanvasElement | null;
			scale?: Misc.Scale;
			physics?: boolean;
			debug?: boolean;
			storage?: Storage.Config;
			defaultScene: string;
			background?: string;
		}

		export interface Stack {
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

	export namespace Collider {
		export type ShapeString =
			| 'rect'
			| 'circle'
			| 'roundrect'
			| 'spritesheet'
			| 'sprite';
	}

	export namespace Storage {
		export interface Config {
			save: {
				scenes?: Scene[];
				data?: unknown[];
				gameConfig?: boolean;
			};
			loadOnWindowLoad?: LoadType;
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
			volume?: number;
			sprites?: Sprite[];
		}
	}
	export namespace Input {
		export type Scope = 'GLOBAL' | 'CANVAS';

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
			[key: string]: unknown;
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

		export interface Listener {
			fn: (e: KeyboardEvent) => void;
			description: string;
			type: 'keydown' | 'keyup';
		}
	}

	export namespace Interactive {
		export namespace Text {
			export interface Config {
				x: number;
				y: number;
				method: 'draw' | 'stroke' | 'draw-stroke';
				styles: {
					fontCSS: string;
					strokeWidth?: number;
					strokeColor?: string;
					fillColor?: string;
					maxWidth?: number;
				};
			}
		}
	}

	export namespace Group {
		export type StackItem =
			| GameObject
			| Camera
			| Text
			| StaticLight
			| Collider;

		export type Filter =
			| 'gameobject'
			| 'lights'
			| 'interactive'
			| 'physics'
			| 'cameras';

		export type ListenerType = 'ADD' | 'REMOVE';

		export interface Listener {
			func: (item: StackItem) => unknown;
			type: ListenerType;
		}
	}

	export namespace ParticleEmitter {
		export type Range = Helper.FixedLengthArray<[number, number]>;
	}

	export namespace Cutscene {
		export type OnListenerType = 'END' | 'START' | 'NEXT';

		export interface OnListener {
			type: OnListenerType;
			// eslint-disable-next-line @typescript-eslint/ban-types
			func: Function;
		}

		type StepType =
			| 'MOVE'
			| 'DRAW'
			| 'FUNC'
			| 'CAMERA_ZOOM'
			| 'CAMERA_FOV'
			| 'CAMERA_MOVE';

		export interface Step {
			type: StepType;
			affect?: GameObject | Camera;
			moveTo?: {
				x?: number;
				y?: number;
			};
			// eslint-disable-next-line @typescript-eslint/ban-types
			func?: Function;
			cameraValue?: number;
			sleepValue?: number;
		}
		export interface Instructions {
			init: {
				mainObjectPos: {
					x: number;
					y: number;
				};
				otherObjectPos: {
					x: number;
					y: number;
				}[];
				cameraSettings?: {
					FOV: number;
					follow?: GameObject;
					zoom: number;
					pos?: {
						x: number;
						y: number;
					};
				};
				otherCameraSettings?: {
					FOV: number;
					follow?: GameObject;
					zoom: number;
					pos?: {
						x: number;
						y: number;
					};
				}[];
			};
			steps: Step[];
		}

		export interface Config {
			mainCamera: Camera;
			otherCameras?: Camera[];
			otherObjects?: GameObject[];
			mainObject: GameObject;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	namespace Helper {
		type ArrayLengthMutationKeys =
			| 'splice'
			| 'push'
			| 'pop'
			| 'shift'
			| 'unshift'
			| number;
		type ArrayItems<T extends Array<unknown>> = T extends Array<
			infer TItems
		>
			? TItems
			: never;
		export type FixedLengthArray<T extends unknown[]> = Pick<
			T,
			Exclude<keyof T, ArrayLengthMutationKeys>
		> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };
	}
}

// export

const DuckEngine = {
	Game: Game,
	Scene: Scene,
};

export default DuckEngine;
