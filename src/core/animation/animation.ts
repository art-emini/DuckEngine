import { Duck } from '../..';
import Timer from '../../base/timer';
import Game from '../game';
import SpriteSheet from '../gameobjects/spritesheet';
import Scene from '../scene';
import AnimationFrame from './animationFrame';

export default class Animation {
	public readonly key: string;
	public config: Duck.Types.Animation.Config;
	public game: Game;
	public scene: Scene;
	public spritesheet: SpriteSheet;

	public repeat: number;
	public frames: AnimationFrame[];
	public reversedFrames: AnimationFrame[];

	public animationNormalTimer: Timer;
	public animationReverseTimer: Timer;

	public delayTimer: Timer | undefined;

	public currentIndex: number;
	public currentFrame: AnimationFrame;

	constructor(
		config: Duck.Types.Animation.Config,
		game: Game,
		scene: Scene,
		spritesheet: SpriteSheet
	) {
		this.key = config.key;
		this.config = config;
		this.game = game;
		this.scene = scene;
		this.spritesheet = spritesheet;

		this.repeat = this.config.repeat || 1;
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

		if (this.config.autoplay) {
			this.play();
		}
	}

	protected createFrames() {
		const res: AnimationFrame[] = [];
		for (let i = 0; i < this.config.frames.length; i++) {
			const frameBase = this.config.frames[i];
			res.push(
				new AnimationFrame(
					frameBase.col,
					frameBase.row,
					this.spritesheet
				)
			);
		}
		return res;
	}

	protected normalStep(self: Animation) {
		if (self.currentIndex < self.frames.length - 1) {
			self.currentIndex += 1;
			self.currentFrame = self.frames[this.currentIndex];
			self.currentFrame.set();
		} else {
			if (self.config.yoyo) {
				self.stop();
				self.playReverse();
			}
		}
	}

	protected reverseStep(self: Animation) {
		if (self.currentIndex < self.reversedFrames.length - 1) {
			self.currentIndex += 1;
			self.currentFrame = self.reversedFrames[this.currentIndex];
			self.currentFrame.set();
		} else {
			if (self.config.yoyo) {
				self.stopReverse();
				self.play();
			}
		}
	}

	public setRepeat(repeat: number) {
		this.repeat = repeat;
		this.animationNormalTimer.repeat = this.repeat;
	}

	public setRepeatReverse(repeat: number) {
		this.repeat = repeat;
		this.animationReverseTimer.repeat = this.repeat;
	}

	public play() {
		if (this.delayTimer) {
			this.delayTimer.count(this.game.deltaTime);
			if (this.delayTimer.done) {
				this.animationNormalTimer.count(this.game.deltaTime);
			}
		} else {
			this.animationNormalTimer.count(this.game.deltaTime);
		}
	}

	public playReverse() {
		if (this.delayTimer) {
			this.delayTimer.count(this.game.deltaTime);
			if (this.delayTimer.done) {
				this.animationReverseTimer.count(this.game.deltaTime);
			}
		} else {
			this.animationReverseTimer.count(this.game.deltaTime);
		}
	}

	public pause() {
		this.animationNormalTimer.pause();
	}

	public pauseReverse() {
		this.animationReverseTimer.pause();
	}

	public resume() {
		this.animationNormalTimer.resume();
	}

	public resumeReverse() {
		this.animationReverseTimer.resume();
	}

	public stop() {
		this.animationNormalTimer.stop();
	}

	public stopReverse() {
		this.animationReverseTimer.stop();
	}

	public restart() {
		this.animationNormalTimer.reset();
	}

	public restartReverse() {
		this.animationReverseTimer.reset();
	}
}
