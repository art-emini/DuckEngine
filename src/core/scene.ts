import Game from './game';
import Basic from '../base/render';
import { Duck } from '../index';

// import gameobjects
import Sprite from './gameobjects/sprite';
import Rect from './gameobjects/rect';
import Circle from './gameobjects/circle';
import Sound from './sound/sound';
import Input from './input/input';
import Camera from '../camera/camera';
import Debug from './debug/debug';
import { config } from 'process';

export default class Scene extends Basic {
	public readonly key: string;
	private game: Game;
	public visible: boolean | false;
	public default: boolean;

	public mainObject: Duck.GameObject | undefined;
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
		};
		sound: (path: string, options?: Duck.Sound.Config) => Sound;
		input: (
			gameobject: Duck.GameObject,
			mapping: Duck.Input.Mapping
		) => Input;
		camera: () => Camera;
		mainCamera: () => Camera;
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
			},
			sound: (path: string, options?: Duck.Sound.Config) => {
				return new Sound(path, options);
			},
			input: (
				gameobject: Duck.GameObject,
				mapping: Duck.Input.Mapping
			) => {
				return new Input(gameobject, mapping);
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
				return c;
			},
		};
	}

	public switchCamera(camera: Camera) {
		let foundCamera = this.cameras.find((_camera) => _camera === camera);
		if (foundCamera) {
			this.mainCamera = foundCamera;
		}
	}

	public setMainCamera(camera: Camera) {
		this.mainCamera = camera;
	}
}
