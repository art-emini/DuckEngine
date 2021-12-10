import { Duck } from '../../..';
import Game from '../../game';
import Texture from '../../models/texture';
import Scene from '../../scene';
import GameObject from '../gameObject';

export default class UI<
	t extends Duck.Types.Texture.Type
> extends GameObject<t> {
	constructor(
		shape: Duck.Types.Collider.ShapeString,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number,
		texture: Texture<t>,
		game: Game,
		scene: Scene
	) {
		super(shape, x, y, w, h, r, texture, game, scene);
	}
}
