/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EventEmitter {
	public callbacks: { [s: string]: ((...args: any[]) => any)[] } = {};

	public on(event: string, cb: (...args: any) => void) {
		if (!this.callbacks[event]) this.callbacks[event] = [];
		this.callbacks[event].push(cb);
	}

	public off(event: string) {
		if (this.callbacks[event]) {
			this.callbacks[event] = [];
		}
	}

	public emit(event: string, ...args: any) {
		const cbs = this.callbacks[event];
		if (cbs) {
			cbs.forEach((cb) => cb(args));
		}
	}
}
