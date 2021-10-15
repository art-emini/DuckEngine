import { Duck } from '../../index';
import Game from '../game';
import randomInt from '../math/randomInt';
import ParticleEmitter from '../particles/particleEmitter';

/**
 * @class Effect
 * @classdesc Creates a DuckEngine Effect
 * @description The Effect Class. Store a particleEmitter instance and particles that can be run easily
 * @since 1.2.0
 */
export default class Effect {
	public readonly id: number;
	public rangeX: Duck.Types.ParticleEmitter.Range;
	public rangeY: Duck.Types.ParticleEmitter.Range;
	public particleEmitter: ParticleEmitter;
	public game: Game;

	public visible: boolean;
	public zIndex: number;

	public following: Duck.GameObjects.GameObject | undefined;
	protected randomMaxOffset: number;
	/**
	 * @constructor
	 * @description Creates an Effect instance.
	 * @param {Duck.Types.ParticleEmitter.Range} rangeX A range of 2 numbers to determine the new created particles x position
	 * @param {Duck.Types.ParticleEmitter.Range} rangeY A range of 2 numbers to determine the new created particles y position
	 * @param {ParticleEmitter} particleEmitter ParticleEmitter instance
	 * @param {Game} game Game instance
	 * @since 1.2.0
	 */
	constructor(
		rangeX: Duck.Types.ParticleEmitter.Range,
		rangeY: Duck.Types.ParticleEmitter.Range,
		particleEmitter: ParticleEmitter,
		game: Game
	) {
		this.id = randomInt(0, 100000);
		this.rangeX = rangeX;
		this.rangeY = rangeY;
		this.particleEmitter = particleEmitter;
		this.game = game;

		this.visible = true;
		this.zIndex = 2;

		this.particleEmitter.rangeX = rangeX;
		this.particleEmitter.rangeY = rangeY;

		this.following;
		this.randomMaxOffset = 5;
	}

	/**
	 * @memberof Effect
	 * @description Makes the particleEmitter emit
	 * @since 1.2.0
	 */
	public emit() {
		this.particleEmitter.emit();
	}

	/**
	 * @memberof Effect
	 * @description Stops the particleEmitter emitting
	 * @since 1.2.0
	 */
	public stopEmit() {
		this.particleEmitter.stopEmit();
	}

	/**
	 * @memberof Effect
	 * @description Makes the particleEmitter emit for a duration
	 * @param {number} ms Duration in milliseconds
	 * @since 1.2.0
	 */
	public emitFor(ms: number) {
		this.particleEmitter.emitFor(ms);
	}

	/**
	 * @description Draws the effect.
	 *
	 * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
	 *
	 */
	public _draw() {
		if (this.following) {
			const rangeX: Duck.Types.ParticleEmitter.Range = [
				this.following.position.x,
				this.following.position.x + this.randomMaxOffset,
			];
			const rangeY: Duck.Types.ParticleEmitter.Range = [
				this.following.position.y,
				this.following.position.y + this.randomMaxOffset,
			];

			this.particleEmitter.rangeX = rangeX;
			this.particleEmitter.rangeY = rangeY;
		}
	}

	/**
	 * @memberof Effect
	 * @description Makes the effect follow the GameObject
	 * @param {Duck.Types.GameObject} object GameObject to follow
	 * @param {number} [randomMaxOffset] A random offset of the effect relative to the GameObject
	 * @since 1.2.0
	 */
	public follow(object: Duck.Types.GameObject, randomMaxOffset = 5) {
		this.following = object;
		this.randomMaxOffset = randomMaxOffset;
	}

	/**
	 * @memberof Effect
	 * @description Makes the effect stop following the GameObject
	 * @since 1.2.0
	 */
	public stopFollow() {
		this.following = undefined;
	}
}
