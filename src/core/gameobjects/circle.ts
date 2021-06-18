import { Duck } from '../../index';
import Game from '../game';
import Collider from '../physics/collider';
import Debug from '../debug/debug';
import GameObject from './gameObject';

export default class Circle extends GameObject {
	constructor(
		x: number,
		y: number,
		r: number,
		fillColor: string,
		game: Game
	) {
		super('circle', x, y, 0, 0, r, fillColor, game);
		this.init(this);
	}

	public draw() {
		if (this.game.ctx) {
			this.game.ctx.beginPath();
			this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			this.game.ctx.fillStyle = this.fillColor;
			this.game.ctx.fill();
		} else {
			new Debug.Error(
				'CanvasRenderingContext2D is undefined. Canvas is undefined.'
			);
		}
	}
}
