import { Duck } from '../../index';
import Game from '../game';

export default class TileMap {
	private tileW: number;
	private tileH: number;
	private rows: number;
	private cols: number;
	private map: Duck.Tilemap.Map;
	private atlas: Duck.Tilemap.Atlas;
	private game: Game;

	constructor(
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		map: Duck.Tilemap.Map,
		atlas: Duck.Tilemap.Atlas,
		game: Game
	) {
		this.tileW = tileW;
		this.tileH = tileH;
		this.rows = rows;
		this.cols = cols;
		this.map = map;
		this.atlas = atlas;
		this.game = game;
	}

	public draw() {
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
