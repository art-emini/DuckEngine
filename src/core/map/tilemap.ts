import { Duck } from '../..';
import Game from '../game';
import Scene from '../scene';
import Map from './map';
import TileLayer from './tilelayer';

/**
 * @class TileMap
 * @classdesc Creates a DuckEngine TileMap
 * @description The TileMap Class. Creates a tilemap of images
 * @extends Map
 * @since 1.0.0
 */
export default class TileMap extends Map {
	/**
	 * @constructor TileMap
	 * @description Creates a TileMap instance.
	 * @param {TileLayer[]} tileLayers An array of TileLayers
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @since 1.0.0
	 */
	constructor(
		origin: Duck.Types.Math.Vector2Like,
		tileLayers: TileLayer[],
		game: Game,
		scene: Scene
	) {
		super(origin, tileLayers, game, scene);
	}

	/**
	 * @description Draws the tilemap.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		this.sortTileLayers().forEach((layer) => {
			for (let row = 0; row < layer.map.length; row++) {
				for (let col = 0; col < layer.map[row].length; col++) {
					const tile = layer.tileset.getTile(layer.map[row][col]);

					if (tile) {
						if (
							this.game.renderer.ctx &&
							layer.tileset.texture.texture
						) {
							this.game.renderer.ctx.drawImage(
								layer.tileset.texture.texture,
								tile.position.x,
								tile.position.y,
								layer.tileset.tileW,
								layer.tileset.tileH,
								layer.tileset.tileW * col + this.origin.x,
								layer.tileset.tileH * row + this.origin.y,
								layer.tileset.tileW,
								layer.tileset.tileH
							);
						}
					}
				}
			}
		});
	}

	/**
	 * @memberof Tilemap
	 * @description Gets visible layers based on filter, then depth sorts the layers
	 * @param {boolean} [filter=true]
	 * @returns TileLayer[]
	 * @since 2.0.0
	 */
	public sortTileLayers(filter = true) {
		const visibleLayers = this.tileLayers.filter(
			(layer) => layer.visible === filter
		);
		const depthSortedLayers = [...visibleLayers].sort(
			(layer, layer2) => layer.zIndex - layer2.zIndex
		);
		return depthSortedLayers;
	}
}
