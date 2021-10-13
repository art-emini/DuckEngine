import Game from '../game';
import GameObject from './gameObject';

export default class SpriteSheet extends GameObject {
	private image: HTMLImageElement;
	private frameWidth: number;
	private frameHeight: number;

	private rows: number;
	private cols: number;
	public currentRow: number;
	public currentCol: number;

	public animating: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private animationInterval: any | undefined;

	constructor(
		x: number,
		y: number,
		imagePath: string,
		frameWidth: number,
		frameHeight: number,
		rows: number,
		cols: number,
		currentRow: number,
		currentCol: number,
		game: Game
	) {
		super('spritesheet', x, y, frameWidth, frameHeight, 0, imagePath, game);
		this.init(this);

		this.image = new Image();
		this.image.src = imagePath;

		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;

		this.rows = rows;
		this.cols = cols;

		this.currentRow = currentRow;
		this.currentCol = currentCol;

		this.animating = false;
		this.animationInterval;
	}

	public nextCol() {
		if (this.currentCol < this.cols) {
			this.currentCol += 1;
		}
	}

	public nextRow() {
		if (this.currentRow < this.rows) {
			this.currentRow += 1;
		}
	}

	public startAnimation() {
		this.animating = true;
	}

	public animate(fps: number, switchRowOnEnd?: boolean) {
		this.animationInterval = setInterval(() => {
			if (this.animating) {
				this.nextCol();

				if (this.currentCol === this.cols && !switchRowOnEnd) {
					this.currentCol = 1; // draw subtracts one so it equals 0
				}

				if (this.currentCol === this.cols && switchRowOnEnd) {
					this.currentCol = 1; // draw subtracts one so it equals 0
					this.nextRow();
				}
			}
		}, 1000 / fps);
	}

	public animateFor(fps: number, timeMS: number, switchRowOnEnd?: boolean) {
		this.animate(fps, switchRowOnEnd);
		setTimeout(() => {
			this.stopAnimation();
		}, timeMS);
	}

	public animateFrames(
		fps: number,
		col: number,
		row: number,
		stopCol: number,
		stopRow: number,
		switchRowOnEnd?: boolean
	) {
		this.currentCol = col;
		this.currentRow = row;

		this.animationInterval = setInterval(() => {
			if (this.animating) {
				if (this.currentCol !== stopCol) {
					this.nextCol();

					if (this.currentCol === stopCol && !switchRowOnEnd) {
						this.currentCol = stopCol; // draw subtracts one so it equals 0
					}

					if (this.currentCol === this.cols && switchRowOnEnd) {
						if (this.currentRow !== stopRow) {
							this.nextRow();
						} else {
							this.currentCol = stopCol; // draw subtracts one so it equals 0
						}
					}
				} else {
					this.stopAnimation();
				}
			}
		}, 1000 / fps);
	}

	public animateNoFPS(switchRowOnEnd?: boolean) {
		if (this.animating) {
			this.nextCol();

			if (this.currentCol === this.cols && !switchRowOnEnd) {
				this.currentCol = 1; // draw subtracts one so it equals 0
			}

			if (this.currentCol === this.cols && switchRowOnEnd) {
				this.currentCol = 1; // draw subtracts one so it equals 0
				this.nextRow();
			}
		}
	}

	public stopAnimation() {
		this.animating = false;

		if (this.animationInterval !== undefined) {
			clearInterval(this.animationInterval);
		}
	}

	public _draw() {
		if (this.game.ctx) {
			this.game.ctx.drawImage(
				this.image, // image
				(this.currentCol - 1) * this.frameWidth, // source x
				(this.currentRow - 1) * this.frameHeight, // source y
				this.frameWidth, // source width
				this.frameHeight, // source height
				this.position.x, // target x
				this.position.y, // target y
				this.frameWidth, // target width
				this.frameHeight // target height
			);
		}
	}
}
