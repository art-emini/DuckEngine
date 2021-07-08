// import duckengine and duck for types
import DuckEngine, { Duck } from '../../dist';

export default class MainScene extends DuckEngine.Scene {
	public myRect: Duck.GameObject;
	public myCircle: Duck.GameObject;
	public gameObjects: Duck.Class.Group<Duck.GameObject>;

	public myCamera: Duck.Class.Camera;

	public myParticle: Duck.Class.Particle;
	public myParticleEmitter: Duck.Class.ParticleEmitter;

	public myInput: Duck.Class.Input;
	private mySpeed = 1;

	constructor(game: Duck.Class.Game) {
		super('main', game);

		// gameobjects
		this.myRect = this.add.gameobject.rect(0, 0, 15, 15, '#fff');
		this.myCircle = this.add.gameobject.circle(50, 50, 10, '#fff');

		this.gameObjects = this.add.group<Duck.GameObject>('gameObjects', [
			this.myRect,
			this.myCircle,
		]);

		// camera
		this.myCamera = this.add.mainCamera();
		this.myCamera.setFOV(1.1);
		this.myCamera.setFOVSmooth(50, 0.1, Math.PI / 4); // Math.PI / 4 is default FOV

		// particles
		this.myParticle = this.add.particle(
			'circle',
			0,
			0,
			5,
			this.tools.color.randomWithAlpha(0.5)
		);
		this.myParticleEmitter = this.add.particleEmitter(
			this.myParticle,
			[0, 10],
			[0, 10],
			50
		);

		this.myParticleEmitter.emit();
		this.myParticleEmitter.keepEmitting(100, 100);
		this.myParticleEmitter.float([-0.2, 0.2], [-0.1, -0.3]);

		// input
		this.myInput = this.add.input();

		// sprinting
		this.mySpeed = 1;

		this.myInput.on('keydown', 'Shift', (e) => {
			if (e.key === 'Shift') {
				this.mySpeed = 3;
			}
		});

		this.myInput.on('keyup', 'Shift', (e) => {
			if (e.key === 'Shift') {
				this.mySpeed = 1;
			}
		});
	}

	public render() {
		this.gameObjects.each((gameobject) => {
			gameobject.draw();
		});
	}

	public update() {
		if (this.myInput.inputs.w) {
			this.myRect.setVelocity('y', -this.mySpeed);
		}
		if (this.myInput.inputs.s) {
			this.myRect.setVelocity('y', this.mySpeed);
		}
		if (this.myInput.inputs.a) {
			this.myRect.setVelocity('x', -this.mySpeed);
		}
		if (this.myInput.inputs.d) {
			this.myRect.setVelocity('x', this.mySpeed);
		}

		// offload particles
		this.myParticleEmitter.offload(-100, 600);
		this.myParticleEmitter.offloadMaxAge(10);
		this.myParticleEmitter.offloadMaxAmount(100);

		// camera
		this.myCamera.follow(this.myRect);
	}
}
