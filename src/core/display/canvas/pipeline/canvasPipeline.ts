import { Duck } from '../../../..';
import Game from '../../../game';

export default class CanvasPipeline {
	public game: Game;

	protected needsUpdate: Duck.Types.Renderable[];

	constructor(game: Game) {
		this.game = game;

		this.needsUpdate = [];
	}

	public add(renderable: Duck.Types.Renderable) {
		this.needsUpdate.push(renderable);
	}

	public remove(renderable: Duck.Types.Renderable) {
		if (this.get(renderable.id)) {
			this.needsUpdate.splice(this.getIndex(renderable.id), 1);
		}
	}

	public get(id: string) {
		return this.needsUpdate.find((r) => r.id === id);
	}

	public getIndex(id: string) {
		return this.needsUpdate.findIndex((r) => r.id === id);
	}
}
