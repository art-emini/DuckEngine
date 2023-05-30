/* eslint-disable @typescript-eslint/no-empty-function */

/* This class is extended by all map classes for code reusability */

import { Duck } from '../..';
import uniqueID from '../../utils/uniqueID';
import Game from '../game';
import Vector2 from '../math/vector2';
import Scene from '../scene';
import TileLayer from './tilelayer';

/**
 * @class Map
 * @classdesc Creates a DuckEngine Map
 * @description The Map Class. Base Map class, extended by TileMap
 * @since 1.2.0
 */
export default class Map implements Duck.Types.Renderable {
  /**
   * @memberof Map
   * @description A unique identifier for the Map
   * @type number
   * @since 2.0.0
   */
  public readonly id: string;

  /**
   * @memberof Map
   * @description "Shape" of the map, always "Map", used by Scene.displayList to distinguish between Renderables
   * @type string
   * @since 2.0.0
   */
  public readonly shape: string;

  /**
   * @memberof Map
   * @description The map origin point
   * @type Vector2
   * @since 2.0.0
   */
  public origin: Vector2;

  /**
   * @memberof Map
   * @description An array of TileLayers
   * @type TileLayers[]
   * @since 2.0.0
   */
  public tileLayers: TileLayer[];

  /**
   * @memberof Map
   * @description Game instance
   * @type Game
   * @since 2.0.0
   */
  public game: Game;

  /**
   * @memberof Map
   * @description Scene instance
   * @type Scene
   * @since 2.0.0
   */
  public scene: Scene;

  /**
   * @memberof Map
   * @description Determines if the Map is visible or not
   * @type boolean
   * @since 2.0.0
   */
  public visible: boolean;

  /**
   * @memberof Map
   * @description Used for depth sorting, default: 2
   * @type number
   * @since 2.0.0
   */
  public zIndex: number;

  /**
   * @memberof Map
   * @description Determines if the Map should be visible by the current scene's current camera
   * @type boolean
   * @since 2.1.0
   */
  public culled: boolean;

  /**
   * @constructor Map
   * @description Creates a Map instance.
   * @param {TileLayer[]} tileLayers An array of TileLayers
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 2.0.0
   */
  constructor(
    origin: Duck.Types.Math.Vector2Like,
    tileLayers: TileLayer[],
    game: Game,
    scene: Scene
  ) {
    this.id = uniqueID();
    this.shape = 'map';
    this.origin = Vector2.fromVector2Like(origin);
    this.tileLayers = tileLayers;
    this.game = game;
    this.scene = scene;

    this.visible = true;
    this.zIndex = 2;
    this.culled = true;
  }

  /**
   * @description Draws the map.
   *
   * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
   *
   */
  public _draw() {}
}
