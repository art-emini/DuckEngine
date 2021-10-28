// utils
import { Duck } from '../..';
import Texture from '../models/texture';
import Scene from '../scene';

// loads images by URL or file path
// static class

/**
 * @class Loader
 * @classdesc A static class that loads images and other assets
 * @description The Loader Class. Preloading and loading is handled here
 * @since 1.0.0-beta
 */
export default class Loader {
	public scene: Scene;

	public imageStack: Duck.Types.Loader.StackItem<Texture<'image'>>[];
	public jsonStack: Duck.Types.Loader.StackItem<Record<string, unknown>>[];
	public htmlStack: Duck.Types.Loader.StackItem<Document>[];
	public xmlStack: Duck.Types.Loader.StackItem<Document>[];
	public fontStack: Duck.Types.Loader.StackItem<FontFace>[];
	public audioStack: Duck.Types.Loader.StackItem<HTMLAudioElement>[];

	constructor(scene: Scene) {
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
	 * @since 1.0.0-beta
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
		});

		return image;
	}

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
