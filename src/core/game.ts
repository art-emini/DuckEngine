import { Duck } from '../index';
import Scene from './scene';
import Debug from './debug/debug';
import startup from '../helper/startup';
import dprScale from '../helper/dprScale';
import EventEmitter from './events/eventEmitter';
import EVENTS from './events/events';
import detectBrowser from '../utils/detectBrowser';
import smoothOut from '../utils/smoothArray';
import PluginManager from './misc/pluginManager';
import CacheManager from './storage/cacheManager';
import CanvasRenderer from './display/canvas/canvasRenderer';

/**
 * @class Game
 * @classdesc Creates a DuckEngine Game
 * @description The Game Class. Stores many important methods and properties.
 * @since 1.0.0-beta
 */
export default class Game {
	/**
	 * @memberof Game
	 * @description Game Configuration
	 * @type Duck.Types.Game.Config
	 * @since 1.0.0-beta
	 */
	public readonly config: Duck.Types.Game.Config;

	/**
	 * @memberof Game
	 * @description The Canvas that is used to render to
	 * @type HTMLCanvasElement
	 * @since 1.0.0-beta
	 */
	public canvas: HTMLCanvasElement;

	/**
	 * @memberof Game
	 * @description The CanvasRenderingContext2D that is used
	 * @type CanvasRenderingContext2D
	 * @since 1.0.0-beta
	 */
	public ctx: CanvasRenderingContext2D;

	/**
	 * @memberof Game
	 * @description The Renderer used to draw and clear frames
	 * @type CanvasRenderer
	 * @since 2.1.0
	 */
	public renderer: CanvasRenderer;

	/**
	 * @memberof Game
	 * @description The Game Stack, holds all Scenes, and the defaultScene key
	 * @type Duck.Types.Game.Stack
	 * @since 1.0.0-beta
	 */
	public stack: Duck.Types.Game.Stack;

	/**
	 * @memberof Game
	 * @description A reference to the animationFrame
	 * @type number | undefined
	 * @since 1.0.0
	 */
	public animationFrame: number | undefined;

	/**
	 * @memberof Game
	 * @description A CacheManager instance
	 * @type CacheManager
	 * @since 2.0.0
	 */
	public cacheManager: CacheManager;

	/**
	 * @memberof Game
	 * @description An array of the last 100 deltaTimes, deltaTime = time since last frame
	 * @type number[]
	 * @since 2.0.0
	 */
	public deltaTimeArray: number[];

	/**
	 * @memberof Game
	 * @description The time since the last frame
	 * @type number
	 * @since 1.0.0
	 */
	public deltaTime: number;

	/**
	 * @memberof Game
	 * @description The time since the last frame averaged and smoothed out using Game.deltaTimeArray, applied to velocity of gameobjects
	 * @type number
	 * @since 2.0.0
	 */
	public smoothDeltaTime: number;
	protected oldTime: number;
	protected now: number;

	/**
	 * @memberof Game
	 * @description The current fps (Frames per second) that the Game loop is running at
	 * @type number
	 * @since 2.0.0
	 */
	public fps: number;

	/**
	 * @memberof Game
	 * @description The state of being in fullscreen, determines if the game is in fullscreen or not, changing this value does nothing
	 * use game.fullscreen and game.unfullscreen to effect this value
	 * @type boolean
	 * @since 1.0.0
	 */
	public isInFullscreen: boolean;
	protected oldWidth: number;
	protected oldHeight: number;

	// methods

	/**
	 * @memberof Game
	 * @description The scene manager, object that holds methods to add and remove scenes from the Game.stack
	 * @type{ add: (scenes: Scene[]) => void; remove: (scene: Scene) => void };
	 * @since 1.0.0-beta
	 */
	public scenes: {
		add: (scenes: Scene[]) => void;
		remove: (scene: Scene) => void;
	};

	/**
	 * @memberof Game
	 * @description The state of the game, if it is currently rendering
	 * @type boolean
	 * @since 2.0.0
	 */
	public isRendering: boolean;

	/**
	 * @memberof Game
	 * @description The state of the game, if it is currently loading
	 * @type boolean
	 * @since 2.0.0
	 */
	public isLoaded: boolean;

	/**
	 * @memberof Game
	 * @description The source to the splash screen image that is shown during loading
	 * @type string
	 * @since 2.0.0
	 */
	public splashScreen: string;

	/**
	 * @memberof Game
	 * @description An EventEmitter, used by many classes other than the Game class (also used by Game class)
	 * @type EventEmitter
	 * @since 2.0.0
	 */
	public eventEmitter: EventEmitter;

	/**
	 * @memberof Game
	 * @description A PluginManager, stores and manages plugins
	 * @type PluginManager
	 * @since 2.0.0
	 */
	public pluginManager: PluginManager;

	/**
	 * @memberof Game
	 * @description The browser being used
	 * @type string
	 * @since 2.0.0
	 */
	public browser: string;

	/**
	 * @constructor Game
	 * @description Creates a Game instance
	 * @param {Duck.Types.Game.Config} config Game Configuration
	 * @since 1.0.0-beta
	 */
	constructor(config: Duck.Types.Game.Config) {
		console.log(startup);

		this.config = config;

		if (this.config.canvas === null) {
			this.config.canvas = Duck.AutoCanvas();
		}

		if (!this.config.canvas) {
			new Debug.Error(
				'You must pass in an HTMLCanvasElement or pass in the return value of Duck.AutoCanvas()!'
			);
		}

		if (this.config.canvas instanceof HTMLCanvasElement) {
			this.canvas = this.config.canvas;
			this.ctx = this.canvas.getContext('2d') || Duck.AutoCanvas().ctx;
		} else {
			this.canvas = this.config.canvas.canvas;
			this.ctx = this.config.canvas.ctx;
		}

		this.renderer = new CanvasRenderer(this);

		this.deltaTimeArray = Array(100).fill(0.0016);
		this.deltaTime = 0;
		this.smoothDeltaTime = 0;
		this.oldTime = 0;
		this.now = 0;
		this.fps = 0;

		this.eventEmitter = new EventEmitter();
		this.pluginManager = new PluginManager();

		// set scale
		if (this.config.scale) {
			this.setScale(this.config.scale);
		}

		// set background
		if (this.config.background) {
			this.setBackground(this.config.background);
		}

		// mobile scaling / devicePixelRatio scaling
		if (this.config.dprScale) {
			dprScale(
				this.canvas,
				this.ctx,
				this.config.scale?.width || this.canvas.width,
				this.config.scale?.height || this.canvas.height
			);
			if (this.config.debug) {
				new Debug.Log(
					`Scaled with devicePixelRatio of ${window.devicePixelRatio}`
				);
			}
		}

		// fullscreen scale
		this.isInFullscreen = false;
		this.oldWidth = this.canvas.width;
		this.oldHeight = this.canvas.height;

		// resize listener & smartScale
		window.onresize = () => {
			if (this.isInFullscreen && this.canvas) {
				this.scaleToWindow();
			}
			if (
				this.canvas &&
				this.config.smartScale &&
				window.devicePixelRatio === 1
			) {
				if (window.innerWidth <= this.canvas.width) {
					this.canvas.width = window.innerWidth;
				}
				if (window.innerHeight <= this.canvas.height) {
					this.canvas.height = window.innerHeight;
				}

				if (window.innerWidth > this.canvas.width) {
					this.canvas.width = this.oldWidth;
				}

				if (window.innerHeight > this.canvas.height) {
					this.canvas.height = this.oldHeight;
				}
			}
		};

		this.isRendering = false;
		this.isLoaded = false;

		// blur and focus listener
		window.onfocus = () => {
			if (
				this.config.pauseRenderingOnBlur &&
				!this.config.debugRendering
			) {
				this.isRendering = true;
				this.eventEmitter.emit(EVENTS.GAME.FOCUS);
				if (this.config.onResumeRendering) {
					this.config.onResumeRendering('windowFocus');
				}
			}
		};
		window.onblur = () => {
			if (
				this.config.pauseRenderingOnBlur &&
				!this.config.debugRendering
			) {
				this.isRendering = false;
				this.eventEmitter.emit(EVENTS.GAME.BLUR);
				if (this.config.onPauseRendering) {
					this.config.onPauseRendering('windowBlur');
				}
			}
		};

		if (this.config.focus) {
			window.focus();
			if (this.config.onResumeRendering) {
				this.config.onResumeRendering('gameConfigFocus');
			}
		}

		if (this.config.blur) {
			window.blur();
			if (this.config.onPauseRendering) {
				this.config.onPauseRendering('gameConfigBlur');
			}
		}

		this.splashScreen =
			this.config.splashScreen?.img ||
			'https://i.ibb.co/bdN4CCN/Logo-Splash.png';

		if (this.config.splashScreen?.img === 'default') {
			this.splashScreen = 'https://i.ibb.co/bdN4CCN/Logo-Splash.png';
		}

		// stack
		this.stack = {
			scenes: [],
			defaultScene: this.config.defaultScene,
		};

		this.cacheManager = new CacheManager();

		// browser
		this.browser = detectBrowser() as string;

		// animation frame
		this.animationFrame;

		// methods
		this.scenes = {
			/**
			 * @memberof Game#scenes
			 * @description Add a scenes to the Game stack
			 * @param {Scene[]} scenes Scenes to add to the Game stack
			 * @since 1.0.0-beta
			 */
			add: (scenes: Scene[]) => {
				scenes.forEach((scene) => {
					this.stack.scenes.push(scene);
					this.eventEmitter.emit(EVENTS.GAME.SCENE_ADD, scene);
				});
			},

			/**
			 * @memberof Game#scenes
			 * @description Removes a scene from the Game stack
			 * @param {Scene} scene Scene to remove from the Game stack
			 * @since 1.0.0-beta
			 */
			remove: (scene: Scene) => {
				const f = this.stack.scenes.find(
					(_scene) => _scene.key === scene.key
				);
				if (f) {
					this.stack.scenes.splice(
						this.stack.scenes.indexOf(scene),
						1
					);
					this.eventEmitter.emit(EVENTS.GAME.SCENE_REMOVE, scene);
				}
			},
		};
	}

	/**
	 * @memberof Game
	 * @description Starts the game loop
	 * @emits EVENTS.GAME.LOAD_BEGIN
	 * @emits EVENTS.GAME.DRAW_SPLASH
	 * @emits EVENTS.GAME.LOAD_SCENE
	 * @emits EVENTS.GAME.LOAD_FINISH
	 * @since 1.0.0-beta
	 */
	public async start() {
		this.eventEmitter.emit(EVENTS.GAME.LOAD_BEGIN);

		// show loading splash screen
		this.eventEmitter.emit(EVENTS.GAME.DRAW_SPLASH);
		await this.drawSplashScreen();

		// load scenes
		for await (const scene of this.stack.scenes) {
			// preload assets
			await scene.preload();

			// create assets
			scene.create();

			this.eventEmitter.emit(EVENTS.GAME.LOAD_SCENE);
		}

		// set states
		this.isRendering = true;
		this.isLoaded = true;

		await this.hideSplashScreen();
		this.eventEmitter.emit(EVENTS.GAME.LOAD_FINISH);

		if (this.config.debug) {
			new Debug.Log('Game loaded.');
		}

		if (this.config.onResumeRendering && !this.config.debugRendering) {
			this.config.onResumeRendering('gameStart');
		}

		this.loop();
		if (this.config.debug) {
			new Debug.Log('Started animation frame.');
		}
	}

	/**
	 * @memberof Game
	 * @description Stops the game loop
	 * @emits EVENTS.GAME.STOP
	 * @since 1.0.0
	 */
	public stop() {
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);

			// set states
			this.isRendering = false;
			this.isLoaded = false;

			if (this.config.onPauseRendering && !this.config.debugRendering) {
				this.config.onPauseRendering('gameStop');
			}

			if (this.config.debug) {
				new Debug.Log('Stopped animation frame.');
			}

			this.eventEmitter.emit(EVENTS.GAME.STOP);
		} else {
			if (this.config.debug) {
				new Debug.Error(
					'Cannot stop animation frame. You must start the game loop first.'
				);
			}
		}
	}

	/**
	 * @memberof Game
	 * @description Core loop
	 * @since 1.0.0-beta
	 */
	protected loop() {
		this.clearFrame();

		this.now = performance.now();
		this.deltaTime = (this.now - this.oldTime) / 1000;
		this.fps = 1 / this.deltaTime;

		if (this.deltaTimeArray.length >= 100) {
			this.deltaTimeArray.shift();
		}
		this.deltaTimeArray.push(this.deltaTime);
		this.smoothDeltaTime = Number(
			smoothOut(this.deltaTimeArray, 1).toPrecision(1)
		);

		if (this.isRendering) {
			this.stack.scenes.forEach((scene) => {
				if (scene.visible) {
					if (scene.currentCamera) {
						scene.currentCamera.begin();
					}

					scene.__tick();
					scene.update(this.deltaTime);

					// displayList
					const depthSorted = scene.displayList.depthSort();
					const visibleObjects = depthSorted.filter(
						(r) => r.visible === true
					);
					visibleObjects.forEach((r) => {
						r._draw();
					});

					if (scene.currentCamera) {
						scene.currentCamera.end();
					}
				}
			});
		}

		this.oldTime = this.now;

		this.animationFrame = requestAnimationFrame(() => {
			this.loop();
		});
	}

	/**
	 * @memberof Game
	 * @description Draws the splash screen to the canvas by setting the background image
	 * @since 2.0.0
	 */
	protected async drawSplashScreen() {
		this.canvas.style.backgroundImage = `url('${this.splashScreen}')`;
		await this.sleep(this.config.splashScreen?.extraDuration || 0);
	}

	/**
	 * @memberof Game
	 * @description Hides the splash screen to the canvas
	 * @since 2.0.0
	 */
	protected async hideSplashScreen() {
		this.canvas.style.backgroundImage = 'none';
	}

	protected sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * @memberof Game
	 * @description Clears the current frame on the canvas
	 * @emits EVENTS.GAME.CLEAR_FRAME
	 * @since 1.0.0
	 */
	public clearFrame() {
		if (this.canvas && this.ctx) {
			this.renderer.clearFrame();
			this.eventEmitter.emit(EVENTS.GAME.CLEAR_FRAME);
		} else {
			new Debug.Error('Canvas is undefined');
		}
	}
	/**
	 * @memberof Game
	 * @description Sets the scale of the canvas
	 * @param {Duck.Types.Misc.Scale} scale Scale to set the canvas to
	 * @emits EVENTS.GAME.SET_SCALE
	 * @since 1.0.0-beta
	 */
	public setScale(scale: Duck.Types.Misc.Scale) {
		if (this.canvas) {
			if (scale.width) {
				this.canvas.width = scale.width;
			}

			if (scale.height) {
				this.canvas.height = scale.height;
			}

			this.eventEmitter.emit(EVENTS.GAME.SET_SCALE, scale);
		} else {
			new Debug.Error('Cannot setScale to a canvas of undefined.');
		}
	}

	/**
	 * @memberof Game
	 * @description Sets the style background color of the canvas
	 * @param {string} background Background color
	 * @emits EVENTS.GAME.SET_BACKGROUND
	 * @since 1.0.0-beta
	 */
	public setBackground(background: string) {
		if (this.canvas) {
			this.canvas.style.background = background;

			this.eventEmitter.emit(EVENTS.GAME.SET_BACKGROUND, background);
		} else {
			new Debug.Error(
				'Cannot set background of undefined. Canvas is undefined.'
			);
		}
	}

	/**
	 * @memberof Game
	 * @description Switches the current scene by the key
	 * @param {string} key Key of the scene to switch from
	 * @param {string} key2 Key of the scene to switch to
	 * @emits EVENTS.GAME.SWITCH_SCENE
	 * @since 1.0.0-beta
	 */
	public switchScene(key: string, key2: string) {
		const f = this.stack.scenes.find((_scene) => _scene.key === key);
		const f2 = this.stack.scenes.find((_scene) => _scene.key === key2);
		if (f) {
			if (f2) {
				f.visible = false;
				f2.visible = true;
				f2.onChange();

				this.eventEmitter.emit(EVENTS.GAME.SWITCH_SCENE);
			} else {
				new Debug.Error(
					`Cannot switch to scene with scene key "${key2}. Scene not found."`
				);
			}
		} else {
			new Debug.Error(
				`Cannot switch from scene from scene key "${key}. Scene not found."`
			);
		}
	}

	/**
	 * @memberof Game
	 * @description Sets a scene to visible. Keeps the current scene visible
	 * @param {string} key Key of the scene to show
	 * @emits EVENTS.GAME.SHOW_SCENE
	 * @since 1.0.0-beta
	 */
	public showScene(key: string) {
		const f = this.stack.scenes.find((_scene) => _scene.key === key);
		if (f) {
			f.visible = true;

			this.eventEmitter.emit(EVENTS.GAME.SHOW_SCENE);
		} else {
			new Debug.Error(
				`Cannot switch to scene with key "${key}. Scene not found."`
			);
		}
	}

	/**
	 * @memberof Game
	 * @description Fullscreens the canvas and scales canvas
	 * @emits EVENTS.GAME.FULLSCREEN
	 * @since 1.0.0
	 */
	public fullscreen() {
		if (this.canvas && document.fullscreenEnabled) {
			this.canvas
				.requestFullscreen()
				.then(() => {
					this.isInFullscreen = true;
					if (this.canvas) {
						this.scaleToWindow();
					}

					this.eventEmitter.emit(EVENTS.GAME.FULLSCREEN);
				})
				.catch(
					() =>
						new Debug.Error(
							'User must interact with the page before fullscreen API can be used.'
						)
				);

			// on un fullscreen
			this.canvas.onfullscreenchange = () => {
				if (!document.fullscreenElement) {
					this.resetScale();
					this.isInFullscreen = false;
					if (this.config.debug) {
						new Debug.Log('Unfullscreen, reset canvas scale.');
					}
				}
			};
		}

		if (!document.fullscreenEnabled) {
			new Debug.Warn(
				'Fullscreen is not supported/enabled on this browser.'
			);
		}
	}

	/**
	 * @memberof Game
	 * @description Unfullscreens the canvas and scales canvas
	 * @emits EVENTS.GAME.UNFULLSCREEN
	 * @since 1.0.0
	 */
	public unfullscreen() {
		if (document.fullscreenElement) {
			document
				.exitFullscreen()
				.then(() => {
					if (this.canvas) {
						this.resetScale();
					}

					this.eventEmitter.emit(EVENTS.GAME.UNFULLSCREEN);
				})
				.catch((e) => new Debug.Error(e));
		}
	}

	/**
	 * @memberof Game
	 * @description Locks the pointer on the canvas
	 * @emits EVENTS.GAME.LOCK_POINTER
	 * @since 1.0.0
	 */
	public lockPointer() {
		if (this.canvas) {
			this.canvas.requestPointerLock();
			this.eventEmitter.emit(EVENTS.GAME.LOCK_POINTER);
		}
	}

	/**
	 * @memberof Game
	 * @description Unlocks the pointer from the canvas
	 * @emits EVENTS.GAME.UNLOCK_POINTER
	 * @since 1.0.0
	 */
	public unlockPointer() {
		if (document.pointerLockElement) {
			document.exitPointerLock();
			this.eventEmitter.emit(EVENTS.GAME.UNLOCK_POINTER);
		}
	}

	/**
	 * @memberof Game
	 * @description Resets the canvas scale to before scaled
	 * @since 1.0.0
	 */
	public resetScale() {
		if (this.canvas) {
			if (window.devicePixelRatio === 1) {
				this.canvas.width = this.oldWidth;
				this.canvas.height = this.oldHeight;
				this.canvas.style.width = this.oldWidth + 'px';
				this.canvas.style.height = this.oldHeight + 'px';
			} else {
				this.canvas.width = this.oldWidth / 2;
				this.canvas.height = this.oldHeight / 2;
				this.canvas.style.width = this.oldWidth / 2 + 'px';
				this.canvas.style.height = this.oldHeight / 2 + 'px';
			}

			if (this.config.dprScale && window.devicePixelRatio !== 1) {
				dprScale(
					this.canvas,
					this.ctx,
					this.canvas.width,
					this.canvas.height
				);
			}
		}
	}

	/**
	 * @memberof Game
	 * @description Scales the canvas to fit the whole window
	 * @emits EVENTS.GAME.SET_SCALE
	 * @since 1.0.0
	 */
	public scaleToWindow() {
		if (this.canvas) {
			if (window.devicePixelRatio === 1) {
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
				return;
			}

			if (this.config.dprScale && window.devicePixelRatio !== 1) {
				dprScale(
					this.canvas,
					this.ctx,
					window.innerWidth,
					window.innerHeight
				);
				if (this.config.debug) {
					new Debug.Log(
						`Scaled with devicePixelRatio of ${window.devicePixelRatio} while fullscreen.`
					);
				}
			}

			this.eventEmitter.emit(EVENTS.GAME.SET_SCALE, {
				w: window.innerWidth,
				h: window.innerHeight,
			});
		}
	}
}
