import Game from '../core/game';

export default class Amount {
	private func: (currentCount: number) => void;
	public reachedMaxAmount: boolean;
	private game: Game;

	public currentCount: number;
	public readonly maxAmount: number;

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

	public run() {
		if (this.currentCount < this.maxAmount) {
			this.currentCount += 1;
			this.func(this.currentCount);
		} else {
			this.reachedMaxAmount = true;
		}
	}

	public reset() {
		this.currentCount = 0;
		this.reachedMaxAmount = false;
	}

	public set state(currentCount: number) {
		this.currentCount = currentCount;
	}
}
