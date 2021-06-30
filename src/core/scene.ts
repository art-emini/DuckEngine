import Game from './game';
import Basic from '../base/render';
import { Duck } from '../index';

// debug
import Debug from './debug/debug';

// import gameobjects
import Sprite from './gameobjects/sprite';
import Rect from './gameobjects/rect';
import Circle from './gameobjects/circle';
import Text from './interactive/text';
import RoundRect from './gameobjects/roundrect';

// particle stuff
import Particle from './particles/particle';
import ParticleEmitter from './particles/particleEmitter';

// other stuff
import Sound from './sound/sound';
import Input from './input/input';
import Camera from './camera/camera';
import StaticLight from './lights/staticLight';
import Group from './group/group';

// tools
import randomInt from '../utils/randomInt';
import randomColor from '../helper/color/randomColor';

// color
// is
import isHex from '../helper/color/isHex';
import isHSL from '../helper/color/isHSL';
import isRGB from '../helper/color/isRGB';
// convert
import rgbToRGBA from '../helper/color/rgbToRGBA';
import rgbToHSL from '../helper/color/rgbToHSL';
import rgbaToHSLA from '../helper/color/rgbaToHSLA';
import rgbaToRGB from '../helper/color/rgbaToRGB';
import hexToRGBA from '../helper/color/hexToRGBA';
import hexToRGB from '../helper/color/hexToRGB';
import hexToHSL from '../helper/color/hexToHSL';
import Cutscene from './cutscene/cutscene';

// physics
// intersect
import rectToRectIntersect from './physics/rectToRectIntersect';
import circleToRectIntersect from './physics/circleToRectIntersect';
import Loader from './loader/loader';

export default class Scene extends Basic {
	public readonly key: string;
	private game: Game;
	public visible: boolean;
	public readonly default: boolean;

	public mainObject: Duck.GameObject | undefined;
	public currentCamera: Camera | undefined;
	public mainCamera: Camera | undefined;

	public cameras: Camera[];

	// methods

	public add: {
		gameobject: {
			sprite: (
				x: number,
				y: number,
				w: number,
				h: number,
				imgpath: string
			) => Sprite;
			rect: (
				x: number,
				y: number,
				w: number,
				h: number,
				fillColor: string
			) => Rect;
			circle: (
				x: number,
				y: number,
				r: number,
				fillColor: string
			) => Circle;
			roundRect: (
				x: number,
				y: number,
				w: number,
				h: number,
				r: number,
				fillColor: string
			) => RoundRect;
		};
		interactive: {
			text: (text: string, config: Duck.Interactive.Text.Config) => Text;
		};
		sound: (path: string, options?: Duck.Sound.Config) => Sound;
		input: () => Input;
		camera: () => Camera;
		mainCamera: () => Camera;
		light: {
			staticLight: (
				x: number,
				y: number,
				r: number,
				fillColor: string,
				alpha: number
			) => StaticLight;
		};
		group: <t extends Duck.Group.StackItem>(
			name: string,
			defaultValues?: t[]
		) => Group<t>;
		particle: (
			shape: Duck.Collider.ShapeString,
			w: number,
			h: number,
			r: number,
			fillColor: string
		) => Particle;
		particleEmitter: (
			particle: Particle,
			rangeX: Duck.ParticleEmitter.Range,
			rangeY: Duck.ParticleEmitter.Range,
			amount: number
		) => ParticleEmitter;
		cutscene: (
			config: Duck.Cutscene.Config,
			instructions: Duck.Cutscene.Instructions
		) => Cutscene;
	};

	public tools: {
		randomInt: (min: number, max: number) => number;
		loader: Loader;
		color: {
			random: () => string;
			is: {
				hex: (str: string) => boolean;
				hsl: (str: string) => boolean;
				rgb: (str: string) => boolean;
			};
			convert: {
				rgb: {
					toHsl: (r: number, g: number, b: number) => string;
					toRgba: (color: string, alpha: number) => string;
				};
				rgba: {
					toHsla: (
						r: string | number,
						g: string | number,
						b: string | number,
						a: number
					) => string;
					toRgb: (rgba: string) => string;
				};
				hex: {
					toRgba: (hex: string, alpha: number) => string;
					toRgb: (hex: string) => string | null;
					toHsl: (hex: string) => string;
				};
			};
		};
		physics: {
			rectToRectIntersect: (
				rect: Rect | Sprite,
				rect2: Rect | Sprite
			) => boolean;
			circleToRectIntersect: (
				circle:
					| Circle
					| {
							x: number;
							y: number;
							w: number;
							h: number;
							r: number;
					  },
				rect:
					| Rect
					| Sprite
					| { x: number; y: number; w: number; h: number }
			) => boolean;
		};
	};

	constructor(key: string, game: Game, visible?: boolean) {
		super();

		this.key = key;
		this.game = game;
		this.visible = visible || false;
		this.default = false;

		// set visible if key is same as defaultScene key

		if (this.game.stack.defaultScene === this.key) {
			this.default = true;
			this.visible = true;
		}

		// main object and camera
		this.mainObject;
		this.currentCamera;

		this.mainCamera;
		this.cameras = [];

		// push to stack
		this.game.stack.scenes.push(this);

		// methods
		this.add = {
			gameobject: {
				sprite: (
					x: number,
					y: number,
					w: number,
					h: number,
					imgpath: string
				) => {
					return new Sprite(x, y, w, h, imgpath, this.game);
				},
				rect: (
					x: number,
					y: number,
					w: number,
					h: number,
					fillColor: string
				) => {
					return new Rect(x, y, w, h, fillColor, this.game);
				},
				circle: (
					x: number,
					y: number,
					r: number,
					fillColor: string
				) => {
					return new Circle(x, y, r, fillColor, this.game);
				},
				roundRect: (
					x: number,
					y: number,
					w: number,
					h: number,
					r: number,
					fillColor: string
				) => {
					return new RoundRect(x, y, w, h, r, fillColor, this.game);
				},
			},
			interactive: {
				text: (text: string, config: Duck.Interactive.Text.Config) => {
					return new Text(text, config, this.game);
				},
			},
			sound: (path: string, options?: Duck.Sound.Config) => {
				return new Sound(path, options);
			},
			input: () => {
				return new Input(this.game);
			},
			camera: () => {
				const c = new Camera(this.game, this);
				this.cameras.push(c);
				return c;
			},
			mainCamera: () => {
				const c = new Camera(this.game, this);
				this.cameras.push(c);
				this.mainCamera = c;
				this.currentCamera = c;
				return c;
			},
			light: {
				staticLight: (
					x: number,
					y: number,
					r: number,
					fillColor: string,
					alpha: number
				) => {
					return new StaticLight(
						x,
						y,
						r,
						fillColor,
						alpha,
						this.game
					);
				},
			},
			group: <t extends Duck.Group.StackItem>(
				name: string,
				defaultValues?: t[]
			) => {
				return new Group<t>(name, this.game, defaultValues);
			},
			particle: (
				shape: Duck.Collider.ShapeString,
				w: number,
				h: number,
				r: number,
				fillColor: string
			) => {
				return new Particle(shape, w, h, r, fillColor, this.game);
			},
			particleEmitter: (
				particle: Particle,
				rangeX: Duck.ParticleEmitter.Range,
				rangeY: Duck.ParticleEmitter.Range,
				amount: number
			) => {
				return new ParticleEmitter(
					particle,
					rangeX,
					rangeY,
					amount,
					this.game
				);
			},
			cutscene: (
				config: Duck.Cutscene.Config,
				instructions: Duck.Cutscene.Instructions
			) => {
				return new Cutscene(config, instructions, this.game);
			},
		};

		this.tools = {
			randomInt: randomInt,
			loader: Loader,
			color: {
				random: randomColor,
				is: {
					hex: isHex,
					hsl: isHSL,
					rgb: isRGB,
				},
				convert: {
					rgb: {
						toHsl: rgbToHSL,
						toRgba: rgbToRGBA,
					},
					rgba: {
						toHsla: rgbaToHSLA,
						toRgb: rgbaToRGB,
					},
					hex: {
						toRgba: hexToRGBA,
						toRgb: hexToRGB,
						toHsl: hexToHSL,
					},
				},
			},
			physics: {
				rectToRectIntersect: (
					rect: Rect | Sprite,
					rect2: Rect | Sprite
				) => {
					return rectToRectIntersect(rect, rect2);
				},
				circleToRectIntersect: (
					circle:
						| Circle
						| {
								x: number;
								y: number;
								w: number;
								h: number;
								r: number;
						  },
					rect:
						| Rect
						| Sprite
						| { x: number; y: number; w: number; h: number }
				) => {
					return circleToRectIntersect(circle, rect);
				},
			},
		};
	}

	public switchCamera(camera: Camera) {
		const foundCamera = this.cameras.find((_camera) => _camera === camera);
		if (foundCamera) {
			this.currentCamera = foundCamera;
			if (this.game.config.debug) {
				new Debug.Log('Switched cameras.');
			}
		} else {
			new Debug.Error(
				'Cannot switch camera. Camera not found in the current scene.'
			);
		}
	}

	public switchToMainCamera() {
		this.currentCamera = this.mainCamera;
		if (this.game.config.debug) {
			new Debug.Log('Switched to main camera.');
		}
	}

	public setMainCamera(camera: Camera) {
		this.mainCamera = camera;
		if (this.game.config.debug) {
			new Debug.Log(`Set main camera to ${camera}.`);
		}
	}
}
