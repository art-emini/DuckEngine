// import duckengine and duck for types
import DuckEngine, { Duck } from '../../dist';

// input type
import Input from '../../dist/core/input/input';

// import game from test.ts
import game from './test';

export default class MainScene extends DuckEngine.Scene {
	public myRect: Duck.GameObject;
	public myInput: Input;
	private mySpeed = 1;

	constructor() {
		super('main', game);
		this.myRect = this.add.gameobject.rect(0, 0, 15, 15, '#fff');
		this.myInput = this.add.input();
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
		this.myRect.draw();
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
	}
}
