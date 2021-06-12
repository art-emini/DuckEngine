import { Duck } from '../index';
import DuckStorage from '../core/storage/storage';
import Scene from './scene';
import Debug from './debug/debug';

export default class Game {
	public readonly config: Duck.Game.Config;
	public canvas: HTMLCanvasElement | null;
	public ctx: CanvasRenderingContext2D | null | undefined;
	public stack: Duck.Game.Stack;
	public misc: { lastTime: number; requiredElapsed: number; elapsed: number };
	public gameStorage: DuckStorage | undefined;

	// methods
	public scenes: {
		add: (scene: Scene) => void;
		remove: (scene: Scene) => void;
	};

	constructor(config: Duck.Game.Config) {
		this.config = config;
		this.canvas = this.config.canvas;
		this.ctx = this.canvas?.getContext('2d');

		// auto
		if (!this.canvas || !this.ctx) {
			this.canvas = document.createElement('canvas');
			document.body.appendChild(this.canvas);
			this.ctx = this.canvas.getContext('2d');
		}

		// set scale
		if (this.config.scale) {
			this.setScale(this.config.scale);
		}

		// set background
		if (this.config.background) {
			this.setBackground(this.config.background);
		}

		// stack
		this.stack = {
			cameras: [],
			scenes: [],
			defaultScene: this.config.defaultScene,
		};

		// misc
		// for delta time
		this.misc = {
			lastTime: Date.now(),
			requiredElapsed: 1000 / 100,
			elapsed: 0,
		};

		this.gameStorage;

		if (this.config.storage) {
			this.gameStorage = new DuckStorage(this.config.storage, this);
		}

		// methods
		this.scenes = {
			add: (scene: Scene, ...scenes: Scene[]) => {
				scenes.forEach((scene) => {
					this.stack.scenes.push(scene);
				});
				this.stack.scenes.push(scene);
			},

			remove: (scene: Scene) => {
				let f = this.stack.scenes.find(
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
	}

	private loop(self: Game) {
		self.clearFrame();

		self.stack.scenes.forEach((scene) => {
			if (scene.currentCamera) {
				scene.currentCamera.begin();
			}

			if (scene.visible) {
				scene.render();
				scene.update();
			}

			if (scene.currentCamera) {
				scene.currentCamera.end();
			}
		});

		requestAnimationFrame(() => {
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
		let f = this.stack.scenes.find((_scene) => _scene.key === key);
		let f2 = this.stack.scenes.find((_scene) => _scene.key === key2);
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
		let f = this.stack.scenes.find((_scene) => _scene.key === key);
		if (f) {
			f.visible = true;
		} else {
			new Debug.Error(
				`Cannot switch to scene with key "${key}. Scene not found."`
			);
		}
	}
}
