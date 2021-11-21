/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Timer {
	public seconds: number;
	public cb: (...args: any[]) => any;
	public args: any[];
	public repeat: number;

	public counter: number;
	public repeatCounter: number;

	public done: boolean;

	constructor(
		ms: number,
		cb: (...args: any[]) => any,
		args: any[],
		repeat: number
	) {
		this.seconds = ms / 1000;
		this.cb = cb;
		this.repeat = repeat - 1;

		this.counter = 0;
		this.repeatCounter = 0;

		this.done = false;

		this.args = args;
	}

	public count(delta: number) {
		if (this.done) {
			return;
		}

		if (this.counter < this.seconds) {
			// normal count
			this.counter += delta;
			return;
		}

		if (this.repeatCounter < this.repeat) {
			// repeat
			this.repeatCounter++;
			this.counter = 0;
			this.cb(...this.args, this.counter, this.repeatCounter, this.done);
			return;
		}

		if (this.counter > this.seconds) {
			// done
			this.done = true;
			this.cb(...this.args, this.counter, this.repeatCounter, this.done);
			return;
		}
	}

	public stop() {
		this.done = true;
	}

	public reset() {
		this.done = false;
		this.counter = 0;
		this.repeatCounter = 0;
	}

	public pause() {
		this.done = true;
	}
	public resume() {
		this.done = true;
	}
}
