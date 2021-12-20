import { Duck } from '../../..';
import Debug from '../../debug/debug';
import Game from '../../game';
import Texture from '../../texture/texture';
import Scene from '../../scene';
import UI from './ui';

export default class Panel extends UI<'either'> {
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		textureKeyOrColor: string,
		game: Game,
		scene: Scene
	) {
		super(
			shape,
			x,
			y,
			w,
			h,
			r,
			Texture.fromEither(textureKeyOrColor, w, h),
			game,
			scene
		);
	}

	public _draw() {
		if (this.game.renderer.ctx) {
			switch (this.shape) {
				case 'circle':
					if (typeof this.texture.texture === 'string') {
						this.game.renderer.drawCircle(
							this.position.x,
							this.position.y,
							this.r,
							this.texture.texture
						);
					}
					break;

				case 'rect':
					if (typeof this.texture.texture === 'string') {
						this.game.renderer.drawRect(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.texture.texture
						);
					}
					break;

				case 'roundrect':
					if (typeof this.texture.texture === 'string') {
						this.game.renderer.drawRoundRect(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.r,
							this.texture.texture
						);
					}
					break;

				case 'sprite':
					if (typeof this.texture.texture !== 'string') {
						this.game.renderer.drawSprite(
							this.position.x,
							this.position.y,
							this.w,
							this.h,
							this.texture.texture as unknown as Texture<'image'>
						);
					}
					break;

				default:
					break;
			}
		} else {
			new Debug.Error(
				'Cannot draw panel. CanvasRenderingContext2D is undefined'
			);
		}
	}
}
