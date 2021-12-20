// utils
import { Duck } from '../..';
import Game from '../game';
import Texture from '../texture/texture';
import Scene from '../scene';
import TextureSheet from '../texture/textureSheet';

// loads images by URL or file path
// static class

/**
 * @class Loader
 * @classdesc A class that loads images and other assets
 * @description The Loader Class. Preloading and loading is handled here
 * @since 1.0.0-beta
 */
export default class Loader {
	/**
	 * @memberof Loader
	 * @description Game instance
	 * @type Game
	 * @since 1.0.0-beta
	 */
	public game: Game;

	/**
	 * @memberof Loader
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Loader
	 * @description An array of loaded Textures
	 * @type Duck.Types.Loader.TextureStackItem<Texture<'image'>>[]
	 * @since 2.0.0
	 */
	public imageStack: Duck.Types.Loader.TextureStackItem<Texture<'image'>>[];

	/**
	 * @memberof Loader
	 * @description An array of loaded JSON files
	 * @type Duck.Types.Loader.StackItem<Record<string, unknown>>[]
	 * @since 2.0.0
	 */
	public jsonStack: Duck.Types.Loader.StackItem<Record<string, unknown>>[];

	/**
	 * @memberof Loader
	 * @description An array of loaded HTML Documents
	 * @type Duck.Types.Loader.StackItem<Document>[]
	 * @since 2.0.0
	 */
	public htmlStack: Duck.Types.Loader.StackItem<Document>[];

	/**
	 * @memberof Loader
	 * @description An array of loaded XML Documents
	 * @type Duck.Types.Loader.StackItem<Document>[]
	 * @since 2.0.0
	 */
	public xmlStack: Duck.Types.Loader.StackItem<Document>[];

	/**
	 * @memberof Loader
	 * @description An array of loaded FontFaces
	 * @type Duck.Types.Loader.StackItem<FontFace>[]
	 * @since 2.0.0
	 */
	public fontStack: Duck.Types.Loader.StackItem<FontFace>[];

	/**
	 * @memberof Loader
	 * @description An array of loaded Audio elements
	 * @type Duck.Types.Loader.StackItem<HTMLAudioElement>[]
	 * @since 2.0.0
	 */
	public audioStack: Duck.Types.Loader.StackItem<HTMLAudioElement>[];
	/**
	 * @constructor Loader
	 * @description Creates a Loader instance
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0-beta
	 */
	constructor(game: Game, scene: Scene) {
		this.game = game;
		this.scene = scene;

		this.imageStack = [];
		this.jsonStack = [];
		this.htmlStack = [];
		this.xmlStack = [];
		this.fontStack = [];
		this.audioStack = [];
	}

	/**
	 * @memberof Loader
	 * @description Loads an image and creates a texture
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the texture, used to load the texture in sprites and spritesheet
	 * @param {number} w Width of image
	 * @param {number} h Height of image
	 * @since 2.0.0
	 */
	public async loadTexture(
		pathOrURL: string,
		key: string,
		w: number,
		h: number
	) {
		const res = await fetch(pathOrURL);
		const blob = await res.blob();

		const url = URL.createObjectURL(blob.slice(0, 4000));

		const image = new Image();
		image.src = url;

		const texture = new Texture<'image'>('image', image, w, h);

		this.imageStack.push({
			type: 'texture',
			value: texture,
			key,
			dataType: 'base',
		});

		return image;
	}

	/**
	 * @memberof Loader
	 * @description Loads an image and creates a texture sheet
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the texture, used to load the texture in sprites and spritesheet
	 * @param {number} w Width of image
	 * @param {number} h Height of image
	 * @since 2.1.0
	 */
	public async loadTextureSheet(
		pathOrURL: string,
		key: string,
		frameWidth: number,
		frameHeight: number,
		rows: number,
		cols: number
	) {
		const res = await fetch(pathOrURL);
		const blob = await res.blob();

		const url = URL.createObjectURL(blob.slice(0, 4000));

		const image = new Image();
		image.src = url;

		const texture = new TextureSheet(
			image,
			frameWidth,
			frameHeight,
			rows,
			cols
		);

		this.imageStack.push({
			type: 'texture',
			value: texture,
			key,
			dataType: 'sheet',
		});

		return image;
	}

	/**
	 * @memberof Loader
	 * @description Loads a JSON file and adds it to the jsonStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadJSON(pathOrURL: string, key: string) {
		const res = await fetch(pathOrURL);
		const json: Record<string, unknown> = await res.json();

		this.jsonStack.push({
			type: 'json',
			value: json,
			key,
		});

		return json;
	}

	/**
	 * @memberof Loader
	 * @description Loads a HTML file and adds it to the htmlStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadHTML(pathOrURL: string, key: string) {
		const res = await fetch(pathOrURL);
		const text = await res.text();
		const html = new window.DOMParser().parseFromString(text, 'text/html');

		this.htmlStack.push({
			type: 'html',
			value: html,
			key,
		});

		return html;
	}

	/**
	 * @memberof Loader
	 * @description Loads a XML file and adds it to the xmlStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadXML(pathOrURL: string, key: string) {
		const res = await fetch(pathOrURL);
		const text = await res.text();
		const xml = new window.DOMParser().parseFromString(text, 'text/xml');

		this.xmlStack.push({
			type: 'html',
			value: xml,
			key,
		});

		return xml;
	}

	/**
	 * @memberof Loader
	 * @description Loads a font and adds it to the fontStack
	 * @param {string} fontFamily Font Family
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @param {FontFaceDescriptors} [descriptors] Font Face Descriptors
	 * @since 2.0.0
	 */
	public async loadFont(
		fontFamily: string,
		pathOrURL: string,
		key: string,
		descriptors?: FontFaceDescriptors
	) {
		const font = new FontFace(fontFamily, `url(${pathOrURL})`, descriptors);

		const res = await font.load();

		this.fontStack.push({
			type: 'font',
			value: res,
			key,
		});

		return res;
	}

	/**
	 * @memberof Loader
	 * @description Loads an Audio file and adds it to the audioStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadAudio(pathOrURL: string, key: string) {
		const res = await fetch(pathOrURL);
		const reader = res.body?.getReader();

		const result = await reader?.read();

		const blob = new Blob([result?.value] as unknown as BlobPart[], {
			type: 'audio/mp3',
		});

		const url = window.URL.createObjectURL(blob);
		const audio = new Audio();
		audio.src = url;

		this.audioStack.push({
			type: 'audio',
			value: audio,
			key,
		});

		return audio;
	}
}
