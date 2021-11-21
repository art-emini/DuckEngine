import { Duck } from '../..';
import Vector2 from '../math/vector2';
import Animation from './animation';
import AnimationState from './animationState';

export default class StateMachine {
	/**
	 * @memberof StateMachine
	 * @description The configuration of the StateMachine
	 * @type Duck.Types.StateMachine.Config
	 * @since 2.0.0
	 */
	public config: Duck.Types.StateMachine.Config;

	/**
	 * @memberof StateMachine
	 * @description All animations used by the StateMachine
	 * @type
	 * @since 2.0.0
	 */
	public animations: Animation[];

	/**
	 * @memberof StateMachine
	 * @description A 2D Array of AnimationStates, one connection is represented by a nested array, ex: StateMachine.connections = [[\/* one connection here *\/]]
	 * @type AnimationState[][]
	 * @since 2.0.0
	 */
	public connections: AnimationState[][];

	/**
	 * @memberof StateMachine
	 * @description The current AnimationState that is traveled to, use this to get and play the animation
	 * @type AnimationState
	 * @since 2.0.0
	 */
	public currentState: AnimationState;

	/**
	 * @memberof StateMachine
	 * @description Creates a StateMachine instance
	 * @param {Duck.Types.StateMachine.Config} config StateMachine configuration
	 * @param {Animation[]} animations All Animations needed by the StateMachine
	 * @since 2.0.0
	 */
	constructor(
		config: Duck.Types.StateMachine.Config,
		animations: Animation[]
	) {
		this.config = config;
		this.animations = animations;
		this.connections = [];

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

	/**
	 * @memberof StateMachine
	 * @description Creates an AnimationState for both passed and values and makes a connection between from -> to
	 * @param {Duck.Types.StateMachine.ConnectionBaseValue} from AnimationState base config to connect from
	 * @param {Duck.Types.StateMachine.ConnectionBaseValue} to AnimationState base config to connect to
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof StateMachine
	 * @description Creates an AnimationState for both passed and values and makes a connection between from -> to and to -> from
	 * @param {Duck.Types.StateMachine.ConnectionBaseValue} from AnimationState base config to connect from
	 * @param {Duck.Types.StateMachine.ConnectionBaseValue} to AnimationState base config to connect to
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof StateMachine
	 * @description Travels along the imaginary 2D plane to find a connection based on other connections' vectors
	 * @param {Vector2} vector Vector to match to another Connection that will set the currentState as
	 * @since 2.0.0
	 */
	public travel(vector: Vector2) {
		const state: AnimationState = this.connections.find((connArray) =>
			connArray.find((state) => state.vector.equals(vector))
		) as unknown as AnimationState;

		if (this.canTravel(state.key)) {
			this.currentState = state;
		}
	}

	/**
	 * @memberof StateMachine
	 * @description Checks if the currentState's connections include another AnimationState connection with a passed key
	 * @param {string} dest The destination or key to find
	 * @returns boolean
	 * @since 2.0.0
	 */
	public canTravel(dest: string) {
		return this.currentState.connections.find((state) => state.key === dest)
			? true
			: false;
	}
}
