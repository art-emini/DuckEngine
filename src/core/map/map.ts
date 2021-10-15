/* eslint-disable @typescript-eslint/no-empty-function */

/* This class is extended by all map classes for code reusability */

import Game from '../game';
import randomInt from '../math/randomInt';

/**
 * @class Map
 * @classdesc Creates a DuckEngine Map
 * @description The Map Class. Base Map class, extends by TileMap
 * @since 1.2.0
 */
export default class Map<
	map extends number[][],
	atlas extends {
		[key: number]: HTMLImageElement | string;
	}
> {
	public readonly id: number;
	public tileW: number;
	public tileH: number;
	public rows: number;
	public cols: number;
	public map: map;
	public atlas: atlas;
	public game: Game;

	public visible: boolean;
	public zIndex: number;

	/**
	 * @constructor Map
	 * @description Creates a Map instance.
	 * @param {number} tileW How wide a tile is
	 * @param {number} tileH How tall a tile is
	 * @param {number} rows How many rows are there
	 * @param {number} cols How many columns are there
	 * @param {map} map An Array with nested arrays that represents the map
	 * @param {atlas} atlas An object with numbers as their keys that are used to find the asset to use for the map
	 * @param {Game} game Game instance
	 * @since 1.2.0
	 */
	constructor(
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		map: map,
		atlas: atlas,
		game: Game
	) {
		this.id = randomInt(0, 100000);
		this.tileW = tileW;
		this.tileH = tileH;
		this.rows = rows;
		this.cols = cols;
		this.map = map;
		this.atlas = atlas;
		this.game = game;

		this.visible = true;
		this.zIndex = 2;
	}

	/**
	 * @description Draws the map.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {}

	/**
	 * @memberof Map
	 * @description Gets the first element in the map that has the same passed number
	 * @param {number} number The number
	 * @returns HTMLImageElement | undefined
	 * @since 1.2.0
	 */
	public selectByNumber(number: number) {
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				const num = this.map[row][col];
				if (num === number) {
					const object = this.atlas[number];
					return object;
				} else {
					return undefined;
				}
			}
		}
	}

	/**
	 * @memberof Map
	 * @description Gets the row of the first element it finds in the map
	 * @param number The number
	 * @returns number | undefined
	 */
	public getRowOf(number: number) {
		for (let i = 0; i < this.map.length; i++) {
			const row = this.map[i];
			return row.find((num) => num === number);
		}
	}

	/**
	 * @memberof Map
	 * @description Gets the col of the first element it finds in the map
	 * @param number The number
	 * @returns number | undefined
	 */
	public getColOf(number: number) {
		for (let i = 0; i < this.map.length; i++) {
			const row = this.map[i];
			for (let x = 0; x < row.length; x++) {
				const col = row[x];

				if (col === number) {
					return col;
				} else {
					return undefined;
				}
			}
		}
	}
}
