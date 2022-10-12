import uniqueID from '../../utils/uniqueID';
import Vector2 from '../math/vector2';

/**
 * @class Tile
 * @classdesc Creates a DuckEngine Tile
 * @description The Tile Class. Stores information about a Tile on a Tileset
 * @since 2.0.0
 */
export default class Tile {
  /**
   * @memberof Tile
   * @description Unique identifier for the Tile
   * @type string
   * @since 2.0.0
   */
  public readonly id: string;

  /**
   * @memberof Tile
   * @description Position of the tile
   * @type Vector2
   * @since 2.0.0
   */
  public position: Vector2;

  /**
   * @memberof Tile
   * @description Width of the tile
   * @type number
   * @since 2.0.0
   */
  public w: number;

  /**
   * @memberof Tile
   * @description Height of the tile
   * @type number
   * @since 2.0.0
   */
  public h: number;

  /**
   * @constructor Tile
   * @description Creates a Tile instance
   * @param {number} x X position of the Tile
   * @param {number} y Y position of the Tile
   * @param {number} w Width of the Tile
   * @param {number} h Height of the Tile
   */
  constructor(x: number, y: number, w: number, h: number) {
    this.id = uniqueID();
    this.position = new Vector2(x, y);
    this.w = w;
    this.h = h;
  }
}
