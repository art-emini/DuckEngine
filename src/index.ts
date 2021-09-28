/* eslint-disable @typescript-eslint/ban-types */
// import

import CameraClass from './core/camera/camera';
import GameClass from './core/game';
import SceneClass from './core/scene';
import TextClass from './core/interactive/text';
import StaticLightClass from './core/lights/staticLight';
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
import OnceClass from './base/once';
import RenderClass from './base/render';
import ButtonClass from './core/interactive/button';
import ParticleContainerClass from './core/particles/particleContainer';
import EffectClass from './core/effect/effect';
import ExplosionEffectClass from './core/effect/preset/explosion';
import SmokeEffectClass from './core/effect/preset/smoke';

// main

// spec
export namespace Duck {
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
		export type GameObject = GameObjectClass;
	}

	export type Group<t extends Duck.Types.Group.StackItem> = GroupClass<t>;

	export type Input = InputClass;

	export namespace Interactive {
		export type Text = TextClass;
		export type Button = ButtonClass;
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
	export type ParticleContainer = ParticleContainerClass;

	export type Collider = ColliderClass;

	export type Sound = SoundClass;

	export type DuckStorage = DuckStorageClass;

	export type Effect = EffectClass;
	export namespace PresetEffects {
		export type ExplosionEffect = ExplosionEffectClass;
		export type SmokeEffect = SmokeEffectClass;
	}

	export namespace Base {
		export type Once = OnceClass;
		export type Render = RenderClass;
	}

	export namespace Types {
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
				dprScale?: boolean;
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
				autoplay?: Helper.DefaultValue<undefined, false>;
				volume?: Helper.DefaultValue<undefined, number>;
				sprites?: Helper.DefaultValue<undefined, Sprite[]>;
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
				ArrowUp: boolean;
				ArrowDown: boolean;
				ArrowLeft: boolean;
				ArrowRight: boolean;
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

			export namespace Button {
				export type Shape = 'rect' | 'roundrect' | 'sprite';

				export type ListenerType = 'CLICK' | 'HOVER' | 'NOTHOVER';

				export interface ListenerReturn {
					x: number;
					y: number;
					type: ListenerType;
				}

				export type ListenerFunc = (e: ListenerReturn) => void;

				export interface Listener {
					type: ListenerType;
					func: ListenerFunc;
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
				[key: number]: HTMLImageElement | string;
			}
		}

		export namespace ParticleContainer {
			export interface Bounds {
				x: number;
				y: number;
				w: number;
				h: number;
			}

			export interface Physics {
				bounciness: number;
			}
		}

		export namespace Helper {
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

			export type NonNullable<T> = T extends null | undefined ? never : T;
			export type DefaultValue<
				Type,
				Default,
				ExtraRule = null
			> = Type extends null | undefined | false | 0 | ExtraRule | ''
				? Default
				: Type;

			//#region Long Type
			export type AlphaRange =
				| 0
				| 0.01
				| 0.02
				| 0.03
				| 0.04
				| 0.05
				| 0.06
				| 0.07
				| 0.08
				| 0.09
				| 0.1
				| 0.11
				| 0.12
				| 0.13
				| 0.14
				| 0.15
				| 0.16
				| 0.17
				| 0.18
				| 0.19
				| 0.2
				| 0.21
				| 0.22
				| 0.23
				| 0.24
				| 0.25
				| 0.26
				| 0.27
				| 0.28
				| 0.29
				| 0.3
				| 0.31
				| 0.32
				| 0.33
				| 0.34
				| 0.35
				| 0.36
				| 0.37
				| 0.38
				| 0.39
				| 0.4
				| 0.41
				| 0.42
				| 0.43
				| 0.44
				| 0.45
				| 0.46
				| 0.47
				| 0.48
				| 0.49
				| 0.5
				| 0.51
				| 0.52
				| 0.53
				| 0.54
				| 0.55
				| 0.56
				| 0.57
				| 0.58
				| 0.59
				| 0.6
				| 0.61
				| 0.62
				| 0.63
				| 0.64
				| 0.65
				| 0.66
				| 0.67
				| 0.68
				| 0.69
				| 0.7
				| 0.71
				| 0.72
				| 0.73
				| 0.74
				| 0.75
				| 0.76
				| 0.77
				| 0.78
				| 0.79
				| 0.8
				| 0.81
				| 0.82
				| 0.83
				| 0.84
				| 0.85
				| 0.86
				| 0.87
				| 0.88
				| 0.89
				| 0.9
				| 0.91
				| 0.92
				| 0.93
				| 0.94
				| 0.95
				| 0.96
				| 0.97
				| 0.98
				| 0.99
				| 1;
			//#endregion Long Type
		}
	}
}

// export

const DuckEngine = {
	Game: GameClass,
	Scene: SceneClass,
};

export default DuckEngine;
