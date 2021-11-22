import { Duck } from '../..';
import uniqueID from '../../utils/uniqueID';
import Vector2 from '../math/vector2';

/**
 * @class Texture
 * @classdesc Creates a DuckEngine Texture
 * @description The Texture Class. Stores images and colors in a class
 * @template type Texture type, 'image' | 'color' | 'either'
 * @since 2.0.0
 */
export default class Texture<type extends Duck.Types.Texture.Type> {
	/**
	 * @memberof Texture
	 * @description The unique identifier for the texture
	 * @type string
	 * @since 2.0.0
	 */
	public readonly id: string;

	/**
	 * @memberof Texture
	 * @description The type of texture, 'image' | 'color' | 'either'
	 * @type Duck.Types.Texture.Type
	 * @since 2.0.0
	 */
	public readonly type: Duck.Types.Texture.Type;

	/**
	 * @memberof Texture
	 * @description The texture itself, can be an image or color
	 * @type HTMLImageElement | string
	 * @since 2.0.0
	 */
	public texture: type extends 'image'
		? HTMLImageElement
		: type extends 'either'
		? string | HTMLImageElement
		: string;

	/**
	 * @memberof Texture
	 * @description The scale of the texture
	 * @type Vector2
	 * @since 2.0.0
	 */
	public scale: Vector2;

	/**
	 * @constructor Texture
	 * @description Creates an image texture
	 * @param {'image'} type Texture type
	 * @param {HTMLImageElement} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.0.0
	 */
	constructor(type: 'image', texture: HTMLImageElement, w: number, h: number);

	/**
	 * @constructor Texture
	 * @description Creates a color texture
	 * @param {'color'} type Texture type
	 * @param {string} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.0.0
	 */
	constructor(type: 'color', texture: string, w: number, h: number);

	/**
	 * @constructor Texture
	 * @description Creates a color or image texture
	 * @param {'either'} type Texture type
	 * @param {HTMLImageElement | string} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.0.0
	 */
	constructor(
		type: 'either',
		texture: HTMLImageElement | string,
		w: number,
		h: number
	);

	/**
	 * @constructor Texture
	 * @description Creates a texture
	 * @param {Duck.Types.Texture.Type} type Texture type
	 * @param {HTMLImageElement:string} texture Texture source
	 * @param {number} w Width of texture
	 * @param {number} h Height of texture
	 * @since 2.0.0
	 */
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
		this.id = uniqueID();
		this.type = type;

		this.texture = texture;
		this.scale = new Vector2(w, h);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture Scale
	 * @param {Duck.Types.Misc.Scale} scale New scale of the texture
	 * @since 2.0.0
	 */
	public setScale(scale: Duck.Types.Misc.Scale) {
		this.scale = new Vector2(scale.width, scale.height);

		if (this.type === 'image') {
			(this.texture as HTMLImageElement).width = this.scale.x;
			(this.texture as HTMLImageElement).height = this.scale.y;
		}

		return this.scale;
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture Image Path if the type is image
	 * @param {string} imagePath New imagePath of the texture
	 * @since 2.0.0
	 */
	public setImagePath(imagePath: string) {
		if (this.type === 'image') {
			(this.texture as HTMLImageElement).src = imagePath;
		}
	}

	/**
	 * @memberof Texture
	 * @description Sets the Texture color if the type is color
	 * @param {string} color New color of the texture
	 * @since 2.0.0
	 */
	public setFillColor(color: string | number) {
		if (this.type === 'color') {
			(this.texture as string | number) = color;
		}
	}

	/**
	 * @memberof Texture
	 * @description Creates a new Texture instance from a color
	 * @param {string} color Color
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns Texture<'color'>
	 * @since 2.0.0
	 */
	public static fromColor(color: string, w: number, h: number) {
		return new Texture<'color'>('color', color, w, h);
	}

	/**
	 * @memberof Texture
	 * @description Creates a new Texture instance from an image path
	 * @param {string} imgpath Image path
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns Texture<'image'>
	 * @since 2.0.0
	 */
	public static fromTexture(imgpath: string, w: number, h: number) {
		const img = new Image(w, h);
		img.src = imgpath;

		return new Texture<'image'>('image', img, w, h);
	}

	/**
	 * @memberof Texture
	 * @description Creates a new Texture instance from a color or an image path
	 * @param {string} fillColorOrIMGPath Color or Image path
	 * @param {number} w Width
	 * @param {number} h Height
	 * @static
	 * @returns Texture<'either'>
	 * @since 2.0.0
	 */
	public static fromEither(fillColorOrIMGPath: string, w: number, h: number) {
		return new Texture<'either'>('either', fillColorOrIMGPath, w, h);
	}
}
