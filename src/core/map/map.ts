/* eslint-disable @typescript-eslint/no-empty-function */

/* This class is extended by all map classes for code reusability */

import { Duck } from '../..';
import Game from '../game';
import randomInt from '../math/randomInt';
import Vector2 from '../math/vector2';
import Scene from '../scene';
import TileLayer from './tilelayer';

/**
 * @class Map
 * @classdesc Creates a DuckEngine Map
 * @description The Map Class. Base Map class, extends by TileMap
 * @since 1.2.0
 */
export default class Map {
	public readonly id: number;
	public readonly shape: string;
	public origin: Vector2;
	public tileLayers: TileLayer[];
	public game: Game;
	public scene: Scene;

	public visible: boolean;
	public zIndex: number;

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
		this.id = randomInt(0, 100000);
		this.shape = 'map';
		this.origin = Vector2.fromVector2Like(origin);
		this.tileLayers = tileLayers;
		this.game = game;
		this.scene = scene;

		this.visible = true;
		this.zIndex = 2;
	}

	/**
	 * @description Draws the map.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {}
}
