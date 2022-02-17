/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Duck } from '../..';
import clipImage from '../../utils/clipImage';
import Debug from '../debug/debug';
import Game from '../game';
import Scene from '../scene';
import Texture from './texture';
import TextureBase from './textureBase';

export default class TextureAtlas extends TextureBase<'image'> {
	public game: Game;
	public scene: Scene;

	public json: Duck.Types.TextureAtlas.JSONSchema;

	constructor(
		textureKey: string,
		jsonKey: string,
		w: number,
		h: number,
		game: Game,
		scene: Scene
	) {
		super(
			'image',
			'atlas',
			scene.loader.textureStack.find((image) => image.key === textureKey)!
				.value.texture,
			w,
			h
		);
		this.game = game;
		this.scene = scene;

		this.json = scene.loader.jsonStack.find((json) => json.key === jsonKey)!
			.value as unknown as Duck.Types.TextureAtlas.JSONSchema;

		this.validateJSON();
	}

	protected validateJSON() {
		if (this.json) {
			if ('name' in this.json && 'data' in this.json) {
				if (typeof this.json.name !== 'string') {
					new Debug.Error(
						'Invalid TextureAtlas JSON. "name" must be a string'
					);
					return;
				}
				if (!Array.isArray(this.json.data)) {
					new Debug.Error(
						'Invalid TextureAtlas JSON. "data" must be an array'
					);
					return;
				}
			} else {
				new Debug.Error(
					'Invalid TextureAtlas JSON. "name" or "data" may be missing'
				);
				return;
			}

			this.parseJSON();
		} else {
			new Debug.Error(
				'Cannot find JSON using the passed key. Make sure you preloaded the json before using the key'
			);
			return;
		}
	}

	protected parseJSON() {
		this.json.data.forEach((frameData) => {
			clipImage(
				this.texture,
				frameData.x,
				frameData.y,
				frameData.w,
				frameData.h,
				(image) => {
					const texture = new Texture<'image'>(
						'image',
						image,
						frameData.w,
						frameData.h
					);

					this.scene.loader.textureStack.push({
						type: 'texture',
						value: texture,
						key: frameData.key,
						dataType: 'base',
					});
				},
				() => {
					new Debug.Error(
						'Failed to clip and create image frame from texture atlas whilst parsing json. Unknown error occurred, report this bug'
					);
				}
			);
		});
	}

	public get(key: string): Texture<'image'> | undefined {
		return this.scene.loader.textureStack.find(
			(texture) => texture.key === key
		)?.value;
	}
}
