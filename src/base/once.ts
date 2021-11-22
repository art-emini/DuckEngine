/* eslint-disable @typescript-eslint/ban-types */

/**
 * @class Once
 * @classdesc Creates a DuckEngine Once
 * @description The Once Class. A tool that can run a function once even if it is in a loop
 * @since 1.0.0
 */
export default class Once {
	protected func: Function;
	public ran: boolean;

	/**
	 * @constructor
	 * @description Creates a Once instance.
	 * @param {Function} func Function to run on Once.run
	 * @param {boolean} [run] Determines if function is run as soon as Once class is constructed
	 * @since 1.0.0
	 */
	constructor(func: Function, run?: boolean) {
		this.func = func;
		this.ran = false;

		if (run) {
			this.run();
		}
	}

	/**
	 * @memberof Once
	 * @description Runs the function once
	 * @since 1.0.0
	 */
	public run() {
		if (!this.ran) {
			this.func();
			this.ran = true;
		}
	}

	/**
	 * @memberof Once
	 * @description Resets the state and allows the function to be ran again if called
	 * @since 1.0.0
	 */
	public reset() {
		this.ran = false;
	}

	/**
	 * @memberof Once
	 * @description Sets the ran state
	 * @param {boolean} ran Ran state
	 * @since 1.0.0
	 */
	public set state(ran: boolean) {
		this.ran = ran;
	}
}
