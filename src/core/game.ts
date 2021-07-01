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
		if (this.canvas) {
			this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
					`Cannot switch to scene with key "${key2}.  Scene not found."`
				);
			}
		} else {
			new Debug.Error(
				`Cannot switch from scene with key "${key}.  Scene not found."`
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
}
