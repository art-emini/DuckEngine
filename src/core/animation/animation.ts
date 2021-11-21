import { Duck } from '../..';
import Timer from '../../base/timer';
import Game from '../game';
import Sprite from '../gameobjects/sprite';
import Scene from '../scene';
import AnimationFrame from './animationFrame';

/**
 * @class Animation
 * @classdesc Creates a DuckEngine Animation
 * @description The Animation Class. An animation of frames that are used for Sprites
 * @since 2.0.0
 */
export default class Animation {
	/**
	 * @memberof Animation
	 * @description A name/key for the Animation, used by AnimationManager to play the animation
	 * @type string
	 * @since 2.0.0
	 */
	public readonly key: string;

	/**
	 * @memberof Animation
	 * @description Configuration for the Animation, changing this has no effect, instead change the values of the Animation.<prop>
	 * @type Duck.Types.Animation.Config
	 * @since 2.0.0
	 */
	public config: Duck.Types.Animation.Config;

	/**
	 * @memberof Animation
	 * @description Game instance
	 * @type Game
	 * @since 2.0.0
	 */
	public game: Game;

	/**
	 * @memberof Animation
	 * @description Scene instance
	 * @type Scene
	 * @since 2.0.0
	 */
	public scene: Scene;

	/**
	 * @memberof Animation
	 * @description Sprite that the animation is attached to
	 * @type Sprite
	 * @since 2.0.0
	 */
	public sprite: Sprite;

	/**
	 * @memberof Animation
	 * @description What the internal timers count by, defaults to the game delta time so that it can be used in the Scene.update loop
	 * @type number
	 * @since 2.0.0
	 */
	public countBy: number;

	/**
	 * @memberof Animation
	 * @description The amount of times the animation repeats, modified from config so that it would work with the internal Timers
	 * @type number
	 * @since 2.0.0
	 */
	public repeat: number;

	/**
	 * @memberof Animation
	 * @description The current amount of times an animation played/repeated
	 * @type number
	 * @since 2.0.0
	 */
	public repeatCounter: number;

	/**
	 * @memberof Animation
	 * @description An array of AnimationFrames generated from Duck.Types.Animation.FrameBase array in config
	 * @type AnimationFrame[]
	 * @since 2.0.0
	 */
	public frames: AnimationFrame[];

	/**
	 * @memberof Animation
	 * @description The same as Animation#AnimationFrames but reversed
	 * @type AnimationFrame[];
	 * @since 2.0.0
	 */
	public reversedFrames: AnimationFrame[];

	/**
	 * @memberof Animation
	 * @description An internal Timer that is used for counting and playing an AnimationFrame normally
	 * @type Timer
	 * @since 2.0.0
	 */
	public animationNormalTimer: Timer;

	/**
	 * @memberof Animation
	 * @description An internal Timer that is used for counting and playing an AnimationFrame reversely
	 * @type Timer
	 * @since 2.0.0
	 */
	public animationReverseTimer: Timer;

	/**
	 * @memberof Animation
	 * @description An internal Timer that is used for counting and delaying before playing the Animation, undefined
	 * if Config.delay is not a number
	 * @type Timer | undefined
	 * @since 2.0.0
	 */
	public delayTimer: Timer | undefined;

	/**
	 * @memberof Animation
	 * @description The current index of the Animation#frames or Animation#reversedFrames
	 * @type number
	 * @since 2.0.0
	 */
	public currentIndex: number;

	/**
	 * @memberof Animation
	 * @description The current frame being played
	 * @type AnimationFrame
	 * @since 2.0.0
	 */
	public currentFrame: AnimationFrame;

	/**
	 * @constructor Animation
	 * @description Creates an Animation instance
	 * @param {Duck.Types.Animation.Config} config Animation configuration
	 * @param {Game} game Game instance
	 * @param {Scene} scene Scene instance
	 * @param {Sprite} sprite Sprite that the Animation is attached to
	 * @since 2.0.0
	 */
	constructor(
		config: Duck.Types.Animation.Config,
		game: Game,
		scene: Scene,
		sprite: Sprite
	) {
		this.key = config.key;
		this.config = config;
		this.game = game;
		this.scene = scene;
		this.sprite = sprite;

		this.countBy = this.config.useDelta
			? this.game.deltaTime
			: 1000 / this.config.frameRate;

		this.repeat = this.config.repeat || 1;
		this.repeatCounter = 0;
		this.frames = this.createFrames();
		this.reversedFrames = this.frames.slice().reverse();

		this.animationNormalTimer = new Timer(
			1000 / this.config.frameRate,
			() => {
				this.normalStep(this);
			},
			[],
			this.frames.length * this.repeat
		);
		this.animationReverseTimer = new Timer(
			1000 / this.config.frameRate,
			() => {
				this.reverseStep(this);
			},
			[],
			this.reversedFrames.length * this.repeat
		);

		if (this.config.delay) {
			this.delayTimer = new Timer(
				this.config.delay,
				() => undefined,
				[],
				1
			);
		}

		this.currentIndex = 0;
		this.currentFrame = this.frames[this.currentIndex];
	}

	protected createFrames() {
		const res: AnimationFrame[] = [];
		for (let i = 0; i < this.config.frames.length; i++) {
			const frameBase = this.config.frames[i];
			res.push(
				new AnimationFrame(frameBase.col, frameBase.row, this.sprite)
			);
		}
		return res;
	}

	protected normalStep(self: Animation) {
		if (self.currentIndex < self.frames.length - 1) {
			self.currentIndex += 1;
			self.currentFrame = self.frames[self.currentIndex];
			self.currentFrame.set();
		} else {
			self.repeatCounter += 1;
			if (self.config.yoyo) {
				self.stop();
				self.playReverse();
			} else if (self.repeatCounter < self.repeat) {
				self.currentIndex = 0;
				self.currentFrame = self.frames[self.currentIndex];
				self.currentFrame.set();
			}
		}
	}

	protected reverseStep(self: Animation) {
		if (self.currentIndex < self.reversedFrames.length - 1) {
			self.currentIndex += 1;
			self.currentFrame = self.reversedFrames[self.currentIndex];
			self.currentFrame.set();
		} else {
			self.repeatCounter += 1;
			if (self.config.yoyo) {
				self.stopReverse();
				self.play();
			} else if (self.repeatCounter < self.repeat) {
				self.currentIndex = 0;
				self.currentFrame = self.frames[self.currentIndex];
				self.currentFrame.set();
			}
		}
	}

	/**
	 * @memberof Animation
	 * @description Sets the repeat amount of the internal normal timer
	 * @param {number} repeat Repeat amount
	 * @since 2.0.0
	 */
	public setRepeat(repeat: number) {
		this.repeat = repeat;
		this.animationNormalTimer.repeat = this.repeat;
	}

	/**
	 * @memberof Animation
	 * @description Sets the repeat amount of the internal reverse timer
	 * @param {number} repeat Repeat amount
	 * @since 2.0.0
	 */
	public setRepeatReverse(repeat: number) {
		this.repeat = repeat;
		this.animationReverseTimer.repeat = this.repeat;
	}

	/**
	 * @memberof Animation
	 * @description Plays the Animation using the internal normal timer
	 * @since 2.0.0
	 */
	public play() {
		this.countBy = this.config.useDelta
			? this.game.deltaTime
			: 1000 / this.config.frameRate;

		if (this.delayTimer) {
			this.delayTimer.count(this.countBy);
			if (this.delayTimer.done) {
				this.animationNormalTimer.count(this.countBy);
			}
		} else {
			this.animationNormalTimer.count(this.countBy);
		}
	}

	/**
	 * @memberof Animation
	 * @description Plays the Animation using the internal reverse timer
	 * @since 2.0.0
	 */
	public playReverse() {
		this.countBy = this.config.useDelta
			? this.game.deltaTime
			: 1000 / this.config.frameRate;

		if (this.delayTimer) {
			this.delayTimer.count(this.countBy);
			if (this.delayTimer.done) {
				this.animationReverseTimer.count(this.countBy);
			}
		} else {
			this.animationReverseTimer.count(this.countBy);
		}
	}

	/**
	 * @memberof Animation
	 * @description Pauses the Animation using the internal normal timer
	 * @since 2.0.0
	 */
	public pause() {
		this.animationNormalTimer.pause();
	}

	/**
	 * @memberof Animation
	 * @description Pauses the Animation using the internal reverse timer
	 * @since 2.0.0
	 */
	public pauseReverse() {
		this.animationReverseTimer.pause();
	}

	/**
	 * @memberof Animation
	 * @description REsumes the Animation using the internal normal timer
	 * @since 2.0.0
	 */
	public resume() {
		this.animationNormalTimer.resume();
	}

	/**
	 * @memberof Animation
	 * @description Resumes the Animation using the internal reverse timer
	 * @since 2.0.0
	 */
	public resumeReverse() {
		this.animationReverseTimer.resume();
	}

	/**
	 * @memberof Animation
	 * @description Stops/Cancels the Animation using the internal normal timer
	 * @since 2.0.0
	 */
	public stop() {
		this.animationNormalTimer.stop();
	}

	/**
	 * @memberof Animation
	 * @description Stops/Cancels the Animation using the internal reverse timer
	 * @since 2.0.0
	 */
	public stopReverse() {
		this.animationReverseTimer.stop();
	}

	/**
	 * @memberof Animation
	 * @description Restarts the Animation using the internal normal timer
	 * @since 2.0.0
	 */
	public restart() {
		this.animationNormalTimer.reset();
	}

	/**
	 * @memberof Animation
	 * @description Restarts the Animation using the internal reverse timer
	 * @since 2.0.0
	 */
	public restartReverse() {
		this.animationReverseTimer.reset();
	}
}
