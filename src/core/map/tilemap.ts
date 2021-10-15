import { Duck } from '../../index';
import Game from '../game';
import Map from './map';

/**
 * @class TileMap
 * @classdesc Creates a DuckEngine TileMap
 * @description The TileMap Class. Creates a tilemap of images
 * @extends Map
 * @since 1.0.0
 */
export default class TileMap extends Map<
	Duck.Types.Tilemap.Map,
	Duck.Types.Tilemap.Atlas
> {
	/**
	 * @constructor TileMap
	 * @description Creates a tilemap of images with a 2D array and atlas
	 * @param {number} tileW How wide a tile is
	 * @param {number} tileH How tall a tile is
	 * @param {number} rows How many rows are there
	 * @param {number} cols How many columns are there
	 * @param {map} map An Array with nested arrays that represents the map
	 * @param {atlas} atlas An object with numbers as their keys that are used to find the asset to use for the map
	 * @param {Game} game Game instance
	 * @since 1.0.0
	 */
	constructor(
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		map: Duck.Types.Tilemap.Map,
		atlas: Duck.Types.Tilemap.Atlas,
		game: Game
	) {
		super(tileW, tileH, rows, cols, map, atlas, game);
	}

	/**
	 * @description Draws the tilemap.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				const number = this.map[row][col];
				const image = this.atlas[number];
				const x = col * this.tileW;
				const y = row * this.tileH;

				if (this.game.ctx && image instanceof HTMLImageElement) {
					this.game.ctx.drawImage(
						image,
						x,
						y,
						this.tileW,
						this.tileW
					);
				}
			}
		}
	}
}
