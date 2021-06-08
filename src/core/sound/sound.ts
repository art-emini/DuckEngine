import { Duck } from '../../index';

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

		this.sprites = [];

		if (options) {
			if (options.autoplay) {
				this.element.autoplay = true;
			}
			if (options.sprites) {
				this.sprites = options.sprites;
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

	public get duration() {
		return this.element.duration;
	}

	public get isPlaying() {
		return !this.element.paused;
	}

	public playSprite(key: string) {
		let foundSprite = this.sprites.find((_sprite) => _sprite.key === key);

		if (foundSprite) {
			this.seek(foundSprite.startSeconds);

			if (!this.isPlaying) {
				this.play();
			}

			let int = setInterval(() => {
				if (foundSprite) {
					if (this.element.currentTime >= foundSprite.endSeconds) {
						this.restart();
						this.pause();
						clearInterval(int);
					}
				}
			}, 1000);
		} else {
			console.error(
				`DuckEngine Error : Cannot find sound sprite with key: '${key}'.`
			);
		}
	}
}
