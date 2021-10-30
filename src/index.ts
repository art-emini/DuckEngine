/* eslint-disable @typescript-eslint/ban-types */
// import

import CameraClass from './core/camera/camera';
import GameClass from './core/game';
import SceneClass from './core/scene';
import TextClass from './core/gameobjects/interactive/text';
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
import ParticleClass from './core/gameobjects/particles/particle';
import ParticleEmitterClass from './core/gameobjects/particles/particleEmitter';
import SoundPlayerClass from './core/sound/soundPlayer';
import DuckStorageClass from './core/storage/storage';
import OnceClass from './base/once';
import RenderClass from './base/render';
import ButtonClass from './core/gameobjects/interactive/button';
import ParticleContainerClass from './core/gameobjects/particles/particleContainer';
import EffectClass from './core/effect/effect';
import ExplosionEffectClass from './core/effect/preset/explosion';
import SmokeEffectClass from './core/effect/preset/smoke';
import Vector2Class from './core/math/vector2';
import DisplayListClass from './core/models/displayList';
import CanvasModulateClass from './core/gameobjects/misc/canvasModulate';
import MapClass from './core/map/map';
import RaycastClass from './core/misc/raycast';
import AmountClass from './base/amount';
import TextureClass from './core/models/texture';

// main

// spec
/**
 * @namespace Duck
 * All Types, Type Classes, Classes, and Config is stored here.
 * @since 1.0.0-beta
 */
export namespace Duck {
	export const AutoCanvas = () => {
		let canvas: HTMLCanvasElement = document.querySelector(
			'canvas'
		) as HTMLCanvasElement;

		let ctx: CanvasRenderingContext2D = canvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		// check if canvas exists on document
		if (document.querySelector('canvas')) {
			canvas = document.querySelector('canvas') as HTMLCanvasElement;
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		} else {
			canvas = document.createElement('canvas') as HTMLCanvasElement;
			document.body.appendChild(canvas);
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		}

		return {
			canvas,
			ctx,
		};
	};

	export namespace Classes {
		export const Game = GameClass;
		export const Scene = SceneClass;

		export namespace Gameobjects {
			export const GameObject = GameObjectClass;
			export const Circle = CircleClass;
			export const Rect = RectClass;
			export const RoundRect = RoundRectClass;
			export const Sprite = SpriteClass;
			export const SpriteSheet = SpriteSheetClass;

			export namespace Particles {
				export const Particle = ParticleClass;
				export const ParticleEmitter = ParticleEmitterClass;
				export const ParticleContainer = ParticleContainerClass;
			}
			export namespace Interactive {
				export const Button = ButtonClass;
				export const Text = TextClass;
			}

			export namespace Misc {
				export const CanvasModulate = CanvasModulateClass;
			}
		}

		export namespace Effects {
			export const Effect = EffectClass;

			export namespace Presets {
				export const ExplosionEffect = ExplosionEffectClass;
				export const SmokeEffect = SmokeEffectClass;
			}
		}

		export namespace Misc {
			export const Storage = DuckStorageClass;
			export const Loader = LoaderClass;
			export const Group = GroupClass;
			export const Cutscene = CutsceneClass;
			export const Raycast = RaycastClass;
		}

		export namespace Base {
			export const Amount = AmountClass;
			export const Once = OnceClass;
			export const Render = RenderClass;
		}

		export namespace Sound {
			export const SoundPlayer = SoundPlayerClass;
		}

		export namespace Cameras {
			export const Camera = CameraClass;
		}

		export namespace Physics {
			export const Collider = ColliderClass;
		}

		export namespace Models {
			export const DisplayList = DisplayListClass;
			export const Texture = TextureClass;
		}

		export namespace Map {
			export const Map = MapClass;
			export const TileMap = TileMapClass;
		}

		export namespace Math {
			export const Vector2 = Vector2Class;
		}

		export namespace Lights {
			export const StaticLight = StaticLightClass;
		}

		export namespace Input {
			export const Input = InputClass;
		}
	}

	export namespace TypeClasses {
		export type Game = GameClass;
		export type Scene = SceneClass;

		export namespace GameObjects {
			export type GameObject<
				textureType extends Duck.Types.Texture.Type
			> = GameObjectClass<textureType>;
			export type Circle = CircleClass;
			export type Rect = RectClass;
			export type RoundRect = RoundRectClass;
			export type Sprite = SpriteClass;
			export type SpriteSheet = SpriteSheetClass;

			export namespace Particles {
				export type Particle = ParticleClass;
				export type ParticleEmitter = ParticleEmitterClass;
				export type ParticleContainer = ParticleContainerClass;
			}
			export namespace Interactive {
				export type Button = ButtonClass;
				export type Text = TextClass;
			}

			export namespace Misc {
				export type CanvasModulate = CanvasModulateClass;
			}
		}

		export namespace Effects {
			export type Effect = EffectClass;

			export namespace Presets {
				export type ExplosionEffect = ExplosionEffectClass;
				export type SmokeEffect = SmokeEffectClass;
			}
		}

		export namespace Misc {
			export type Storage = DuckStorageClass;
			export type Loader = LoaderClass;
			export type Group<t extends Duck.Types.Group.StackItem> =
				GroupClass<t>;
			export type Cutscene = CutsceneClass;
			export type Raycast = RaycastClass;
		}

		export namespace Base {
			export type Amount = AmountClass;
			export type Once = OnceClass;
			export type Render = RenderClass;
		}

		export namespace Sound {
			export type SoundPlayer = SoundPlayerClass;
		}

		export namespace Cameras {
			export type Camera = CameraClass;
		}

		export namespace Physics {
			export type Collider = ColliderClass;
		}

		export namespace Models {
			export type DisplayList = DisplayListClass;
			export type Texture<type extends Duck.Types.Texture.Type> =
				TextureClass<type>;
		}

		export namespace Maps {
			export type Map<
				map extends number[][],
				atlas extends {
					[key: number]: HTMLImageElement | string;
				}
			> = MapClass<map, atlas>;
			export type TileMap = TileMapClass;
		}

		export namespace Math {
			export type Vector2 = Vector2Class;
		}

		export namespace Lights {
			export type StaticLight = StaticLightClass;
		}

		export namespace Input {
			export type Input = InputClass;
		}
	}

	export namespace Types {
		export type GameObject<textureType extends Duck.Types.Texture.Type> =
			GameObjectClass<textureType>;
		export type Renderable =
			| GameObjectClass<Duck.Types.Texture.Type>
			| Duck.TypeClasses.Effects.Effect
			| Duck.TypeClasses.Maps.TileMap;
		export namespace Game {
			export interface Config {
				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Canvas element to render to or return value from Duck.AutoCanvas()
				 * @type HTMLCanvasElement | { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; }
				 * @since 1.0.0-beta
				 */
				canvas:
					| HTMLCanvasElement
					| {
							canvas: HTMLCanvasElement;
							ctx: CanvasRenderingContext2D;
					  };

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Key of scene that is defaulted to be visible
				 * @type string
				 * @since 1.0.0-beta
				 */
				defaultScene: string;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Rounds pixels from floats to integers, effects gameobjects (excluding particles)
				 * @type boolean
				 * @since 2.0.0
				 */
				roundPixels?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if rendering renderable objects is paused if tab is not focused, uses window.onblur and window.onfocus
				 * @type boolean
				 * @since 2.0.0
				 */
				pauseRenderingOnBlur?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Function to call when rendering is paused, rendering pauses when this.stop is called or
				 * if pauseRenderingOnBlur is true and the window.blur event was fired
				 * @type (reason: 'windowBlur' | 'gameStop') => void
				 * @since 2.0.0
				 */
				onPauseRendering?: (reason: 'windowBlur' | 'gameStop') => void;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Function to call when rendering is resumed/started, rendering resumes/starts when this.start is called or
				 * if the window.focus event was fired
				 * @type (reason: 'windowFocus' | 'gameStart') => void
				 * @since 2.0.0
				 */
				onResumeRendering?: (
					reason: 'windowFocus' | 'gameStart'
				) => void;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Scale of the canvas, the size of the canvas
				 * @type Duck.Types.Misc.Scale
				 * @since 1.0.0-beta
				 */
				scale?: Misc.Scale;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if DuckEngine logs out events that are occurring
				 * @type boolean
				 * @since 1.0.0-beta
				 */
				debug?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if DuckEngine silences/prevents pauseRenderingOnBlur, onPauseRendering, and onResumeRendering configurations
				 * @type boolean
				 * @since 2.0.0
				 */
				debugRendering?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Custom splash screen options, shows while the game is starting/loading, default img: https://i.ibb.co/bdN4CCN/Logo-Splash.png
				 * default extraDuration: 500
				 * @type { img: string | 'default'; extraDuration?: number; }
				 * @since 2.0.0
				 */
				splashScreen?: {
					img: string | 'default';
					extraDuration?: number;
				};

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description DuckStorage config, creates an instance if passed
				 * @type Duck.Types.Storage.Config
				 * @since 1.0.0-beta
				 */
				storage?: Storage.Config;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description CSS background color of the canvas (hint: to fill a scene with a background color, use scene.add.misc.canvasModulate)
				 * @type string
				 * @since 1.0.0-beta
				 */
				background?: string;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Determines if the canvas is scaled down to the window size if the window size is smaller than the canvas
				 * @type boolean
				 * @since 1.0.0
				 */
				smartScale?: boolean;

				/**
				 * @memberof Duck.Types.Game.Config
				 * @description Uses the device pixel ratio to scale the canvas accordingly
				 * @type boolean
				 * @since 1.0.0
				 */
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
				| 'sprite'
				| 'raycast';
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
				| GameObject<Duck.Types.Texture.Type>
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

			export type StepType =
				| 'MOVE'
				| 'DRAW'
				| 'FUNC'
				| 'CAMERA_ZOOM'
				| 'CAMERA_FOV'
				| 'CAMERA_MOVE'
				| 'CAMERA_SHAKE'
				| 'CAMERA_START_FOLLOW'
				| 'CAMERA_STOP_FOLLOW';

			export interface Step {
				type: StepType;
				affect?: GameObject<Duck.Types.Texture.Type> | CameraClass;
				moveTo?: {
					x?: number;
					y?: number;
				};
				func?: Function;
				cameraValue?: number;
				cameraIntervalMS?: number;
				cameraTimeMS?: number;
				sleepValue?: number;
				cameraFollow?: GameObject<Duck.Types.Texture.Type>;
				cameraFollowLerpX?: number;
				cameraFollowLerpY?: number;
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
						follow?: GameObject<Duck.Types.Texture.Type>;
						zoom: number;
						pos?: {
							x: number;
							y: number;
						};
						followLerpX: number;
						followLerpY: number;
					};
					otherCameraSettings?: {
						FOV: number;
						follow?: GameObject<Duck.Types.Texture.Type>;
						zoom: number;
						pos?: {
							x: number;
							y: number;
						};
						followLerpX: number;
						followLerpY: number;
					}[];
				};
				steps: Step[];
			}

			export interface Config {
				mainCamera: CameraClass;
				otherCameras?: CameraClass[];
				otherObjects?: GameObject<Duck.Types.Texture.Type>[];
				mainObject: GameObject<Duck.Types.Texture.Type>;
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
				position: {
					x: number;
					y: number;
				};
				w: number;
				h: number;
			}

			export interface Physics {
				bounciness: number;
			}
		}

		export namespace Raycast {
			export interface State {
				colliding: StateValue | false;
				collidingTop: StateValue | false;
				collidingBottom: StateValue | false;
				collidingLeft: StateValue | false;
				collidingRight: StateValue | false;
			}

			export interface StateValue {
				intersection: Vector2Class;
				with: GameObject<Duck.Types.Texture.Type>;
			}
		}

		export namespace Loader {
			export type StackItemType =
				| 'texture'
				| 'json'
				| 'font'
				| 'html'
				| 'xml'
				| 'audio';

			export interface StackItem<t> {
				type: StackItemType;
				value: t;
				key: string;
			}
		}

		export namespace Texture {
			export type Type = 'image' | 'color' | 'either';
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

/**
 * @namespace
 * @property {Game} game Game Class
 * @property {Scene} scene Scene Class
 * @description Main Export of DuckEngine
 */
const DuckEngine = {
	Game: GameClass,
	Scene: SceneClass,
};

export default DuckEngine;
