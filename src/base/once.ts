/* eslint-disable @typescript-eslint/ban-types */
export default class Once {
	private func: Function;
	public ran: boolean;

	constructor(func: Function, run?: boolean) {
		this.func = func;
		this.ran = false;

		if (run) {
			this.run();
		}
	}

	public run() {
		if (!this.ran) {
			this.func();
			this.ran = true;
		}
	}

	public reset() {
		this.ran = false;
	}

	public set state(ran: boolean) {
		this.ran = ran;
	}
}
