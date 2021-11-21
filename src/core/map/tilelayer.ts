import Game from '../game';
import Scene from '../scene';
import Tileset from './tileset';

/**
 * @class TileLayer
 * @classdesc Creates a DuckEngine TileLayer
 * @description The TileLayer Class. Stores a 2D array that relates to a Tileset that is then used in a TileMap
 * @since 1.0.0-beta
 */
export default class TileLayer {
	/**
	 * @memberof TileLayer
	 * @description Tileset to relate map info to
	 * @type Tileset
	 * @since 2.0.0
	 */
	public tileset: Tileset;

	/**
	 * @memberof TileLayer
	 * @description A 2D array of numbers that relates to Tiles on a Tileset
	 * @type number[][]
	 * @since 2.0.0
	 */
	public map: number[][];

	/**
	 * @memberof TileLayer
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof TileLayer
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof TileLayer
	 * @description Used for depth sorting
	 * @type number
	 * @since 2.0.0
	 */
	public zIndex: number;

	/**
	 * @memberof TileLayer
	 * @description Determines if the TileLayer is visible or not
	 * @type boolean
	 * @since 2.0.0
	 */
	public visible: boolean;
	/**
	 * @param {Tileset} tileset Tileset that the 2D array relates to
	 * @param {number[][]} map A 2D array of numbers that relates to the Tileset
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {number} [zIndex=2] zIndex, optional -> defaults: 2
	 * @param {boolean} [visible=true] visible, optional -> defaults: true
	 */
	constructor(
		tileset: Tileset,
		map: number[][],
		game: Game,
		scene: Scene,
		zIndex = 2,
		visible = true
	) {
		this.tileset = tileset;
		this.map = map;
		this.game = game;
		this.scene = scene;
		this.zIndex = zIndex;
		this.visible = visible;
	}
}
