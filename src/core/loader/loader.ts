// utils
import { Duck } from '../..';
import Game from '../game';
import Texture from '../texture/texture';
import Scene from '../scene';
import TextureSheet from '../texture/textureSheet';
import Debug from '../debug/debug';
import getImageData from '../../utils/getImageData';
import convertURItoBlob from '../../utils/convertURItoBlob';

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

	protected async tryCache(prefix: string, key: string) {
		return this.game.cacheManager.get(`${prefix}_${key}`);
	}

	protected async saveCache(prefix: string, key: string, value: string) {
		return this.game.cacheManager.set(`${prefix}_${key}`, value);
	}

	/**
	 * @memberof Loader
	 * @description Loads an image and creates a texture, caches it if it does not already exist in the cache (clear cache if texture does not update
	 * if you edit the image src)
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the texture, used to load the texture in sprites
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
		const image = new Image();
		image.width = w;
		image.height = h;

		// try cache
		const cacheData = await this.tryCache('texture', key);
		if (cacheData) {
			image.setAttribute('src', cacheData); // DATA URL object

			if (this.game.config.debug) {
				new Debug.Log('Loaded texture from cache.');
			}

			const texture = new Texture<'image'>('image', image, w, h);

			this.imageStack.push({
				type: 'texture',
				value: texture,
				key,
				dataType: 'base',
			});

			return image;
		} else {
			const res = await fetch(pathOrURL);
			const blob = await res.blob();

			const url = URL.createObjectURL(blob.slice(0, 4000));

			image.src = url;

			const texture = new Texture<'image'>('image', image, w, h);

			this.imageStack.push({
				type: 'texture',
				value: texture,
				key,
				dataType: 'base',
			});

			// save image in cache
			getImageData(
				image,
				w,
				h,
				(data) => {
					this.saveCache('texture', key, data);
				},
				() => {
					new Debug.Error(
						'Failed to save texture in cache, report this bug.'
					);
				}
			);

			return image;
		}
	}

	/**
	 * @memberof Loader
	 * @description Loads an image and creates a texture sheet, caches it if it does not already exist in the cache (clear cache if texture does not update
	 * if you edit the image src)
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
		const image = new Image();
		image.width = frameWidth * cols;
		image.height = frameHeight * rows;

		// try cache
		const cacheData = await this.tryCache('texture_sheet', key);
		if (cacheData) {
			image.setAttribute('src', cacheData); // DATA URL object

			if (this.game.config.debug) {
				new Debug.Log('Loaded texture sheet from cache.');
			}

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
		} else {
			const res = await fetch(pathOrURL);
			const blob = await res.blob();

			const url = URL.createObjectURL(blob.slice(0, 4000));

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

			// save image in cache
			getImageData(
				image,
				frameWidth * cols,
				frameHeight * rows,
				(data) => {
					this.saveCache('texture_sheet', key, data);
				},
				() => {
					new Debug.Error(
						'Failed to save texture sheet in cache, report this bug.'
					);
				}
			);

			return image;
		}
	}

	/**
	 * @memberof Loader
	 * @description Loads a JSON file and adds it to the jsonStack, caches it if it does not already exist
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadJSON(pathOrURL: string, key: string) {
		// try cache
		const cacheData = await this.tryCache('json', key);
		if (cacheData) {
			const json = JSON.parse(cacheData);

			if (this.game.config.debug) {
				new Debug.Log('Loaded JSON from cache');
			}

			this.jsonStack.push({
				type: 'json',
				value: json,
				key,
			});

			return json;
		} else {
			const res = await fetch(pathOrURL);
			const json: Record<string, unknown> = await res.json();

			this.jsonStack.push({
				type: 'json',
				value: json,
				key,
			});

			// save in cache
			this.saveCache('json', key, JSON.stringify(json));

			return json;
		}
	}

	/**
	 * @memberof Loader
	 * @description Loads a HTML file and adds it to the htmlStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadHTML(pathOrURL: string, key: string) {
		// try cache
		const cacheData = await this.tryCache('html', key);
		if (cacheData) {
			const text = cacheData;

			if (this.game.config.debug) {
				new Debug.Log('Loaded HTML from cache');
			}

			const html = new window.DOMParser().parseFromString(
				text,
				'text/html'
			);

			this.htmlStack.push({
				type: 'html',
				value: html,
				key,
			});

			return html;
		} else {
			const res = await fetch(pathOrURL);
			const text = await res.text();
			const html = new window.DOMParser().parseFromString(
				text,
				'text/html'
			);

			this.htmlStack.push({
				type: 'html',
				value: html,
				key,
			});

			// save in cache
			this.saveCache('html', key, text);

			return html;
		}
	}

	/**
	 * @memberof Loader
	 * @description Loads a XML file and adds it to the xmlStack
	 * @param {string} pathOrURL Path to the file or the URL
	 * @param {string} key Key of the file to use to save it as
	 * @since 2.0.0
	 */
	public async loadXML(pathOrURL: string, key: string) {
		// try cache
		const cacheData = await this.tryCache('xml', key);
		if (cacheData) {
			const text = cacheData;

			if (this.game.config.debug) {
				new Debug.Log('Loaded XML from cache');
			}

			const xml = new window.DOMParser().parseFromString(
				text,
				'text/xml'
			);

			this.xmlStack.push({
				type: 'html',
				value: xml,
				key,
			});

			return xml;
		} else {
			const res = await fetch(pathOrURL);
			const text = await res.text();
			const xml = new window.DOMParser().parseFromString(
				text,
				'text/xml'
			);

			this.xmlStack.push({
				type: 'html',
				value: xml,
				key,
			});

			// save in cache
			this.saveCache('xml', key, text);

			return xml;
		}
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

		document.fonts.add(font);

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
		// try cache
		const cacheData = await this.tryCache('audio', key);
		if (cacheData) {
			const blob = convertURItoBlob(cacheData);

			if (this.game.config.debug) {
				new Debug.Log('Loaded Audio from cache');
			}

			const url = window.URL.createObjectURL(blob);
			const audio = new Audio();
			audio.src = url;

			this.audioStack.push({
				type: 'audio',
				value: audio,
				key,
			});

			return audio;
		} else {
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

			// save in cache
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				this.saveCache('audio', key, e.target?.result as string);
			};

			fileReader.readAsDataURL(blob);

			return audio;
		}
	}
}
