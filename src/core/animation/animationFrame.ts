import SpriteSheet from '../gameobjects/spritesheet';

export default class AnimationFrame {
	public col: number;
	public row: number;
	public spritesheet: SpriteSheet;

	constructor(col: number, row: number, spritesheet: SpriteSheet) {
		this.col = col;
		this.row = row;
		this.spritesheet = spritesheet;
	}

	public set() {
		this.spritesheet.currentCol = this.col;
		this.spritesheet.currentRow = this.row;
	}
}
