import Game from '../game';
import Texture from '../models/texture';

export default abstract class BaseRenderer {
	public game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	abstract clearFrame(): void;
	abstract drawRect(
		x: number,
		y: number,
		w: number,
		h: number,
		color: string
	): void;
	abstract drawCircle(x: number, y: number, r: number, color: string): void;
	abstract drawRoundRect(
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		color: string
	): void;
	abstract drawSprite(
		x: number,
		y: number,
		w: number,
		h: number,
		texture: Texture<'image'>,
		frameWidth?: number,
		frameHeight?: number,
		currentRow?: number,
		currentCol?: number
	): void;
}
