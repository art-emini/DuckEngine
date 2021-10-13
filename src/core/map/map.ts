/* eslint-disable @typescript-eslint/no-empty-function */

/* This class is extended by all map classes for code reusability */

import Game from '../game';
import randomInt from '../math/randomInt';

export default class Map<
	map extends number[][],
	atlas extends {
		[key: number]: HTMLImageElement | string;
	}
> {
	public readonly id: number;
	protected tileW: number;
	protected tileH: number;
	protected rows: number;
	protected cols: number;
	protected map: map;
	protected atlas: atlas;
	public game: Game;

	public visible: boolean;
	public zIndex: number;

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

	public _draw() {}

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

	public getRowOf(number: number) {
		for (let i = 0; i < this.map.length; i++) {
			const row = this.map[i];
			return row.find((num) => num === number);
		}
	}

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
