import { Duck } from '../../index';
import Game from '../game';
import Map from './map';

export default class TileMap extends Map<Duck.Tilemap.Map, Duck.Tilemap.Atlas> {
	constructor(
		tileW: number,
		tileH: number,
		rows: number,
		cols: number,
		map: Duck.Tilemap.Map,
		atlas: Duck.Tilemap.Atlas,
		game: Game
	) {
		super(tileW, tileH, rows, cols, map, atlas, game);
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
