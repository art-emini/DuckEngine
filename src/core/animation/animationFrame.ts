import Sprite from '../gameobjects/sprite';

/**
 * @class AnimationFrame
 * @classdesc Creates a DuckEngine AnimationFrame
 * @description The AnimationFrame Class. Holds information about what col and row to use for the Animation
 * @since 2.0.0
 */
export default class AnimationFrame {
  /**
   * @memberof AnimationFrame
   * @description The column of the AnimationFrame, sets the Sprite.currentCol to this when played
   * @type number
   * @since 2.0.0
   */
  public col: number;

  /**
   * @memberof AnimationFrame
   * @description The row of the AnimationFrame, sets the Sprite.currentRow to this when played
   * @type number
   * @since 2.0.0
   */
  public row: number;

  /**
   * @memberof AnimationFrame
   * @description The Sprite to modify the currentCol and currentRow of
   * @type Sprite
   * @since 2.0.0
   */
  public sprite: Sprite;

  /**
   * @constructor AnimationFrame
   * @description Creates an AnimationFrame instance
   * @param {number} col Column of the Frame
   * @param {number} row Row of the Frame
   * @param {Sprite} sprite Sprite to modify the currentCol and currentRow of
   * @since 2.0.0
   */
  constructor(col: number, row: number, sprite: Sprite) {
    this.col = col;
    this.row = row;
    this.sprite = sprite;
  }

  /**
   * @memberof AnimationFrame
   * @description Sets the Sprite.currentCol to AnimationFrame.col and Sprite.currentRow to AnimationFrame.row
   * @since 2.0.0
   */
  public set() {
    this.sprite.currentCol = this.col;
    this.sprite.currentRow = this.row;
  }
}
