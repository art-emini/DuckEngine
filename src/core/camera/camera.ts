// core code from : https://github.com/robashton/camera
// mostly edited

import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import Scene from '../scene';
import { Duck } from '../../index';
import rectToRectIntersect from '../physics/rectToRectIntersect';
import circleToRectIntersect from '../physics/circleToRectIntersect';
import Debug from '../debug/debug';
import randomInt from '../math/randomInt';
import lerp from '../math/lerp';

class Camera {
	private game: Game;
	private distance: number;
	private lookAt: number[];
	private ctx: CanvasRenderingContext2D | null | undefined;
	private fieldOfView: number;
	private viewport: {
		left: number;
		right: number;
		top: number;
		bottom: number;
		w: number;
		h: number;
		scale: number[];
	};
	private aspectRatio: number | undefined;
	public readonly isMain: boolean;

	private bounds:
		| { position: { x: number; y: number }; w: number; h: number }
		| undefined;

	public following: Duck.GameObjects.GameObject | undefined;
	private lerpX = 1;
	private lerpY = 1;

	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.distance = 1000.0;
		this.isMain = false;
		if (scene.mainCamera === this) {
			this.isMain = true;
		}
		this.lookAt = [0, 0];
		this.ctx = game.ctx;
		this.fieldOfView = Math.PI / 4.0;
		this.viewport = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			w: 0,
			h: 0,
			scale: [1.0, 1.0],
		};

		this.bounds;

		this.following;

		this.updateViewport();
	}

	public begin() {
		this.ctx?.save();
		this.applyScale();
		this.applyTranslation();

		// follow
		if (this.following) {
			if (this.following.shape === 'rect') {
				if (this.bounds) {
					if (
						rectToRectIntersect(this.following as Rect, this.bounds)
					) {
						this.lookAt[0] = lerp(
							this.lookAt[0],
							this.following.getCenterX(),
							this.lerpX
						);
						this.lookAt[1] = lerp(
							this.lookAt[1],
							this.following.getCenterY(),
							this.lerpY
						);
					}
				} else {
					this.lookAt[0] = lerp(
						this.lookAt[0],
						this.following.getCenterX(),
						this.lerpX
					);
					this.lookAt[1] = lerp(
						this.lookAt[1],
						this.following.getCenterY(),
						this.lerpY
					);
				}
			}

			if (this.following.shape === 'circle') {
				if (this.bounds) {
					if (
						circleToRectIntersect(
							this.following as Circle,
							this.bounds
						)
					) {
						this.lookAt[0] = lerp(
							this.lookAt[0],
							this.following.getCenterX(),
							this.lerpX
						);
						this.lookAt[1] = lerp(
							this.lookAt[1],
							this.following.getCenterY(),
							this.lerpY
						);
					}
				} else {
					this.lookAt[0] = lerp(
						this.lookAt[0],
						this.following.getCenterX(),
						this.lerpX
					);
					this.lookAt[1] = lerp(
						this.lookAt[1],
						this.following.getCenterY(),
						this.lerpY
					);
				}
			}

			this.updateViewport();
		}
	}

	public end() {
		this.ctx?.restore();
	}

	private applyScale() {
		this.ctx?.scale(this.viewport.scale[0], this.viewport.scale[1]);
	}

	private applyTranslation() {
		this.ctx?.translate(-this.viewport.left, -this.viewport.top);
	}

	private updateViewport() {
		if (this.ctx) {
			// dpr scaling
			let cWidth = this.ctx.canvas.width;
			let cHeight = this.ctx.canvas.height;

			if (this.game.config.dprScale && window.devicePixelRatio !== 1) {
				cWidth = Number(this.ctx.canvas.style.width.replace('px', ''));

				cHeight = Number(
					this.ctx.canvas.style.height.replace('px', '')
				);

				// set zoom for dpr scaling
				this.distance = 1000 / window.devicePixelRatio;
			}

			this.aspectRatio = cWidth / cHeight;
			this.viewport.w = this.distance * Math.tan(this.fieldOfView);
			this.viewport.h = this.viewport.w / this.aspectRatio;
			this.viewport.left = this.lookAt[0] - this.viewport.w / 2.0;
			this.viewport.top = this.lookAt[1] - this.viewport.h / 2.0;
			this.viewport.right = this.viewport.left + this.viewport.w;
			this.viewport.bottom = this.viewport.top + this.viewport.h;
			this.viewport.scale[0] = cWidth / this.viewport.w;
			this.viewport.scale[1] = cHeight / this.viewport.h;
		} else {
			new Debug.Error(
				'Cannot update camera. CanvasRenderingContext2D is undefined.'
			);
		}
	}

	public setZoom(z: number) {
		this.distance = z;
		this.updateViewport();
	}

	public setZoomSmooth(intervalMS: number, smoothValue: number, z: number) {
		let operation: 'add' | 'subtract' = 'add';

		if (this.distance < z) {
			operation = 'add';
		} else {
			operation = 'subtract';
		}

		const int = setInterval(() => {
			if (operation === 'add') {
				if (this.distance < z) {
					this.distance += smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera Zoom with setZoomSmooth'
						);
					}
				}
			} else {
				if (this.distance > z) {
					this.distance -= smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera Zoom with setZoomSmooth'
						);
					}
				}
			}
		}, intervalMS);
	}

	public moveTo(x: number, y: number) {
		this.lookAt[0] = x;
		this.lookAt[1] = y;
		this.updateViewport();
	}

	public startFollow(
		gameObject: Duck.GameObjects.GameObject,
		lerpX = 1,
		lerpY = 1
	) {
		this.following = gameObject;
		this.lerpX = lerpX;
		this.lerpY = lerpY;
	}

	public stopFollow() {
		this.following = undefined;
	}

	public screenToWorld(
		x: number,
		y: number,
		obj: Duck.GameObjects.GameObject
	) {
		obj.position.x = x / this.viewport.scale[0] + this.viewport.left;
		obj.position.y = y / this.viewport.scale[1] + this.viewport.top;
		return obj;
	}

	public worldToScreen(
		x: number,
		y: number,
		obj: Duck.GameObjects.GameObject
	) {
		obj.position.x = (x - this.viewport.left) * this.viewport.scale[0];
		obj.position.y = (y - this.viewport.top) * this.viewport.scale[1];
		return obj;
	}

	public setFOV(f: number) {
		this.fieldOfView = f;
	}

	public setFOVSmooth(intervalMS: number, smoothValue: number, f: number) {
		let operation: 'add' | 'subtract' = 'add';

		if (this.fieldOfView < f) {
			operation = 'add';
		} else {
			operation = 'subtract';
		}

		const int = setInterval(() => {
			if (operation === 'add') {
				if (this.fieldOfView < f) {
					this.fieldOfView += smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera FOV with setFOVSmooth'
						);
					}
				}
			} else {
				if (this.fieldOfView > f) {
					this.fieldOfView -= smoothValue;
				} else {
					clearInterval(int);
					if (this.game.config.debug) {
						new Debug.Log(
							'Reached target camera FOV with setFOVSmooth'
						);
					}
				}
			}
		}, intervalMS);
	}

	public resetFOV() {
		this.fieldOfView = Math.PI / 4.0;
	}

	public resetZoom() {
		this.distance = 1000.0;
	}

	public setBounds(bounds: {
		position: { x: number; y: number };
		w: number;
		h: number;
	}) {
		this.bounds = bounds;
	}

	public shake(intervalMS: number, timeMS: number, v: number) {
		const int = setInterval(() => {
			const r = randomInt(1, 4);

			if (r === 1) {
				this.lookAt[0] += v;
			}

			if (r === 2) {
				this.lookAt[0] -= v;
			}

			if (r === 3) {
				this.lookAt[1] += v;
			}

			if (r === 2) {
				this.lookAt[1] += v;
			}

			this.updateViewport();
		}, intervalMS);

		setTimeout(() => {
			clearInterval(int);
		}, timeMS);
	}

	public scrollToZoom() {
		window.onwheel = (e: WheelEvent) => {
			if (e.ctrlKey) {
				let zoomLevel = this.distance - e.deltaY * 20;
				if (zoomLevel <= 1) {
					zoomLevel = 1;
				}

				this.setZoom(zoomLevel);
			} else {
				const x = this.lookAt[0] + e.deltaX * 2;
				const y = this.lookAt[1] + e.deltaY * 2;

				this.moveTo(x, y);
			}
		};
	}

	get defaultZoom() {
		if (this.game.config.dprScale) {
			if (this.game.config.debug) {
				new Debug.Log(
					'Getter defaultZoom returned default zoom with dpr scaling. (info)'
				);
			}
			return 1000 / window.devicePixelRatio;
		} else {
			return 1000;
		}
	}

	get defaultFOV() {
		return Math.PI / 4;
	}
}

export default Camera;
