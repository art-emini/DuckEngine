import Sprite from '../gameobjects/sprite';

export default class AnimationFrame {
	public col: number;
	public row: number;
	public sprite: Sprite;

	constructor(col: number, row: number, sprite: Sprite) {
		this.col = col;
		this.row = row;
		this.sprite = sprite;
	}

	public set() {
		this.sprite.currentCol = this.col;
		this.sprite.currentRow = this.row;
	}
}
