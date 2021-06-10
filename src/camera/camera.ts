// core code from : https://github.com/robashton/camera
// edited

import Game from '../core/game';
import Circle from '../core/gameobjects/circle';
import Rect from '../core/gameobjects/rect';
import Scene from '../core/scene';
import { Duck } from '../index';

class Camera {
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
	private aspectRatio: number | any;
	public readonly isMain: boolean;

	constructor(game: Game, scene: Scene) {
		this.distance = 1000.0;
		this.isMain = false;
		if (scene.mainCamera == this) {
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

		this.updateViewport();
	}

	public begin() {
		this.ctx?.save();
		this.applyScale();
		this.applyTranslation();
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
		this.aspectRatio = this.ctx!.canvas.width / this.ctx!.canvas.height;
		this.viewport.w = this.distance * Math.tan(this.fieldOfView);
		this.viewport.h = this.viewport.w / this.aspectRatio;
		this.viewport.left = this.lookAt[0] - this.viewport.w / 2.0;
		this.viewport.top = this.lookAt[1] - this.viewport.h / 2.0;
		this.viewport.right = this.viewport.left + this.viewport.w;
		this.viewport.bottom = this.viewport.top + this.viewport.h;
		this.viewport.scale[0] = this.ctx!.canvas.width / this.viewport.w;
		this.viewport.scale[1] = this.ctx!.canvas.height / this.viewport.h;
	}

	public setZoom(z: number) {
		this.distance = z;
		this.updateViewport();
	}

	public moveTo(x: number, y: number) {
		this.lookAt[0] = x;
		this.lookAt[1] = y;
		this.updateViewport();
	}

	public follow(gameObject: Duck.GameObject) {
		if (gameObject.shape == 'rect') {
			this.lookAt[0] = gameObject.x - (gameObject as Rect).w / 2;
			this.lookAt[1] = gameObject.y - (gameObject as Rect).h / 2;
		}

		if (gameObject.shape == 'circle') {
			this.lookAt[0] = gameObject.x - (gameObject as Circle).r / 2;
			this.lookAt[1] = gameObject.y - (gameObject as Circle).r / 2;
		}

		this.updateViewport();
	}

	public screenToWorld(x: number, y: number, obj: Duck.GameObject) {
		obj.x = x / this.viewport.scale[0] + this.viewport.left;
		obj.y = y / this.viewport.scale[1] + this.viewport.top;
		return obj;
	}

	public worldToScreen(x: number, y: number, obj: Duck.GameObject) {
		obj.x = (x - this.viewport.left) * this.viewport.scale[0];
		obj.y = (y - this.viewport.top) * this.viewport.scale[1];
		return obj;
	}

	public setFOV(f: number) {
		this.fieldOfView = f;
	}

	public resetFOV() {
		this.fieldOfView = Math.PI / 4.0;
	}

	public resetZoom() {
		this.distance = 1000.0;
	}

	public scrollToZoom() {
		// Zoom and scroll around world
		window.onwheel = (e: WheelEvent) => {
			if (e.ctrlKey) {
				// Your zoom/scale factor
				let zoomLevel = this.distance - e.deltaY * 20;
				if (zoomLevel <= 1) {
					zoomLevel = 1;
				}

				this.setZoom(zoomLevel);
			} else {
				// Your track-pad X and Y positions
				const x = this.lookAt[0] + e.deltaX * 2;
				const y = this.lookAt[1] + e.deltaY * 2;

				this.moveTo(x, y);
			}
		};

		// Center camera on "R"
		window.addEventListener('keydown', (e) => {
			if (e.key === 'r') {
				this.setZoom(1000);
				this.moveTo(0, 0);
			}
		});
	}
}

export default Camera;