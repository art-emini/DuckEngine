/* eslint-disable @typescript-eslint/ban-types */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Game from '../game';

/**
 * @class Cutscene
 * @classdesc Creates a DuckEngine Cutscene
 * @description The Cutscene Class. Create a cutscene
 * @since 1.0.0-beta
 */
export default class Cutscene {
	protected config: Duck.Types.Cutscene.Config;
	protected instructions: Duck.Types.Cutscene.Instructions;
	public game: Game;

	protected steps: Duck.Types.Cutscene.Step[];
	protected mainObject: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>;
	protected otherObjects: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>[];
	protected camera: Camera;
	protected otherCameras: Camera[];

	public index: number;

	public running: boolean;

	/**
	 * @constructor
	 * @description Creates an instance of a Cutscene.
	 * @param {Duck.Types.Cutscene.Config} config Configuration
	 * @param {Duck.Types.Cutscene.Instructions} instructions Cutscene instructions
	 * @param {Game} game
	 * @since 1.0.0-beta
	 */
	constructor(
		config: Duck.Types.Cutscene.Config,
		instructions: Duck.Types.Cutscene.Instructions,
		game: Game
	) {
		this.config = config;
		this.instructions = instructions;
		this.game = game;

		this.steps = this.instructions.steps;
		this.mainObject = this.config.mainObject;
		this.otherObjects = this.config.otherObjects || [];
		this.camera = this.config.mainCamera;
		this.otherCameras = this.config.otherCameras || [];

		this.index = 0;

		this.running = false;

		this.init();
	}

	protected init() {
		this.mainObject.position.x = this.instructions.init.mainObjectPos.x;
		this.mainObject.position.y = this.instructions.init.mainObjectPos.y;

		this.otherObjects.forEach((otherObject, index) => {
			otherObject.position.x =
				this.instructions.init.otherObjectPos[index].x;
			otherObject.position.y =
				this.instructions.init.otherObjectPos[index].y;
		});
	}

	/**
	 * @memberof Cutscene
	 * @description Starts the cutscene
	 * @since 1.0.0-beta
	 */
	public start() {
		this.running = true;

		this.game.eventEmitter.emit(
			'CUTSCENE_START' as Duck.Types.Cutscene.OnListenerType
		);
	}

	/**
	 * @memberof Cutscene
	 * @description Stops the cutscene
	 * @since 1.0.0-beta
	 */
	public stop() {
		this.running = false;

		this.game.eventEmitter.emit(
			'CUTSCENE_END' as Duck.Types.Cutscene.OnListenerType
		);
	}

	/**
	 * @memberof Cutscene
	 * @description Updates the cutscene, must be in a loop or interval and come before Cutscene.next()
	 * @since 1.0.0-beta
	 */
	public update() {
		if (this.running) {
			// camera
			if (this.instructions.init.cameraSettings) {
				this.camera.setFOV(this.instructions.init.cameraSettings.FOV);
				this.camera.setZoom(this.instructions.init.cameraSettings.zoom);
				if (this.instructions.init.cameraSettings.pos) {
					this.camera.moveTo(
						this.instructions.init.cameraSettings.pos.x,
						this.instructions.init.cameraSettings.pos.y
					);
				}
			}

			if (this.instructions.init.otherCameraSettings) {
				this.otherCameras.forEach((camera, index) => {
					if (this.instructions.init.otherCameraSettings) {
						camera.setFOV(
							this.instructions.init.otherCameraSettings[index]
								.FOV
						);
						camera.setZoom(
							this.instructions.init.otherCameraSettings[index]
								.zoom
						);
						if (
							this.instructions.init.otherCameraSettings[index]
								.pos
						) {
							camera.moveTo(
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								this.instructions.init.otherCameraSettings[
									index
								].pos!.x,
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								this.instructions.init.otherCameraSettings[
									index
								].pos!.y
							);
						}
					}
				});
			}

			// follow
			if (this.instructions.init.cameraSettings?.follow) {
				this.camera.startFollow(
					this.instructions.init.cameraSettings.follow,
					this.instructions.init.cameraSettings.followLerpX,
					this.instructions.init.cameraSettings.followLerpY
				);
			}

			// steps
			const step = this.steps[this.index];

			if (step.type === 'DRAW' && step.affect) {
				return (
					step.affect as Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
				)._draw();
			}

			if (step.type === 'MOVE' && step.moveTo) {
				if (step.moveTo.x) {
					(
						step.affect as Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
					).position.x = step.moveTo.x;
				}
				if (step.moveTo.y) {
					(
						step.affect as Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
					).position.y = step.moveTo.y;
				}
			}

			if (step.type === 'FUNC' && step.func) {
				step.func();
			}

			if (step.type === 'CAMERA_FOV' && step.cameraValue) {
				(step.affect as Camera).setFOV(step.cameraValue);
			}

			if (step.type === 'CAMERA_ZOOM' && step.cameraValue) {
				(step.affect as Camera).setZoom(step.cameraValue);
			}

			if (step.moveTo && step.affect) {
				if (
					step.type === 'CAMERA_MOVE' &&
					step.moveTo.x &&
					step.moveTo.y
				) {
					(step.affect as Camera).moveTo(
						step.moveTo.x,
						step.moveTo.y
					);
				}
			}

			if (
				step.type === 'CAMERA_SHAKE' &&
				step.cameraIntervalMS &&
				step.cameraTimeMS &&
				step.cameraValue &&
				step.affect
			) {
				(step.affect as Camera).shake(
					step.cameraIntervalMS,
					step.cameraTimeMS,
					step.cameraValue
				);
			}

			if (
				step.type === 'CAMERA_START_FOLLOW' &&
				step.cameraFollow &&
				step.affect
			) {
				// no lerp
				if (!step.cameraFollowLerpX && !step.cameraFollowLerpY) {
					(step.affect as Camera).startFollow(step.cameraFollow);
				}
				// only lerpX
				if (step.cameraFollowLerpX && !step.cameraFollowLerpY) {
					(step.affect as Camera).startFollow(
						step.cameraFollow,
						step.cameraFollowLerpX
					);
				}
				// only lerpY
				if (!step.cameraFollowLerpX && step.cameraFollowLerpY) {
					(step.affect as Camera).startFollow(
						step.cameraFollow,
						1,
						step.cameraFollowLerpY
					);
				}
				// lerp both
				if (step.cameraFollowLerpX && step.cameraFollowLerpY) {
					(step.affect as Camera).startFollow(
						step.cameraFollow,
						step.cameraFollowLerpX,
						step.cameraFollowLerpY
					);
				}
			}

			if (step.type === 'CAMERA_STOP_FOLLOW' && step.affect) {
				(step.affect as Camera).stopFollow();
			}
		}
	}

	/**
	 * @memberof Cutscene
	 * @description Starts the next step
	 * @since 1.0.0-beta
	 */
	public next() {
		this.index++;
		if (this.index > this.steps.length - 1) {
			this.stop();
		}

		this.game.eventEmitter.emit('CUTSCENE_NEXT');
	}

	/**
	 * @memberof Cutscene
	 * @description Sleeps/Waits for a duration
	 * @param {number} ms Duration in millisecond
	 * @since 1.0.0-beta
	 */
	public async sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * @memberof Cutscene
	 * @description Adds an event listener to Cutscene
	 * @param {Duck.Types.Cutscene.OnListenerType} type Listener type
	 * @param {(...args: any) => void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public on(
		type: Duck.Types.Cutscene.OnListenerType,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cb: (...args: any) => void
	) {
		this.game.eventEmitter.on(`CUTSCENE_${type}`, cb);
	}

	/**
	 * @memberof Cutscene
	 * @description Removes an event listener from Cutscene
	 * @param {Duck.Types.Cutscene.OnListenerType} type Listener type
	 * @since 1.0.0-beta
	 */
	public off(type: Duck.Types.Cutscene.OnListenerType) {
		this.game.eventEmitter.off(`CUTSCENE_${type}`);
	}
}
