/* eslint-disable @typescript-eslint/ban-types */
// import

import CameraClass from './core/camera/camera';
import GameClass from './core/game';
import SceneClass from './core/scene';
import TextClass from './core/interactive/text';
import StaticLightClass from './core/lights/staticLight';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ColliderClass from './core/physics/collider';
import GameObjectClass from './core/gameobjects/gameObject';
import CutsceneClass from './core/cutscene/cutscene';
import CircleClass from './core/gameobjects/circle';
import RectClass from './core/gameobjects/rect';
import RoundRectClass from './core/gameobjects/roundrect';
import SpriteClass from './core/gameobjects/sprite';
import SpriteSheetClass from './core/gameobjects/spritesheet';
import GroupClass from './core/group/group';
import InputClass from './core/input/input';
import LoaderClass from './core/loader/loader';
import TileMapClass from './core/map/tilemap';
import ParticleClass from './core/particles/particle';
import ParticleEmitterClass from './core/particles/particleEmitter';
import SoundClass from './core/sound/sound';
import DuckStorageClass from './core/storage/storage';

// main

// spec
export namespace Duck {
	export namespace Class {
		export type Scene = SceneClass;
		export type Game = GameClass;

		export type Camera = CameraClass;
		export type Cutscene = CutsceneClass;

		export namespace GameObjects {
			export type Circle = CircleClass;
			export type Rect = RectClass;
			export type RoundRect = RoundRectClass;
			export type Sprite = SpriteClass;
			export type SpriteSheet = SpriteSheetClass;
			export type GameObject = Duck.GameObject;
		}

		export type Group<t extends Duck.Group.StackItem> = GroupClass<t>;
		export type Input = InputClass;

		export namespace Interactive {
			export type Text = TextClass;
		}

		export namespace Lights {
			export type StaticLight = StaticLightClass;
		}

		export type Loader = LoaderClass;

		export namespace Maps {
			export type TileMap = TileMapClass;
		}

		export type Particle = ParticleClass;
		export type ParticleEmitter = ParticleEmitterClass;

		export type Collider = ColliderClass;

		export type Sound = SoundClass;

		export type DuckStorage = DuckStorageClass;
	}

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
			smartScale?: boolean;
		}

		export interface Stack {
			scenes: SceneClass[];
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
				scenes?: SceneClass[];
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
			| CameraClass
			| TextClass
			| StaticLightClass
			| ColliderClass;

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
			func: Function;
		}

		type StepType =
			| 'MOVE'
			| 'DRAW'
			| 'FUNC'
			| 'CAMERA_ZOOM'
			| 'CAMERA_FOV'
			| 'CAMERA_MOVE'
			| 'CAMERA_SHAKE';

		export interface Step {
			type: StepType;
			affect?: GameObject | CameraClass;
			moveTo?: {
				x?: number;
				y?: number;
			};
			func?: Function;
			cameraValue?: number;
			cameraIntervalMS?: number;
			cameraTimeMS?: number;
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
			mainCamera: CameraClass;
			otherCameras?: CameraClass[];
			otherObjects?: GameObject[];
			mainObject: GameObject;
		}
	}

	export namespace Tilemap {
		export type Map = number[][];
		export interface Atlas {
			[key: number]: HTMLImageElement | 'EMPTY';
		}
	}

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
	Game: GameClass,
	Scene: SceneClass,
};

export default DuckEngine;
