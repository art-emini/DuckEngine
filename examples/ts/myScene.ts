// import duckengine and duck for types
import DuckEngine, { Duck } from '../../dist';

export default class MainScene extends DuckEngine.Scene {
	public myRect: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>;
	public myCircle: Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>;
	public gameObjects: Duck.TypeClasses.Misc.Group<
		Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
	>;

	public myCamera: Duck.TypeClasses.Cameras.Camera;

	public myParticle: Duck.TypeClasses.GameObjects.Particles.Particle;
	public myParticleEmitter: Duck.TypeClasses.GameObjects.Particles.ParticleEmitter;

	public myInput: Duck.TypeClasses.Input.Input;
	private mySpeed = 1;

	constructor(game: Duck.TypeClasses.Game) {
		super('main', game);

		// gameobjects
		this.myRect = this.add.gameobject.rect(0, 0, 15, 15, '#fff');
		this.myCircle = this.add.gameobject.circle(50, 50, 10, '#fff');

		this.gameObjects = this.add.group<
			Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
		>('gameObjects', [this.myRect, this.myCircle]);

		// colliders and hitboxes
		this.myRect.physics.addHitbox();
		this.myCircle.physics.addHitbox();

		this.myRect.physics.addCollider([this.myCircle]);

		// camera
		this.myCamera = this.add.mainCamera();
		this.myCamera.setFOV(1.1);
		this.myCamera.setFOVSmooth(50, 0.1, this.myCamera.defaultFOV);
		this.myCamera.startFollow(this.myRect, 0.1, 0.1);

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
		this.myParticleEmitter.offloadBounds({
			x: 0,
			y: 0,
			w: this.game.canvas.width,
			h: this.game.canvas.height,
		});
		this.myParticleEmitter.offloadMaxAge(10);
		this.myParticleEmitter.offloadMaxAmount(100);
	}
}
