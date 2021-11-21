import Game from '../core/game';

/**
 * @class Amount
 * @classdesc Creates a DuckEngine Amount
 * @description The Amount Class. A tool that can run a function a max amount of times even if it is in a loop
 * @since 1.1.0
 */
export default class Amount {
	protected func: (currentCount: number) => void;
	public reachedMaxAmount: boolean;
	public game: Game;

	public currentCount: number;
	public readonly maxAmount: number;

	/**
	 * @constructor
	 * @description Creates an Amount instance.
	 * @param {(currentCount: number) => void} func Callback function
	 * @param {number} maxAmount Max amount of times the function can be called
	 * @param {Game} game Game instance
	 * @param {boolean} [run] Determines if function is run as soon as Amount class is constructed
	 * @since 1.1.0
	 */
	constructor(
		func: (currentCount: number) => void,
		maxAmount: number,
		game: Game,
		run?: boolean
	) {
		this.func = func;
		this.reachedMaxAmount = false;
		this.game = game;

		this.currentCount = 0;
		this.maxAmount = maxAmount;

		if (run) {
			this.run();
		}
	}

	/**
	 * @memberof Amount
	 * @description Runs the function once if amount of times ran is not over the maxAmount
	 * @since 1.1.0
	 */
	public run() {
		if (this.currentCount < this.maxAmount) {
			this.currentCount += 1;
			this.func(this.currentCount);
		} else {
			this.reachedMaxAmount = true;
		}
	}

	/**
	 * @memberof Amount
	 * @description Resets the amount of times ran
	 * @since 1.1.0
	 */
	public reset() {
		this.currentCount = 0;
		this.reachedMaxAmount = false;
	}

	/**
	 * @memberof Amount
	 * @description Sets the amount of times ran
	 * @param {number} currentCount Number of times ran
	 * @since 1.1.0
	 */
	public set state(currentCount: number) {
		this.currentCount = currentCount;
	}
}
