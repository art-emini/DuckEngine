import { Duck } from '../../../..';
import EVENTS from '../../../events/events';
import Game from '../../../game';

export default class RendererPipeline {
	public game: Game;

	public poolInterval: unknown;
	public poolStack: Duck.Types.RendererPipeline.PoolStackItem[];

	constructor(game: Game, poolingInterval = 1000) {
		this.game = game;

		this.poolInterval = setInterval(() => {
			this.pool();
		}, poolingInterval);
		this.poolStack = [];
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
}
