import Game from '../../game';
import Group from '../../group/group';
import Color from '../../renderer/models/color';
import Scene from '../../scene';
import Texture from '../../texture/texture';
import UI from './ui';

/**
 * @class Container
 * @classdesc Creates a DuckEngine Container
 * @description The Container Class. Contains, manages, organizes a list of UI elements
 * @extends UI
 * @since 3.0.0
 */
export default class Container extends UI<'either'> {
  public elements: Group<UI<'either'>>;

  /**
   * @constructor
   * @description Creates a Container instance
   * @param {'rect' | 'sprite'} shape Shape of the Container, 'rect' or 'sprite'
   * @param {number} x X position
   * @param {number} y Y position
   * @param {number} w Width
   * @param {number} h Height
   * @param {number} r Radius
   * @param {string | Color} fillColorOrIMGPath Color or Image path of the Container
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(
    shape: 'rect' | 'sprite',
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    fillColorOrIMGPath: string | Color,
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
      Texture.fromEither(fillColorOrIMGPath, w, h),
      game,
      scene
    );

    this.elements = new Group<UI<'either'>>(
      `container-${this.id}-elements`,
      this.game,
      []
    );
  }

  /**
   * @memberof Container
   * @description Checks and returns a boolean if a UI Element exists inside of the Container
   * @param {UI<'either'>} element UI Element to check if it exists inside of the Container
   * @returns boolean
   * @since 3.0.0
   */
  public includes(element: UI<'either'>) {
    return this.elements.find(element) ? true : false;
  }

  /**
   * @memberof Container
   * @description Gets and returns the UI Element if it exists inside of the Container
   * @param {UI<'either'>} element UI Element to get from the Container, if it exists
   * @returns UI<'either'> | undefined
   * @since 3.0.0
   */
  public get(element: UI<'either'>) {
    return this.elements.find(element);
  }

  /**
   * @memberof Container
   * @description Gets and returns the UI Element by its ID, if it exists inside of the Container
   * @param {string} id UI Element to get from the Container, by ID, if it exists
   * @returns UI<'either'> | undefined
   * @since 3.0.0
   */
  public getByID(id: string) {
    return this.elements.group.find((e) => e.id === id);
  }
}
