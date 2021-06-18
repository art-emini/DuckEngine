import { Duck } from '../..';
import Game from '../game';

export default class DuckStorage {
	private config: Duck.Storage.Config;
	private game: Game;

	constructor(config: Duck.Storage.Config, game: Game) {
		this.config = config;
		this.game = game;
	}

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

	public load(loadType: Duck.Storage.LoadType) {
		if (loadType === 'all') {
			const res = {
				scenes: localStorage.getItem('duckengine-save-scenes'),
				data: localStorage.getItem('duckengine-save-data'),
				gameConfig: localStorage.getItem('duckengine-save-gameConfig'),
			};

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
