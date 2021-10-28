import { Duck } from '../..';
import randomInt from '../math/randomInt';
import Vector2 from '../math/vector2';

export default class Texture<type extends Duck.Types.Texture.Type> {
	public readonly id: number;
	public readonly type: Duck.Types.Texture.Type;

	public texture: type extends 'image'
		? HTMLImageElement
		: type extends 'either'
		? string | HTMLImageElement
		: string;

	public scale: Vector2;

	constructor(type: 'image', texture: HTMLImageElement, w: number, h: number);
	constructor(type: 'color', texture: string, w: number, h: number);
	constructor(
		type: 'either',
		texture: HTMLImageElement | string,
		w: number,
		h: number
	);
	constructor(
		type: Duck.Types.Texture.Type,
		texture: type extends 'image'
			? HTMLImageElement
			: type extends 'either'
			? string | HTMLImageElement
			: string,
		w: number,
		h: number
	) {
		this.id = randomInt(0, 100000);
		this.type = type;

		this.texture = texture;
		this.scale = new Vector2(w, h);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}
	}

	public setScale(scale: Duck.Types.Misc.Scale) {
		this.scale = new Vector2(scale.width, scale.height);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}

		return this.scale;
	}

	public setImagePath(imagePath: string) {
		if (this.type === 'image') {
			(this.texture as HTMLImageElement).src = imagePath;
		}
	}

	public setFillColor(color: string | number) {
		if (this.type === 'color') {
			(this.texture as string | number) = color;
		}
	}

	public static fromColor(color: string, w: number, h: number) {
		return new Texture('color', color, w, h);
	}

	public static fromTexture(imgpath: string, w: number, h: number) {
		const img = new Image(w, h);
		img.src = imgpath;

		return new Texture('image', img, w, h);
	}

	public static fromEither(fillColorOrIMGPath: string, w: number, h: number) {
		return new Texture('either', fillColorOrIMGPath, w, h);
	}
}
