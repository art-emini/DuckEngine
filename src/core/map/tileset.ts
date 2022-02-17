/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Game from '../game';
import Texture from '../texture/texture';
import Scene from '../scene';
import Tile from './tile';

/**
 * @class Tileset
 * @classdesc Creates a DuckEngine Tileset
 * @description The Tileset Class. Stores information about a tileset image and splits it into tiles
 * @since 2.0.0
 */
export default class Tileset {
	/**
	 * @memberof Tileset
	 * @description The Tileset image texture
	 * @type Texture<'image'>
	 * @since 2.0.0
	 */
	public texture: Texture<'image'>;

	/**
	 * @memberof Tileset
	 * @description Width of each Tile
	 * @type number
	 * @since 2.0.0
	 */
	public tileW: number;

	/**
	 * @memberof Tileset
	 * @description Height of each Tile
	 * @type number
	 * @since 2.0.0
	 */
	public tileH: number;

	/**
	 * @memberof Tileset
	 * @description Number of rows in the tileset image
	 * @type number
	 * @since 2.0.0
	 */
	public rows: number;

	/**
	 * @memberof Tileset
	 * @description Number of columns in the tileset image
	 * @type number
	 * @since 2.0.0
	 */
	public cols: number;

	/**
	 * @memberof Tileset
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof Tileset
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Tileset
	 * @description Array of tiles that are generated from the Tileset
	 * @type Tile[]
	 * @since 2.0.0
	 */
	public tiles: Tile[];

	/**
	 * @constructor Tileset
	 * @description Creates a Tileset instance
	 * @param {string} textureKey Key to the tileset image texture
	 * @param {number} tileW Width of each Tile
	 * @param {number} tileH Height of each Tile
	 * @param {number} rows Number of rows in the tileset image texture
	 * @param {number} cols Number of columns in the tileset image texture
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 2.0.0
	 */
	constructor(
		textureKey: string,
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		game: Game,
		scene: Scene
	) {
		this.texture = scene.loader.textureStack.find(
			(v) => v.key === textureKey
		)!.value;
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

	/**
	 * @memberof Tileset
	 * @description Gets the Tile based on index
	 * @param {number} num Index
	 * @since 2.0.0
	 */
	public getTile(num: number): Tile | undefined {
		return this.tiles[num];
	}
}
