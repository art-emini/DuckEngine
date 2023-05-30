import { Duck } from '../../..';
import Game from '../../game';
import Texture from '../../texture/texture';
import Scene from '../../scene';
import GameObject from '../gameObject';

/**
 * @class  UI
 * @classdesc Creates a DuckEngine UI Class
 * @description The UI Class. All UI GameObjects extend this class.
 * @since 3.0.0
 */
export default class UI<
  t extends Duck.Types.Texture.Type
> extends GameObject<t> {
  /**
   * @constructor
   * @description Creates a UI instance
   * @param {'rect' | 'sprite'} shape Shape of the UI
   * @param {number} x X position
   * @param {number} y Y position
   * @param {number} w Width
   * @param {number} h Height
   * @param {number} r Radius
   * @param {Texture<t>} Texture of UI
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
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
