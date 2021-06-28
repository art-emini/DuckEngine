import { Duck } from '../../index';
import Debug from '../debug/debug';

export default class Sound {
	private path: string;
	private element: HTMLAudioElement;
	private sprites: Duck.Sound.Sprite[];

	constructor(path: string, options?: Duck.Sound.Config) {
		this.path = path;
		this.element = document.createElement('audio');

		this.element.className = 'duckengine-audio-sound';
		this.element.style.display = 'none';
		this.element.controls = false;
		this.element.src = this.path;

		this.sprites = [];

		if (options) {
			if (options.autoplay) {
				this.element.autoplay = true;
			}
			if (options.sprites) {
				this.sprites = options.sprites;
			}
			if (options.volume) {
				this.element.volume = options.volume;
			}
		}

		document.body.appendChild(this.element);
	}

	public play() {
		this.element.play();
	}

	public pause() {
		this.element.pause();
	}

	public seek(timeInSeconds: number) {
		this.element.currentTime = timeInSeconds;
	}

	public restart() {
		this.seek(0);
	}

	public setVolume(volume: number) {
		this.element.volume = volume;
	}

	public get duration() {
		return this.element.duration;
	}

	public get isPlaying() {
		return !this.element.paused;
	}

	public get volume() {
		return this.element.volume;
	}

	public playSprite(key: string) {
		const foundSprite = this.sprites.find((_sprite) => _sprite.key === key);

		if (foundSprite) {
			this.seek(foundSprite.startSeconds);

			if (!this.isPlaying) {
				this.play();
			}

			const int = setInterval(() => {
				if (foundSprite) {
					if (this.element.currentTime >= foundSprite.endSeconds) {
						this.restart();
						this.pause();
						clearInterval(int);
					}
				}
			}, 1000);
		} else {
			new Debug.Error(`Cannot find sound sprite with key: '${key}'.`);
		}
	}

	public setPath(path: string) {
		this.path = path;
		this.element.src = this.path;
	}
}
