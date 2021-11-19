import randomInt from '../math/randomInt';
import Vector2 from '../math/vector2';

export default class Tile {
	public readonly id: number;
	public position: Vector2;
	public w: number;
	public h: number;

	constructor(x: number, y: number, w: number, h: number) {
		this.id = randomInt(0, 100000);
		this.position = new Vector2(x, y);
		this.w = w;
		this.h = h;
	}
}
