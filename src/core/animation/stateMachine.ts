import { Duck } from '../..';
import Vector2 from '../math/vector2';
import Animation from './animation';
import AnimationState from './animationState';

export default class StateMachine {
	public config: Duck.Types.StateMachine.Config;
	public animations: Animation[];
	public connections: AnimationState[][];

	public currentState: AnimationState;

	public pointer: number;

	constructor(
		config: Duck.Types.StateMachine.Config,
		animations: Animation[]
	) {
		this.config = config;
		this.animations = animations;
		this.connections = [];

		this.pointer = 0;

		// connect from base connections config
		this.config.connections.forEach((base) => {
			if (base.connType === 'one') {
				this.connectTo(base.from, base.to);
			} else {
				this.connectLoop(base.from, base.to);
			}
		});

		this.currentState = this.connections.find((conn) =>
			conn.find((state) => state.key === this.config.defaultState)
		) as unknown as AnimationState;
	}

	public connectTo(
		from: Duck.Types.StateMachine.ConnectionBaseValue,
		to: Duck.Types.StateMachine.ConnectionBaseValue
	) {
		const fromAnim = this.animations.find(
			(anim) => anim.config.key === from.key
		);
		const toAnim = this.animations.find(
			(anim) => anim.config.key === to.key
		);

		if (fromAnim && toAnim) {
			const fromState = new AnimationState(
				fromAnim.key,
				fromAnim,
				from.vector,
				from.autoAdvance || false
			);
			const toState = new AnimationState(
				toAnim.key,
				toAnim,
				to.vector,
				to.autoAdvance || false
			);

			this.connections.push([fromState, toState]);
		}
	}

	public connectLoop(
		from: Duck.Types.StateMachine.ConnectionBaseValue,
		to: Duck.Types.StateMachine.ConnectionBaseValue
	) {
		const fromAnim = this.animations.find(
			(anim) => anim.config.key === from.key
		);
		const toAnim = this.animations.find(
			(anim) => anim.config.key === to.key
		);

		if (fromAnim && toAnim) {
			const fromState = new AnimationState(
				fromAnim.key,
				fromAnim,
				from.vector,
				from.autoAdvance || false
			);
			const toState = new AnimationState(
				toAnim.key,
				toAnim,
				to.vector,
				to.autoAdvance || false
			);

			fromState.connections.push(toState);
			toState.connections.push(fromState);

			this.connections.push([fromState, toState], [toState, fromState]);
		}
	}

	public travel(vector: Vector2) {
		const state: AnimationState = this.connections.find((connArray) =>
			connArray.find((state) => state.vector.equals(vector))
		) as unknown as AnimationState;

		if (this.canTravel(state.key)) {
			this.currentState = state;
		}
	}

	public canTravel(dest: string) {
		return this.currentState.connections.find((state) => state.key === dest)
			? true
			: false;
	}
}
