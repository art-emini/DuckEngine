import Game from './game';
import Basic from '../base/render';
import { Duck } from '../index';

// debug
import Debug from './debug/debug';

// import gameobjects
import Sprite from './gameobjects/sprite';
import Rect from './gameobjects/rect';
import Circle from './gameobjects/circle';
import RoundRect from './gameobjects/roundrect';
import SpriteSheet from './gameobjects/spritesheet';

// particle stuff
import Particle from './particles/particle';
import ParticleEmitter from './particles/particleEmitter';

// other stuff
import Sound from './sound/sound';
import Input from './input/input';
import Camera from './camera/camera';
import StaticLight from './lights/staticLight';
import Group from './group/group';

// misc
import Cutscene from './cutscene/cutscene';
import Loader from './loader/loader';

// tools
import randomInt from './math/randomInt';
import randomFloat from './math/randomFloat';

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
// random
import randomColor from '../helper/color/randomColor';
import randomColorWithAlpha from '../helper/color/randomAlphaColor';

// physics
// intersect
import rectToRectIntersect from './physics/rectToRectIntersect';
import circleToRectIntersect from './physics/circleToRectIntersect';

// maps
import TileMap from './map/tilemap';

// base
import Once from '../base/once';
import Amount from '../base/amount';

// ui
import Button from './interactive/button';
import Text from './interactive/text';

// effects
import Effect from './effect/effect';
import ExplosionEffect from './effect/preset/explosion';
import SmokeEffect from './effect/preset/smoke';

export default class Scene extends Basic {
	public readonly key: string;
	protected game: Game;
	public visible: boolean;
	public readonly default: boolean;

	public mainObject: Duck.GameObjects.GameObject | undefined;
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
			spriteSheet: (
				x: number,
				y: number,
				imagePath: string,
				frameWidth: number,
				frameHeight: number,
				rows: number,
				cols: number,
				currentRow: number,
				currentCol: number
			) => SpriteSheet;
		};
		interactive: {
			text: (
				text: string,
				config: Duck.Types.Interactive.Text.Config
			) => Text;
			button: (
				shape: Duck.Types.Interactive.Button.Shape,
				x: number,
				y: number,
				w: number,
				h: number,
				r: number,
				fillColor: string,
				text: Text
			) => Button;
		};
		sound: (path: string, options?: Duck.Types.Sound.Config) => Sound;
		input: () => Input;
		camera: () => Camera;
		mainCamera: () => Camera;
		light: {
			staticLight: (
				x: number,
				y: number,
				r: number,
				fillColor: string,
				alpha: Duck.Types.Helper.AlphaRange
			) => StaticLight;
		};
		group: <t extends Duck.Types.Group.StackItem>(
			name: string,
			defaultValues?: t[]
		) => Group<t>;
		particle: (
			shape: Duck.Types.Collider.ShapeString,
			w: number,
			h: number,
			r: number,
			fillColor: string
		) => Particle;
		particleEmitter: (
			particle: Particle,
			rangeX: Duck.Types.ParticleEmitter.Range,
			rangeY: Duck.Types.ParticleEmitter.Range,
			amount: number
		) => ParticleEmitter;
		cutscene: (
			config: Duck.Types.Cutscene.Config,
			instructions: Duck.Types.Cutscene.Instructions
		) => Cutscene;
		tilemap: (
			tileW: number,
			tileH: number,
			rows: number,
			cols: number,
			map: Duck.Types.Tilemap.Map,
			atlas: Duck.Types.Tilemap.Atlas
		) => TileMap;
		effect: (
			rangeX: Duck.Types.ParticleEmitter.Range,
			rangeY: Duck.Types.ParticleEmitter.Range,
			particleEmitter: ParticleEmitter
		) => Effect;
		presetEffect: {
			explosionEffect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleAmount: number | undefined,
				speedRange: [1, 1] | undefined,
				maxAge: number | undefined,
				color: string | undefined
			) => ExplosionEffect;
			smokeEffect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleAmount: number | undefined,
				speedRangeX: [-0.1, 0.4] | undefined,
				speedRangeY: [-0.1, 0.4] | undefined,
				maxAge: number | undefined,
				color: '#2e2e2e' | undefined,
				interval: 50 | undefined
			) => SmokeEffect;
		};
	};

	public tools: {
		randomInt: (min: number, max: number) => number;
		randomFloat: (min: number, max: number, fixed?: number) => number;
		loader: Loader;
		color: {
			random: () => string;
			randomWithAlpha: (alpha?: Duck.Types.Helper.AlphaRange) => string;
			is: {
				hex: (str: string) => boolean;
				hsl: (str: string) => boolean;
				rgb: (str: string) => boolean;
			};
			convert: {
				rgb: {
					toHsl: (r: number, g: number, b: number) => string;
					toRgba: (
						color: string,
						alpha: Duck.Types.Helper.AlphaRange
					) => string;
				};
				rgba: {
					toHsla: (
						r: string | number,
						g: string | number,
						b: string | number,
						a: Duck.Types.Helper.AlphaRange
					) => string;
					toRgb: (rgba: string) => string;
				};
				hex: {
					toRgba: (
						hex: string,
						alpha: Duck.Types.Helper.AlphaRange
					) => string;
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
				spriteSheet: (
					x: number,
					y: number,
					imagePath: string,
					frameWidth: number,
					frameHeight: number,
					rows: number,
					cols: number,
					currentRow: number,
					currentCol: number
				) => {
					return new SpriteSheet(
						x,
						y,
						imagePath,
						frameWidth,
						frameHeight,
						rows,
						cols,
						currentRow,
						currentCol,
						this.game
					);
				},
			},
			interactive: {
				text: (
					text: string,
					config: Duck.Types.Interactive.Text.Config
				) => {
					return new Text(text, config, this.game);
				},
				button: (
					shape: Duck.Types.Interactive.Button.Shape,
					x: number,
					y: number,
					w: number,
					h: number,
					r: number,
					fillColor: string,
					text: Text
				) => {
					return new Button(
						shape,
						x,
						y,
						w,
						h,
						r,
						fillColor,
						text,
						this.game,
						this
					);
				},
			},
			sound: (path: string, options?: Duck.Types.Sound.Config) => {
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
					alpha: Duck.Types.Helper.AlphaRange
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
			group: <t extends Duck.Types.Group.StackItem>(
				name: string,
				defaultValues?: t[]
			) => {
				return new Group<t>(name, this.game, defaultValues);
			},
			particle: (
				shape: Duck.Types.Collider.ShapeString,
				w: number,
				h: number,
				r: number,
				fillColor: string
			) => {
				return new Particle(shape, w, h, r, fillColor, this.game);
			},
			particleEmitter: (
				particle: Particle,
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
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
				config: Duck.Types.Cutscene.Config,
				instructions: Duck.Types.Cutscene.Instructions
			) => {
				return new Cutscene(config, instructions, this.game);
			},
			tilemap: (
				tileW: number,
				tileH: number,
				rows: number,
				cols: number,
				map: Duck.Types.Tilemap.Map,
				atlas: Duck.Types.Tilemap.Atlas
			) => {
				return new TileMap(
					tileW,
					tileH,
					rows,
					cols,
					map,
					atlas,
					this.game
				);
			},
			effect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleEmitter: ParticleEmitter
			) => {
				return new Effect(rangeX, rangeY, particleEmitter, this.game);
			},
			presetEffect: {
				explosionEffect: (
					rangeX: Duck.Types.ParticleEmitter.Range,
					rangeY: Duck.Types.ParticleEmitter.Range,
					particleAmount = 50,
					speedRange = [1, 1],
					maxAge = 3,
					color = '#FFA500'
				) => {
					return new ExplosionEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRange,
						maxAge,
						color
					);
				},
				smokeEffect: (
					rangeX: Duck.Types.ParticleEmitter.Range,
					rangeY: Duck.Types.ParticleEmitter.Range,
					particleAmount = 50,
					speedRangeX = [-0.1, 0.4],
					speedRangeY = [-0.1, 0.4],
					maxAge = 20,
					color = '#2e2e2e',
					interval = 50
				) => {
					return new SmokeEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRangeX,
						speedRangeY,
						maxAge,
						color,
						interval
					);
				},
			},
		};

		this.tools = {
			randomInt: randomInt,
			randomFloat: randomFloat,
			loader: Loader,
			color: {
				random: randomColor,
				randomWithAlpha: (alpha?: Duck.Types.Helper.AlphaRange) =>
					randomColorWithAlpha(alpha),
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

	// eslint-disable-next-line @typescript-eslint/ban-types
	public once(func: Function, run?: boolean) {
		const one = new Once(func, run);
		return one;
	}

	public runAmount(
		func: (currentCount: number) => void,
		maxAmount: number,
		run?: boolean
	) {
		const amount = new Amount(func, maxAmount, this.game, run);
		return amount;
	}
}
