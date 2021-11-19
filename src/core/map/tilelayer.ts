import Game from '../game';
import Scene from '../scene';
import Tileset from './tileset';

export default class TileLayer {
	public tileset: Tileset;
	public map: number[][];
	public game: Game;
	public scene: Scene;
	public zIndex: number;
	public visible: boolean;

	constructor(
		tileset: Tileset,
		map: number[][],
		game: Game,
		scene: Scene,
		zIndex = 2,
		visible = true
	) {
		this.tileset = tileset;
		this.map = map;
		this.game = game;
		this.scene = scene;
		this.zIndex = zIndex;
		this.visible = visible;
	}
}
