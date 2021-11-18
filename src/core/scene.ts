/* eslint-disable @typescript-eslint/ban-types */
import Game from './game';
import Render from '../base/render';
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
import Particle from './gameobjects/particles/particle';
import ParticleEmitter from './gameobjects/particles/particleEmitter';

// other stuff
import SoundPlayer from './sound/soundPlayer';
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
import Button from './gameobjects/interactive/button';
import Text from './gameobjects/interactive/text';

// effects
import Effect from './effect/effect';
import ExplosionEffect from './effect/preset/explosion';
import SmokeEffect from './effect/preset/smoke';
import DisplayList from './models/displayList';
import CanvasModulate from './gameobjects/misc/canvasModulate';
import Vector2 from './math/vector2';
import clamp from './math/clamp';
import lerp from './math/lerp';
import PhysicsServer from './physics/server/physicsServer';
import PhysicsList from './models/physicsList';
import Area from './physics/models/area';
import PhysicsBody from './physics/physicsBody';
import GameObject from './gameobjects/gameObject';

/**
 * @class Scene
 * @classdesc Creates a DuckEngine Scene
 * @description The Scene Class. Main rendering happens here
 * @since 1.0.0-beta
 */
export default class Scene extends Render {
	public readonly key: string;
	protected game: Game;
	public visible: boolean;
	public readonly default: boolean;

	public mainObject:
		| Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
		| undefined;
	public currentCamera: Camera | undefined;
	public mainCamera: Camera | undefined;

	public cameras: Camera[];

	public displayList: DisplayList;
	public physicsList: PhysicsList;

	public loader: Loader;

	public physicsServer: PhysicsServer | undefined;

	// methods

	public add: {
		gameobject: {
			misc: {
				canvasModulate: (
					x: number,
					y: number,
					w: number,
					h: number,
					fillColor: string
				) => CanvasModulate;
			};
			existing: <t extends Duck.Types.Texture.Type>(
				gameobject: GameObject<t>
			) => GameObject<t>;
			sprite: (
				x: number,
				y: number,
				w: number,
				h: number,
				textureKey: string
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
				textureKey: string,
				frameWidth: number,
				frameHeight: number,
				rows: number,
				cols: number,
				currentRow: number,
				currentCol: number
			) => SpriteSheet;
		};
		misc: {
			area: (
				x: number,
				y: number,
				w: number,
				h: number,
				collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[]
			) => Area;
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
		soundPlayer: (
			path: string,
			options?: Duck.Types.Sound.Config
		) => SoundPlayer;
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
		loader: typeof Loader;
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
							position: { x: number; y: number };
							w: number;
							h: number;
							r: number;
					  },
				rect:
					| Rect
					| Sprite
					| {
							position: { x: number; y: number };
							w: number;
							h: number;
					  }
			) => boolean;
		};
		math: {
			createVector: (x?: number, y?: number) => Vector2;
			vector: typeof Vector2;
			clamp: (x: number, min: number, max: number) => number;
			lerp: (start: number, end: number, amount: number) => number;
			randomInt: (min: number, max: number) => number;
			randomFloat: (min: number, max: number, fixed?: number) => number;
		};
	};

	/**
	 * @constructor Scene
	 * @description Creates a Scene instance.
	 * @param {string} key Key/Identifier or name of scene
	 * @param {Game} game Game instance
	 * @param {boolean} [visible=false] Is the scene visible, defaults to false
	 * @since 1.0.0-beta
	 */
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

		this.displayList = new DisplayList();
		this.physicsList = new PhysicsList();

		this.loader = new Loader(this);

		if (this.game.config.physics?.enabled) {
			this.physicsServer = new PhysicsServer(this.game, this);
		}

		// methods

		/**
		 * @memberof Scene
		 * @description Adds anything to a scene
		 * @since 1.0.0-beta
		 */
		this.add = {
			gameobject: {
				misc: {
					canvasModulate: (
						x: number,
						y: number,
						w: number,
						h: number,
						fillColor: string
					) => {
						const myCanvasModulate = new CanvasModulate(
							x,
							y,
							w,
							h,
							fillColor,
							this.game,
							this
						);
						this.displayList.add(myCanvasModulate);
						this.physicsList.add(myCanvasModulate);
						return myCanvasModulate;
					},
				},
				existing: <t extends Duck.Types.Texture.Type>(
					gameobject: GameObject<t>
				) => {
					this.displayList.add(gameobject);
					this.physicsList.add(gameobject);
					return gameobject;
				},
				sprite: (
					x: number,
					y: number,
					w: number,
					h: number,
					textureKey: string
				) => {
					const sprite = new Sprite(
						x,
						y,
						w,
						h,
						textureKey,
						this.game,
						this
					);
					this.displayList.add(sprite);
					this.physicsList.add(sprite);
					return sprite;
				},
				rect: (
					x: number,
					y: number,
					w: number,
					h: number,
					fillColor: string
				) => {
					const rect = new Rect(
						x,
						y,
						w,
						h,
						fillColor,
						this.game,
						this
					);
					this.displayList.add(rect);
					this.physicsList.add(rect);
					return rect;
				},
				circle: (
					x: number,
					y: number,
					r: number,
					fillColor: string
				) => {
					const circle = new Circle(
						x,
						y,
						r,
						fillColor,
						this.game,
						this
					);
					this.displayList.add(circle);
					this.physicsList.add(circle);
					return circle;
				},
				roundRect: (
					x: number,
					y: number,
					w: number,
					h: number,
					r: number,
					fillColor: string
				) => {
					const roundRect = new RoundRect(
						x,
						y,
						w,
						h,
						r,
						fillColor,
						this.game,
						this
					);
					this.displayList.add(roundRect);
					this.physicsList.add(roundRect);
					return roundRect;
				},
				spriteSheet: (
					x: number,
					y: number,
					textureKey: string,
					frameWidth: number,
					frameHeight: number,
					rows: number,
					cols: number,
					currentRow: number,
					currentCol: number
				) => {
					const spriteSheet = new SpriteSheet(
						x,
						y,
						textureKey,
						frameWidth,
						frameHeight,
						rows,
						cols,
						currentRow,
						currentCol,
						this.game,
						this
					);
					this.displayList.add(spriteSheet);
					this.physicsList.add(spriteSheet);
					return spriteSheet;
				},
			},
			misc: {
				area: (
					x: number,
					y: number,
					w: number,
					h: number,
					collisionFilter: PhysicsBody<Duck.Types.Texture.Type>[]
				) => {
					const myArea = new Area(
						x,
						y,
						w,
						h,
						collisionFilter,
						this.game,
						this
					);
					this.physicsList.add(myArea);
					return myArea;
				},
			},
			interactive: {
				text: (
					text: string,
					config: Duck.Types.Interactive.Text.Config
				) => {
					const myText = new Text(text, config, this.game, this);
					this.displayList.add(myText);
					this.physicsList.add(myText);
					return myText;
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
					const myButton = new Button(
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
					this.displayList.add(myButton);
					this.physicsList.add(myButton);
					return myButton;
				},
			},
			soundPlayer: (path: string, options?: Duck.Types.Sound.Config) => {
				return new SoundPlayer(path, options);
			},
			input: () => {
				return new Input(this.game, this);
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
					const myStaticLight = new StaticLight(
						x,
						y,
						r,
						fillColor,
						alpha,
						this.game,
						this
					);
					this.displayList.add(myStaticLight);
					this.physicsList.add(myStaticLight);
					return myStaticLight;
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
				const myParticle = new Particle(
					shape,
					w,
					h,
					r,
					fillColor,
					this.game,
					this
				);
				this.displayList.add(myParticle);
				this.physicsList.add(myParticle);
				return myParticle;
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
					this.game,
					this
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
				const myTileMap = new TileMap(
					tileW,
					tileH,
					rows,
					cols,
					map,
					atlas,
					this.game
				);
				this.displayList.add(myTileMap);
				return myTileMap;
			},
			effect: (
				rangeX: Duck.Types.ParticleEmitter.Range,
				rangeY: Duck.Types.ParticleEmitter.Range,
				particleEmitter: ParticleEmitter
			) => {
				const myEffect = new Effect(
					rangeX,
					rangeY,
					particleEmitter,
					this.game
				);
				this.displayList.add(myEffect);
				return myEffect;
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
					const myExplosionEffect = new ExplosionEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRange,
						maxAge,
						color,
						this
					);
					this.displayList.add(myExplosionEffect);
					return myExplosionEffect;
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
					const mySmokeEffect = new SmokeEffect(
						rangeX,
						rangeY,
						this.game,
						particleAmount,
						speedRangeX,
						speedRangeY,
						maxAge,
						color,
						interval,
						this
					);
					this.displayList.add(mySmokeEffect);
					return mySmokeEffect;
				},
			},
		};

		/**
		 * @memberof Scene
		 * @description Tools such as generating random numbers, colors, converting colors, and math tools are located here
		 * @since 1.0.0-beta
		 */
		this.tools = {
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
								position: { x: number; y: number };
								w: number;
								h: number;
								r: number;
						  },
					rect:
						| Rect
						| Sprite
						| {
								position: { x: number; y: number };
								w: number;
								h: number;
						  }
				) => {
					return circleToRectIntersect(circle, rect);
				},
			},
			math: {
				createVector: (x?: number, y?: number) => {
					return Vector2.CREATE(x, y);
				},
				vector: Vector2,
				clamp: clamp,
				lerp: lerp,
				randomInt: randomInt,
				randomFloat: randomFloat,
			},
		};
	}

	/**
	 * @memberof Scene
	 * @description Calls physics server __tick method if game.config.physics.enabled is true
	 *
	 * *Do not call manually, this is called in GAME LOOP*
	 *
	 * @since 2.0.0
	 */
	public __tick() {
		if (!this.game.config.physics?.customTick) {
			this.physicsServer?.__tick();
		}
	}

	/**
	 * @memberof Scene
	 * @description Switches the active camera to a passed camera
	 * @param {Camera} camera Camera to switch to
	 * @memberof 1.0.0-beta
	 */
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

	/**
	 * @memberof Scene
	 * @description Switches the active camera to the main camera
	 * @since 1.0.0-beta
	 */
	public switchToMainCamera() {
		this.currentCamera = this.mainCamera;
		if (this.game.config.debug) {
			new Debug.Log('Switched to main camera.');
		}
	}

	/**
	 * @memberof Scene
	 * @description Sets a camera as the main camera
	 * @param {Camera} camera Camera to set the main camera as
	 * @since 1.0.0-beta
	 */
	public setMainCamera(camera: Camera) {
		this.mainCamera = camera;
		if (this.game.config.debug) {
			new Debug.Log(`Set main camera to ${camera}.`);
		}
	}

	/**
	 * @memberof Scene
	 * @description Runs a function once no matter if it is in a loop or not
	 * @param {Function} func Function to run
	 * @param {boolean} [run] Determines if function is ran right when it is initialized
	 * @since 1.0.0
	 */
	public once(func: Function, run?: boolean) {
		const one = new Once(func, run);
		return one;
	}

	/**
	 * @memberof Scene
	 * @description Allows a function to only be ran a max amount of times
	 * @param {(currentCount:number) => void} func Function to call
	 * @param {number} maxAmount Max amount of times to allow the function to be called
	 * @param {boolean} [run] Determines if function is ran right when it is initialized
	 * @since 1.1.0
	 */
	public runAmount(
		func: (currentCount: number) => void,
		maxAmount: number,
		run?: boolean
	) {
		const amount = new Amount(func, maxAmount, this.game, run);
		return amount;
	}
}
