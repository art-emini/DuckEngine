import { Duck } from '../index';
import DuckStorage from '../core/storage/storage';
import Scene from './scene';
import Debug from './debug/debug';
import startup from '../helper/startup';
import dprScale from '../helper/dprScale';

/**
 * @class Game
 * @classdesc Creates a DuckEngine Game
 * @description The Game Class. Stores many important methods and properties.
 * @since 1.0.0-beta
 */
export default class Game {
	public readonly config: Duck.Types.Game.Config;

	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public stack: Duck.Types.Game.Stack;

	public animationFrame: number | undefined;

	public gameStorage: DuckStorage | undefined;

	public deltaTime: number;
	protected oldTime: number;
	protected now: number;
	public fps: number;

	public isInFullscreen: boolean;
	protected oldWidth: number;
	protected oldHeight: number;

	// methods
	public scenes: {
		add: (scenes: Scene[]) => void;
		remove: (scene: Scene) => void;
	};

	public isRendering: boolean;
	public isLoaded: boolean;

	public splashScreen: string;

	/**
	 * @constructor Game
	 * @description Creates a Game instance.
	 * @param {Duck.Types.Game.Config} config Configuration
	 * @since 1.0.0-beta
	 */
	constructor(config: Duck.Types.Game.Config) {
		console.log(startup);

		this.config = config;

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

		this.deltaTime = 0;
		this.oldTime = 0;
		this.now = 0;
		this.fps = 0;

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

		this.gameStorage;

		if (this.config.storage) {
			this.gameStorage = new DuckStorage(this.config.storage, this);
			if (this.config.storage.loadOnWindowLoad) {
				this.gameStorage.load(this.config.storage.loadOnWindowLoad);
			}
		}

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
				}
			},
		};
	}

	/**
	 * @memberof Game
	 * @description Starts the game loop
	 * @since 1.0.0-beta
	 */
	public async start() {
		// show loading splash screen
		await this.drawSplashScreen();

		// load scenes
		for await (const scene of this.stack.scenes) {
			// preload assets
			await scene.preload();

			// create assets
			scene.create();
		}

		// set states
		this.isRendering = true;
		this.isLoaded = true;

		if (this.config.debug) {
			new Debug.Log('Game loaded.');
		}

		if (this.config.onResumeRendering && !this.config.debugRendering) {
			this.config.onResumeRendering('gameStart');
		}

		this.loop(this);
		if (this.config.debug) {
			new Debug.Log('Started animation frame.');
		}
	}

	/**
	 * @memberof Game
	 * @description Stops the game loop
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
		}
	}

	/**
	 * @memberof Game
	 * @description Core loop
	 * @since 1.0.0-beta
	 */
	protected loop(self: Game) {
		self.clearFrame();

		this.now = performance.now();
		this.deltaTime = (this.now - this.oldTime) / 1000;
		this.fps = 1 / this.deltaTime;

		if (this.isRendering) {
			self.stack.scenes.forEach((scene) => {
				if (scene.visible) {
					if (scene.currentCamera) {
						scene.currentCamera.begin();
					}

					scene.update(this.deltaTime);
					scene.__tick();

					// displayList
					const depthSorted = scene.displayList.depthSort();
					depthSorted.forEach((renderableObject) => {
						if (renderableObject.visible) {
							renderableObject._draw();
						}
					});

					if (scene.currentCamera) {
						scene.currentCamera.end();
					}
				}
			});
		}

		this.oldTime = this.now;

		this.animationFrame = requestAnimationFrame(() => {
			self.loop(self);
		});
	}

	/**
	 * @memberof Game
	 * @description Draws the splash screen to the canvas if isLoaded is false
	 * @since 2.0.0
	 */
	protected async drawSplashScreen() {
		if (!this.isLoaded) {
			this.canvas.style.backgroundImage = `url('${this.splashScreen}')`;
			await this.sleep(this.config.splashScreen?.extraDuration || 500);
			if (this.config.background) {
				this.canvas.style.backgroundImage = 'none';
				this.setBackground(this.config.background);
			} else {
				this.canvas.style.backgroundImage = 'none';
			}
		}
	}

	protected sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * @memberof Game
	 * @description Clears the current frame on the canvas
	 * @since 1.0.0
	 */
	public clearFrame() {
		if (this.canvas && this.ctx) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		} else {
			new Debug.Error('Canvas is undefined');
		}
	}
	/**
	 * @memberof Game
	 * @description Sets the scale of the canvas
	 * @param {Duck.Types.Misc.Scale} scale Scale to set the canvas to
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
		} else {
			new Debug.Error('Cannot setScale to a canvas of undefined.');
		}
	}

	/**
	 * @memberof Game
	 * @description Sets the style background color of the canvas
	 * @param {string} background Background color
	 */
	public setBackground(background: string) {
		if (this.canvas) {
			this.canvas.style.background = background;
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
	 * @since 1.0.0-beta
	 */
	public showScene(key: string) {
		const f = this.stack.scenes.find((_scene) => _scene.key === key);
		if (f) {
			f.visible = true;
		} else {
			new Debug.Error(
				`Cannot switch to scene with key "${key}. Scene not found."`
			);
		}
	}

	/**
	 * @memberof Game
	 * @description Fullscreens the canvas and scales canvas
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
				})
				.catch((e) => new Debug.Error(e));
		}
	}

	/**
	 * @memberof Game
	 * @description Locks the pointer on the canvas
	 * @since 1.0.0
	 */
	public lockPointer() {
		if (this.canvas) {
			this.canvas.requestPointerLock();
		}
	}

	/**
	 * @memberof Game
	 * @description Unlocks the pointer from the canvas
	 * @since 1.0.0
	 */
	public unlockPointer() {
		if (document.pointerLockElement) {
			document.exitPointerLock();
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
				new Debug.Log(
					`Scaled with devicePixelRatio of ${window.devicePixelRatio} while fullscreen.`
				);
			}
		}
	}
}
