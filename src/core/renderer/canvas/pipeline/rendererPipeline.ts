import { Duck } from '../../../..';
import EVENTS from '../../../events/events';
import Game from '../../../game';

/**
 * @class RendererPipeline
 * @classdesc Creates a DuckEngine RendererPipeline
 * @description The RendererPipeline Class. Manages all visible scenes and renderables by pooling them on an interval for GC efficiency
 * @since 2.1.0
 */
export default class RendererPipeline {
	/**
	 * @memberof RendererPipeline
	 * @description Game instance
	 * @type Game
	 * @since 2.1.0
	 */
	public game: Game;

	/**
	 * @memberof RendererPipeline
	 * @description The interval that calls RendererPipeline.pool, time: 1000 / this.game.fps
	 * @type unknown
	 * @since 2.1.0
	 */
	public poolInterval: unknown;

	/**
	 * @memberof RendererPipeline
	 * @description The poolStack, contains objects that holds a scene and its renderables
	 * @type Duck.Types.RendererPipeline.PoolStackItem[]
	 * @since 2.1.0
	 */
	public poolStack: Duck.Types.RendererPipeline.PoolStackItem[];

	/**
	 * @memberof RendererPipeline
	 * @description The interval that calls RendererPipeline.updateTime, time: 1000, updates the time that the poolInterval is called for better results
	 * @type unknown
	 * @since 2.1.0
	 */
	protected updateTimeInterval: unknown;

	/**
	 * @constructor RendererPipeline
	 * @description Creates a RendererPipeline instance
	 * @param {Game} game Game instance
	 * @param {number} [poolingInterval= 1000 / game.fps] How often RendererPipeline.pool is called
	 * @since 2.1.0
	 */
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

	/**
	 * @memberof RendererPipeline
	 * @description Pools all visible scenes from the game stack and its renderables
	 * @since 2.1.0
	 */
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
				(r) => r.visible && r.culled
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

	/**
	 * @memberof RendererPipeline
	 * @description Clears the poolInterval and sets the interval again to a more recent time, time: 1000 / game.fps,
	 * gets called automatically every 1000 ms
	 * @since 2.1.0
	 */
	public updateTime() {
		const newInterval = 1000 / this.game.fps;

		clearInterval(this.poolInterval as number);

		this.poolInterval = setInterval(() => {
			this.pool();
		}, newInterval);
	}
}
