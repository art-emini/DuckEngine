import { Duck } from '../..';
import Game from '../game';
import SpriteSheet from '../gameobjects/spritesheet';
import Scene from '../scene';
import Animation from './animation';
import StateMachine from './stateMachine';

export default class AnimationManager {
	public game: Game;
	public scene: Scene;
	public spritesheet: SpriteSheet;

	public animations: Animation[];

	public currentAnimation: Animation;

	constructor(
		game: Game,
		scene: Scene,
		spritesheet: SpriteSheet,
		defaultAnimation: Duck.Types.Animation.Config
	) {
		this.game = game;
		this.scene = scene;
		this.spritesheet = spritesheet;

		this.animations = [];

		this.currentAnimation = this.add(defaultAnimation);
	}

	public createStateMachine(
		config: Duck.Types.StateMachine.Config,
		animations: Animation[]
	) {
		return new StateMachine(config, animations);
	}

	public setCurrentAnimation(key: string) {
		this.currentAnimation = this.get(key) as Animation;
	}

	public add(config: Duck.Types.Animation.Config) {
		const anim = new Animation(
			config,
			this.game,
			this.scene,
			this.spritesheet
		);

		this.animations.push(anim);

		return anim;
	}

	public remove(key: string) {
		const anim = this.get(key);

		if (anim) {
			this.animations.splice(this.getIndex(key));
		}
	}

	public get(key: string) {
		return this.animations.find((anim) => anim.key === key);
	}

	public getIndex(key: string) {
		return this.animations.findIndex((anim) => anim.key === key);
	}

	public clear() {
		this.animations = [];
	}

	public setRepeat(repeat: number) {
		this.currentAnimation.setRepeat(repeat);
	}

	public setRepeatReverse(repeat: number) {
		this.currentAnimation.setRepeatReverse(repeat);
	}

	public play() {
		this.currentAnimation.play();
	}

	public playReverse() {
		this.currentAnimation.playReverse();
	}

	public pause() {
		this.currentAnimation.pause();
	}

	public pauseReverse() {
		this.currentAnimation.pause();
	}

	public resume() {
		this.currentAnimation.resume();
	}

	public resumeReverse() {
		this.currentAnimation.resumeReverse();
	}

	public stop() {
		this.currentAnimation.stop();
	}

	public stopReverse() {
		this.currentAnimation.stopReverse();
	}

	public restart() {
		this.currentAnimation.restart();
	}

	public restartReverse() {
		this.currentAnimation.restartReverse();
	}
}
