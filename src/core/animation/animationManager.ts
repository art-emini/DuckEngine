import { Duck } from '../..';
import Game from '../game';
import Sprite from '../gameobjects/sprite';
import Scene from '../scene';
import Animation from './animation';
import StateMachine from './stateMachine';

export default class AnimationManager {
	/**
	 * @memberof AnimationManager
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof AnimationManager
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof AnimationManager
	 * @description Sprite that the AnimationManager is attached to
	 * @type Sprite
	 * @since 2.0.0
	 */
	public sprite: Sprite;

	/**
	 * @memberof AnimationManager
	 * @description Animations that are registered and added to the AnimationManager
	 * @type Animation[]
	 * @since 2.0.0
	 */
	public animations: Animation[];

	/**
	 * @memberof AnimationManager
	 * @description The current selected animation, last played or currently playing
	 * @type Animation
	 * @since 2.0.0
	 */
	public currentAnimation: Animation;

	/**
	 * @constructor AnimationManager
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {Sprite} sprite Sprite that the AnimationManager is attached to
	 * @param {Duck.Types.Animation.Config} defaultAnimation Configuration to make a default animation of the Sprite
	 * @since 2.0.0
	 */
	constructor(
		game: Game,
		scene: Scene,
		sprite: Sprite,
		defaultAnimation: Duck.Types.Animation.Config
	) {
		this.game = game;
		this.scene = scene;
		this.sprite = sprite;

		this.animations = [];

		this.currentAnimation = this.add(defaultAnimation);
	}

	/**
	 * @memberof AnimationManager
	 * @description Creates a StateMachine
	 * @param {Duck.Types.StateMachine.Config} config StateMachine config
	 * @param {Animation[]} animations Animations to add to the StateMachine
	 * @returns {StateMachine}
	 * @since 2.0.0
	 */
	public createStateMachine(
		config: Duck.Types.StateMachine.Config,
		animations: Animation[]
	) {
		return new StateMachine(config, animations);
	}

	/**
	 * @memberof AnimationManager
	 * @description Sets the current animation
	 * @param {string} key Key of the Animation to set as the currentAnimation
	 * @since 2.0.0
	 */
	public setCurrentAnimation(key: string) {
		this.currentAnimation = this.get(key) as Animation;
	}

	/**
	 * @memberof AnimationManager
	 * @description Adds and creates a new Animation
	 * @param {string} key Key of the Animation to set as the currentAnimation
	 * @returns {Animation}
	 * @since 2.0.0
	 */
	public add(config: Duck.Types.Animation.Config) {
		const anim = new Animation(config, this.game, this.scene, this.sprite);

		this.animations.push(anim);

		return anim;
	}

	/**
	 * @memberof AnimationManager
	 * @description Removes an Animation from the array of animations (AnimationManager#animations)
	 * @param {string} key Key of the Animation to remove
	 * @since 2.0.0
	 */
	public remove(key: string) {
		const anim = this.get(key);

		if (anim) {
			this.animations.splice(this.getIndex(key));
		}
	}

	/**
	 * @memberof AnimationManager
	 * @description Finds and returns an Animation from the array of animations (AnimationManager#animations)
	 * @param {string} key Key of the Animation find
	 * @returns {Animation | undefined}
	 * @since 2.0.0
	 */
	public get(key: string) {
		return this.animations.find((anim) => anim.key === key);
	}

	/**
	 * @memberof AnimationManager
	 * @description Finds and returns the index of an Animation from the array of animations (AnimationManager#animations)
	 * @param {string} key Key of the Animation find the index of
	 * @returns {number}
	 * @since 2.0.0
	 */
	public getIndex(key: string) {
		return this.animations.findIndex((anim) => anim.key === key);
	}

	/**
	 * @memberof AnimationManager
	 * @description Clears all animations
	 * @since 2.0.0
	 */
	public clear() {
		this.animations = [];
	}

	/**
	 * @memberof AnimationManager
	 * @description Sets the current animation repeat
	 * @param {number} repeat
	 * @since 2.0.0
	 */
	public setRepeat(repeat: number) {
		this.currentAnimation.setRepeat(repeat);
	}

	/**
	 * @memberof AnimationManager
	 * @description Sets the current animation reversed repeat
	 * @param {number} repeat
	 * @since 2.0.0
	 */
	public setRepeatReverse(repeat: number) {
		this.currentAnimation.setRepeatReverse(repeat);
	}

	/**
	 * @memberof AnimationManager
	 * @description Plays the current animation normally
	 * @since 2.0.0
	 */
	public play() {
		this.currentAnimation.play();
	}

	/**
	 * @memberof AnimationManager
	 * @description Plays the current animation reversely
	 * @since 2.0.0
	 */
	public playReverse() {
		this.currentAnimation.playReverse();
	}

	/**
	 * @memberof AnimationManager
	 * @description Pauses the current animation normally
	 * @since 2.0.0
	 */
	public pause() {
		this.currentAnimation.pause();
	}

	/**
	 * @memberof AnimationManager
	 * @description Pauses the current animation reversely
	 * @since 2.0.0
	 */
	public pauseReverse() {
		this.currentAnimation.pause();
	}

	/**
	 * @memberof AnimationManager
	 * @description Resumes the current animation normally
	 * @since 2.0.0
	 */
	public resume() {
		this.currentAnimation.resume();
	}

	/**
	 * @memberof AnimationManager
	 * @description Resumes the current animation reversely
	 * @since 2.0.0
	 */
	public resumeReverse() {
		this.currentAnimation.resumeReverse();
	}

	/**
	 * @memberof AnimationManager
	 * @description Stops the current animation normally
	 * @since 2.0.0
	 */
	public stop() {
		this.currentAnimation.stop();
	}

	/**
	 * @memberof AnimationManager
	 * @description Stops the current animation reversely
	 * @since 2.0.0
	 */
	public stopReverse() {
		this.currentAnimation.stopReverse();
	}

	/**
	 * @memberof AnimationManager
	 * @description Restarts the current animation normally
	 * @since 2.0.0
	 */
	public restart() {
		this.currentAnimation.restart();
	}

	/**
	 * @memberof AnimationManager
	 * @description Restarts the current animation reversely
	 * @since 2.0.0
	 */
	public restartReverse() {
		this.currentAnimation.restartReverse();
	}
}
