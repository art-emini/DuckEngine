/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Game from '../../game';
import Scene from '../../scene';
import UI from './ui';

export default class ImageRect extends UI<'image'> {
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		textureKey: string,
		game: Game,
		scene: Scene
	) {
		super(
			'rect',
			x,
			y,
			w,
			h,
			0,
			scene.loader.imageStack.find((t) => t.key === textureKey)!.value,
			game,
			scene
		);

		this.texture.setScale({
			width: this.w,
			height: this.h,
		});
	}

	public _draw() {
		if (this.game.renderer.ctx) {
			this.game.renderer.drawSprite(
				this.position.x,
				this.position.y,
				this.w,
				this.h,
				this.texture
			);
		}
	}
}
