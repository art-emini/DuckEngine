import { Duck } from '../../../..';
import EVENTS from '../../../events/events';
import Game from '../../../game';

export default class RendererPipeline {
	public game: Game;

	public poolInterval: unknown;
	public poolStack: Duck.Types.RendererPipeline.PoolStackItem[];

	protected updateTimeInterval: unknown;

	constructor(game: Game, poolingInterval = 1000 / game.fps) {
		this.game = game;

		this.poolInterval = setInterval(() => {
			this.pool();
		}, poolingInterval);
		this.poolStack = [];

		this.updateTimeInterval = setInterval(() => {
			this.updateTime();
		}, 1000);
	}

	public pool() {
		this.poolStack = [];

		// get visible scenes
		const visibleScenes = this.game.stack.scenes.filter(
			(scene) => scene.visible === true
		);

		visibleScenes.forEach((scene) => {
			// displayList
			const depthSorted = scene.displayList.depthSort();
			const visibleObjects = depthSorted.filter(
				(r) => r.visible === true
			);

			this.poolStack.push({
				scene,
				renderables: visibleObjects,
			});
		});

		this.game.eventEmitter.emit(
			EVENTS.RENDERER.PIPELINE_POOL,
			this.poolStack
		);
	}

	public updateTime() {
		const newInterval = 1000 / this.game.fps;

		clearInterval(this.poolInterval as number);

		this.poolInterval = setInterval(() => {
			this.pool();
		}, newInterval);
	}
}
