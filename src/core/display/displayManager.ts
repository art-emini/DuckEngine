import { Duck } from '../..';
import dprScale from '../../helper/dprScale';
import Debug from '../debug/debug';
import EventEmitter from '../events/eventEmitter';
import EVENTS from '../events/events';
import Game from '../game';

export default class DisplayManager {
	public game: Game;
	public eventEmitter: EventEmitter;

	constructor(game: Game) {
		this.game = game;
		this.eventEmitter = new EventEmitter();

		/* Event Listeners */

		// blur and focus listener
		window.onfocus = () => {
			if (
				this.game.config.pauseRenderingOnBlur &&
				!this.game.config.debugRendering
			) {
				this.game.isRendering = true;
				this.eventEmitter.emit(EVENTS.DISPLAY.FOCUS);
				if (this.game.config.onResumeRendering) {
					this.game.config.onResumeRendering('windowFocus');
				}
			}
		};
		window.onblur = () => {
			if (
				this.game.config.pauseRenderingOnBlur &&
				!this.game.config.debugRendering
			) {
				this.game.isRendering = false;
				this.eventEmitter.emit(EVENTS.DISPLAY.BLUR);
				if (this.game.config.onPauseRendering) {
					this.game.config.onPauseRendering('windowBlur');
				}
			}
		};

		if (this.game.config.focus) {
			window.focus();
			if (this.game.config.onResumeRendering) {
				this.game.config.onResumeRendering('gameConfigFocus');
			}
		}

		if (this.game.config.blur) {
			window.blur();
			if (this.game.config.onPauseRendering) {
				this.game.config.onPauseRendering('gameConfigBlur');
			}
		}
	}

	public scale(scale: Duck.Types.Math.Vector2LikeOptional) {
		if (scale.x) {
			this.game.canvas.width = scale.x;
		}

		if (scale.y) {
			this.game.canvas.height = scale.y;
		}
	}

	public dprScale() {
		dprScale(
			this.game.canvas,
			this.game.renderer.ctx,
			window.innerWidth,
			window.innerHeight
		);
	}

	public smallCorrectionScale() {
		if (this.game.canvas.width > window.innerWidth) {
			this.game.canvas.width = window.innerWidth;
		} else {
			this.game.canvas.width = this.game.oldWidth;
		}

		if (this.game.canvas.height > window.innerHeight) {
			this.game.canvas.height = window.innerHeight;
		} else {
			this.game.canvas.height = this.game.oldHeight;
		}
	}

	public scaleAspectRatio(maxScale: Duck.Types.Math.Vector2Like) {
		const width = this.game.canvas.width;
		const height = this.game.canvas.height;
		let ratio = 0;

		if (width > maxScale.x && width > height) {
			ratio = width / height;
			this.game.canvas.width = maxScale.x;
			this.game.canvas.height = maxScale.x / ratio;
		} else if (height > maxScale.y && height > width) {
			ratio = height / width;
			this.game.canvas.width = maxScale.y / ratio;
			this.game.canvas.height = maxScale.y;
		} else {
			this.game.canvas.width = maxScale.x;
			this.game.canvas.height = maxScale.y;
		}
	}

	public scaleToWindow() {
		if (window.devicePixelRatio === 1) {
			this.game.canvas.width = window.innerWidth;
			this.game.canvas.height = window.innerHeight;
			return;
		}

		if (this.game.config.dprScale && window.devicePixelRatio !== 1) {
			this.dprScale();
			if (this.game.config.debug) {
				new Debug.Log(
					`Scaled with devicePixelRatio of ${window.devicePixelRatio} while fullscreen.`
				);
			}
		}

		this.eventEmitter.emit(EVENTS.DISPLAY.SET_SCALE, {
			w: window.innerWidth,
			h: window.innerHeight,
		});
	}

	public resetScale() {
		if (window.devicePixelRatio === 1) {
			this.game.canvas.width = this.game.oldWidth;
			this.game.canvas.height = this.game.oldHeight;
			this.game.canvas.style.width = this.game.oldWidth + 'px';
			this.game.canvas.style.height = this.game.oldHeight + 'px';
		}

		if (this.game.config.dprScale && window.devicePixelRatio !== 1) {
			dprScale(
				this.game.canvas,
				this.game.renderer.ctx,
				this.game.canvas.width,
				this.game.canvas.height
			);
		}
	}

	public fullscreen() {
		if (this.game.canvas && document.fullscreenEnabled) {
			this.game.canvas
				.requestFullscreen()
				.then(() => {
					this.game.isInFullscreen = true;
					if (this.game.canvas) {
						this.scaleToWindow();
					}

					this.eventEmitter.emit(EVENTS.DISPLAY.FULLSCREEN);
				})
				.catch(
					() =>
						new Debug.Error(
							'User must interact with the page before fullscreen API can be used.'
						)
				);

			// on un fullscreen
			this.game.canvas.onfullscreenchange = () => {
				if (!document.fullscreenElement) {
					this.resetScale();
					this.game.isInFullscreen = false;
					if (this.game.config.debug) {
						new Debug.Log('Unfullscreen, reset canvas scale.');
					}
				}
			};
		}

		if (!document.fullscreenEnabled) {
			new Debug.Warn(
				'Fullscreen is not supported/enabled on this browser.'
			);
		}
	}

	public unfullscreen() {
		if (document.fullscreenElement) {
			document
				.exitFullscreen()
				.then(() => {
					if (this.game.canvas) {
						this.resetScale();
					}

					this.eventEmitter.emit(EVENTS.DISPLAY.UNFULLSCREEN);
				})
				.catch((e) => new Debug.Error(e));
		}
	}
}
