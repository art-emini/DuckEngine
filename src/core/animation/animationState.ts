import Vector2 from '../math/vector2';
import Animation from './animation';

/**
 * @class AnimationState
 * @classdesc Creates a DuckEngine AnimationState
 * @description The AnimationState Class. Holds information that can be used and added by StateMachine
 * @since 2.0.0
 */
export default class AnimationState {
  /**
   * @memberof AnimationState
   * @description The name/key of the AnimationState, used to identify between states, the same as the Animation
   * @type string
   * @since 2.0.0
   */
  public readonly key: string;

  /**
   * @memberof AnimationState
   * @description The Animation to play by the AnimationState
   * @type Animation
   * @since 2.0.0
   */
  public animation: Animation;

  /**
   * @memberof AnimationState
   * @description Determines whether the AnimationState auto advances to another AnimationState on completion
   * @type boolean
   * @since 2.0.0
   */
  public autoAdvance: boolean;

  /**
   * @memberof AnimationState
   * @description The Vector2 position of the AnimationState on an imaginary 2D Plane, used to travel in between states by StateMachine
   * @type Vector2
   * @since 2.0.0
   */
  public vector: Vector2;

  /**
   * @memberof AnimationState
   * @description An array of AnimationStates that are connected to this AnimationState, can only travel between connections
   * @type
   * @since 2.0.0
   */
  public connections: AnimationState[];

  /**
   * @constructor AnimationState
   * @param {string} key The name/key of the AnimationState, used to identify between states, the same as the Animation
   * @param {Animation} animation The Animation to play by the AnimationState
   * @param {Vector2} vector The Vector2 position of the AnimationState on an imaginary 2D Plane, used to travel in between states by StateMachine
   * @param {boolean} autoAdvance Determines whether the AnimationState auto advances to another AnimationState on completion
   * @since 2.0.0
   */
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
