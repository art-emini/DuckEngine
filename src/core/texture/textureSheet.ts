import TextureBase from './textureBase';

export default class TextureSheet extends TextureBase<'image'> {
	public readonly frameWidth: number | undefined;
	public readonly frameHeight: number | undefined;

	public readonly rows: number | undefined;
	public readonly cols: number | undefined;

	constructor(
		texture: HTMLImageElement,
		frameWidth: number,
		frameHeight: number,
		rows: number,
		cols: number
	) {
		super('image', 'sheet', texture, frameWidth, frameHeight);

		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.rows = rows;
		this.cols = cols;
	}
}
