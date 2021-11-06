import Vector2 from '../math/vector2';
import Animation from './animation';

export default class AnimationState {
	public readonly key: string;
	public animation: Animation;
	public autoAdvance: boolean;

	public vector: Vector2;

	public connections: AnimationState[];

	constructor(
		key: string,
		animation: Animation,
		vector: Vector2,
		autoAdvance: boolean
	) {
		this.key = key;
		this.animation = animation;
		this.autoAdvance = autoAdvance;

		this.vector = vector;

		this.connections = [];
	}
}
