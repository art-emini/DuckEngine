/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * @class Render
 * @classdesc Creates a DuckEngine Render base class
 * @description The Render Class. Base class that DuckEngine Scene extends
 * @since 1.0.0-beta
 */
export default class Render {
	/**
	 * @memberof Render
	 * @description Preloads assets, gets called before DuckEngine loads
	 * @since 2.0.0
	 */
	public async preload() {}

	/**
	 * @memberof Render
	 * @description Creates objects, put all your Scene.add calls in here, gets after preload
	 * @since 2.0.0
	 */
	public create() {}

	/**
	 * @memberof Render
	 * @description Updates everything in method, gets called **second** in the Game loop
	 * @param {number} deltaTime Time since the last frame
	 * @since 1.0.0-beta
	 */
	public update(deltaTime: number) {}

	/**
	 * @memberof Render
	 * @description Gets called on scene switch to this scene
	 * @deprecated Set the Scene.onActive property instead
	 *
	 * **THIS WILL BE REMOVED IN 3.0.0**
	 *
	 * @since 1.0.0-beta
	 */
	public onChange() {}
}
