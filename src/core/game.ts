/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Duck } from '../index';
import DuckStorage from '../core/storage/storage';
import Scene from './scene';
import Debug from './debug/debug';
import startup from '../helper/startup';

export default class Game {
	public readonly config: Duck.Game.Config;
	public canvas: HTMLCanvasElement | null;
	public ctx: CanvasRenderingContext2D | null | undefined;
	public stack: Duck.Game.Stack;

	public animationFrame: number | undefined;

	public gameStorage: DuckStorage | undefined;

	public deltaTime: number;
	private oldTime: number;
	private now: number;

	public isInFullscreen: boolean;
	private oldWidth: number;
	private oldHeight: number;

	// methods
	public scenes: {
		add: (scenes: Scene[]) => void;
		remove: (scene: Scene) => void;
	};

	constructor(config: Duck.Game.Config) {
		console.log(startup);

		this.config = config;
		this.canvas = this.config.canvas;
		this.ctx = this.canvas?.getContext('2d');

		this.deltaTime = 0;
		this.oldTime = 0;
		this.now = 0;

		// auto
		if (!this.canvas || !this.ctx) {
			// check if canvas exists on document
			if (document.querySelector('canvas')) {
				this.canvas = document.querySelector('canvas')!;
				this.ctx = this.canvas.getContext('2d')!;
			} else {
				this.canvas = document.createElement('canvas')!;
				document.body.appendChild(this.canvas);
				this.ctx = this.canvas.getContext('2d')!;
			}
		}

		// set scale
		if (this.config.scale) {
			this.setScale(this.config.scale);
		}

		// set background
		if (this.config.background) {
			this.setBackground(this.config.background);
		}

		// mobile scaling / devicePixelRatio scaling
		const dpr = window.devicePixelRatio || 1;
		this.canvas.width *= dpr;
		this.canvas.height *= dpr;
		if (this.ctx) {
			this.ctx.scale(dpr, dpr);
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
			if (this.canvas && this.config.smartScale && dpr === 1) {
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
			add: (scenes: Scene[]) => {
				scenes.forEach((scene) => {
					this.stack.scenes.push(scene);
				});
			},

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

	public start() {
		this.loop(this);
		if (this.config.debug) {
			new Debug.Log('Started animation frame.');
		}
	}

	public stop() {
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
			if (this.config.debug) {
				new Debug.Log('Stopped animation frame.');
			}
		}
	}

	private loop(self: Game) {
		self.clearFrame();

		this.now = performance.now();
		this.deltaTime = this.now - this.oldTime;

		self.stack.scenes.forEach((scene) => {
			if (scene.currentCamera) {
				scene.currentCamera.begin();
			}

			if (scene.visible) {
				scene.update();
				scene.render();
			}

			if (scene.currentCamera) {
				scene.currentCamera.end();
			}
		});

		this.oldTime = this.now;

		this.animationFrame = requestAnimationFrame(() => {
			self.loop(self);
		});
	}

	public clearFrame() {
		if (this.canvas && this.ctx) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		} else {
			new Debug.Error('Canvas is undefined');
		}
	}

	public setScale(scale: Duck.Misc.Scale) {
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

	public setBackground(background: string) {
		if (this.canvas) {
			this.canvas.style.background = background;
		} else {
			new Debug.Error(
				'Cannot set background of undefined. Canvas is undefined.'
			);
		}
	}

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

	public fullscreen() {
		if (this.canvas && document.fullscreenEnabled) {
			this.canvas
				.requestFullscreen()
				.then(() => {
					this.isInFullscreen = false;
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
				}
			};
		}

		if (!document.fullscreenEnabled) {
			new Debug.Warn(
				'Fullscreen is not supported/enabled on this browser.'
			);
		}
	}

	public unfullscreen() {
		if (document.fullscreenElement) {
			setTimeout(() => {
				document
					.exitFullscreen()
					.then(() => {
						if (this.canvas) {
							this.canvas.width = this.oldWidth;
							this.canvas.height = this.oldHeight;
						}
					})
					.catch((e) => new Debug.Error(e));
			}, 1000);
		}
	}

	public resetScale() {
		if (this.canvas) {
			this.canvas.width = this.oldWidth;
			this.canvas.height = this.oldHeight;
		}
	}

	public scaleToWindow() {
		if (this.canvas) {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
	}
}
