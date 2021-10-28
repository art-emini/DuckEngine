import { Duck } from '../../index';
import Game from '../game';

/**
 * @class DuckStorage
 * @classdesc Creates a DuckStorage
 * @description The DuckStorage Class. Stores data such as scenes, gameConfig, and custom data.
 * @since 1.0.0-beta
 */
export default class DuckStorage {
	protected config: Duck.Types.Storage.Config;
	public game: Game;

	/**
	 * @constructor DuckStorage
	 * @description Creates a DuckStorage instance.
	 * @param {Duck.Types.Storage.Config} config DuckStorage Configuration
	 * @param {Game} game Game instance
	 * @since 1.0.0-beta
	 */
	constructor(config: Duck.Types.Storage.Config, game: Game) {
		this.config = config;
		this.game = game;
	}

	/**
	 * @memberof DuckStorage
	 * @description Saves scenes, gameConfig, and custom data if passed
	 * @param {unknown[]} [data] Custom data, optional
	 * @since 1.0.0-beta
	 */
	public save(data?: unknown[]) {
		if (this.config.save.scenes) {
			localStorage.setItem(
				'duckengine-save-scenes',
				JSON.stringify(this.game.stack.scenes)
			);
		}
		if (this.config.save.data && data) {
			localStorage.setItem('duckengine-save-data', JSON.stringify(data));
		}
		if (this.config.save.gameConfig) {
			localStorage.setItem(
				'duckengine-save-gameConfig',
				JSON.stringify(this.game.config)
			);
		}
	}

	/**
	 * @memberof DuckStorage
	 * @description Loads data based on loadType
	 * @param  {Duck.Types.Storage.LoadType} loadType What to load: 'all' | 'scenes' | 'gameConfig' | 'data'
	 * @since 1.0.0-beta
	 */
	public load(loadType: Duck.Types.Storage.LoadType) {
		if (loadType === 'all') {
			const res = {
				scenes: localStorage.getItem('duckengine-save-scenes'),
				data: localStorage.getItem('duckengine-save-data'),
				gameConfig: localStorage.getItem('duckengine-save-gameConfig'),
			};

			if (res.scenes) {
				res.scenes = JSON.parse(res.scenes);
			}

			if (res.data) {
				res.data = JSON.parse(res.data);
			}

			if (res.gameConfig) {
				res.gameConfig = JSON.parse(res.gameConfig);
			}

			return res;
		}

		if (loadType === 'scenes') {
			const res = {
				scenes: localStorage.getItem('duckengine-save-scenes'),
			};

			if (res.scenes) {
				res.scenes = JSON.parse(res.scenes);
			}

			return res;
		}

		if (loadType === 'data') {
			const res = {
				data: localStorage.getItem('duckengine-save-data'),
			};

			if (res.data) {
				res.data = JSON.parse(res.data);
			}

			return res;
		}

		if (loadType === 'gameConfig') {
			const res = {
				gameConfig: localStorage.getItem('duckengine-save-gameConfig'),
			};

			if (res.gameConfig) {
				res.gameConfig = JSON.parse(res.gameConfig);
			}

			return res;
		}
	}
}
