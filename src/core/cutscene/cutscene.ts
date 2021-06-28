/* eslint-disable @typescript-eslint/ban-types */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Game from '../game';

export default class Cutscene {
	private config: Duck.Cutscene.Config;
	private instructions: Duck.Cutscene.Instructions;
	private game: Game;

	private steps: Duck.Cutscene.Step[];
	private mainObject: Duck.GameObject;
	private otherObjects: Duck.GameObject[];
	private camera: Camera;
	private otherCameras: Camera[];

	public index: number;

	public running: boolean;

	private listeners: Duck.Cutscene.OnListener[];

	constructor(
		config: Duck.Cutscene.Config,
		instructions: Duck.Cutscene.Instructions,
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

		this.listeners = [];

		this.init();
	}

	private init() {
		this.mainObject.x = this.instructions.init.mainObjectPos.x;
		this.mainObject.y = this.instructions.init.mainObjectPos.y;

		this.otherObjects.forEach((otherObject, index) => {
			otherObject.x = this.instructions.init.otherObjectPos[index].x;
			otherObject.y = this.instructions.init.otherObjectPos[index].y;
		});
	}

	public start() {
		this.running = true;

		const cb = this.listeners.find((l) => l.type === 'START');
		if (cb) {
			cb.func();
		}
	}

	public stop() {
		this.running = false;

		const cb = this.listeners.find((l) => l.type === 'END');
		if (cb) {
			cb.func();
		}
	}

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
				this.camera.follow(
					this.instructions.init.cameraSettings.follow
				);
			}

			// steps
			const step = this.steps[this.index];

			if (step.type === 'DRAW' && step.affect) {
				return (step.affect as Duck.GameObject).draw();
			}

			if (step.type === 'MOVE' && step.moveTo) {
				if (step.moveTo.x) {
					(step.affect as Duck.GameObject).x = step.moveTo.x;
				}
				if (step.moveTo.y) {
					(step.affect as Duck.GameObject).y = step.moveTo.y;
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

			if (step.moveTo) {
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
		}
	}

	public next() {
		this.index++;
		if (this.index > this.steps.length - 1) {
			this.stop();
		}

		const cb = this.listeners.find((l) => l.type === 'NEXT');
		if (cb) {
			cb.func();
		}
	}

	public async sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public on(type: Duck.Cutscene.OnListenerType, cb: Function) {
		this.listeners.push({
			type: type,
			func: cb,
		});
		if (this.game.config.debug) {
			new Debug.Log('Added Event Listener to cutscene.');
		}
	}

	public off(type: Duck.Cutscene.OnListenerType) {
		const found = this.listeners.find((l) => l.type === type);
		if (found) {
			this.listeners.splice(this.listeners.indexOf(found), 1);
		} else {
			new Debug.Error(
				'Cannot Remove Cutscene listener that does not exist.'
			);
		}
	}
}
