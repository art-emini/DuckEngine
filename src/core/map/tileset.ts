/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Game from '../game';
import Texture from '../models/texture';
import Scene from '../scene';
import Tile from './tile';

export default class Tileset {
	public texture: Texture<'image'>;
	public map: number[][];
	public tileW: number;
	public tileH: number;
	public rows: number;
	public cols: number;
	public game: Game;
	public scene: Scene;

	public tiles: Tile[];

	constructor(
		textureKey: string,
		map: number[][],
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		game: Game,
		scene: Scene
	) {
		this.texture = scene.loader.imageStack.find(
			(v) => v.key === textureKey
		)!.value;
		this.map = map;
		this.tileW = tileW;
		this.tileH = tileH;
		this.rows = rows;
		this.cols = cols;
		this.game = game;
		this.scene = scene;

		this.tiles = [];

		this.generateTiles();
	}

	protected generateTiles() {
		for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
			for (let colIndex = 0; colIndex < this.cols; colIndex++) {
				const tileX = colIndex * this.tileW;
				const tileY = rowIndex * this.tileH;

				this.tiles.push(
					this.createTile(tileX, tileY, this.tileW, this.tileH)
				);
			}
		}
	}

	protected createTile(x: number, y: number, w: number, h: number) {
		return new Tile(x, y, w, h);
	}

	public getTile(num: number): Tile | undefined {
		return this.tiles[num];
	}
}
