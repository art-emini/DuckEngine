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

// other stuff
import Sound from './sound/sound';
import Input from './input/input';
import Camera from './camera/camera';
import StaticLight from './lights/staticLight';

export default class Scene extends Basic {
	public readonly key: string;
	private game: Game;
	public visible: boolean | false;
	public default: boolean;

	public mainObject: Duck.GameObject | undefined;
	public currentCamera: Camera | undefined;
	public mainCamera: Camera | undefined;

	public cameras: Camera[];

	// methods

	public add: {
		gameobject: {
			sprite: (x: number, y: number, imgpath: string) => Sprite;
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
	};

	constructor(key: string, game: Game, visible?: boolean) {
		super();

		this.key = key;
		this.game = game;
		this.visible = visible || false;
		this.default = false;

		if (this.game.stack.defaultScene == this.key) {
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
					imgpath: string,
					w?: number,
					h?: number
				) => {
					if (w) {
						return new Sprite(x, y, imgpath, this.game, w);
					} else if (h) {
						return new Sprite(x, y, imgpath, this.game, w, h);
					} else {
						return new Sprite(x, y, imgpath, this.game);
					}
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
				return new Input();
			},
			camera: () => {
				let c = new Camera(this.game, this);
				this.cameras.push(c);
				return c;
			},
			mainCamera: () => {
				let c = new Camera(this.game, this);
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
		};
	}

	public switchCamera(camera: Camera) {
		let foundCamera = this.cameras.find((_camera) => _camera === camera);
		if (foundCamera) {
			this.currentCamera = foundCamera;
		}
	}

	public switchToMainCamera() {
		this.currentCamera = this.mainCamera;
	}

	public setMainCamera(camera: Camera) {
		this.mainCamera = camera;
	}
}
