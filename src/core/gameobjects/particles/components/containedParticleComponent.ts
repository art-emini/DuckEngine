import { Duck } from '../../../..';
import Game from '../../../game';
import Scene from '../../../scene';

import ParticleEmitter from '../particleEmitter';
import ParticleComponent from '../particleComponent';

/**
 * @class ContainedParticleComponent
 * @classdesc ContainedParticleComponent class.
 * @description The ContainedParticleComponent Class. Makes Particles emitted from the passed ParticleEmitter bounce off of passed bounds
 * @since 3.0.0
 */
export default class ContainedParticleComponent extends ParticleComponent {
  /**
   * @memberof ContainedParticleComponent
   * @description Bounds that all Particles emitted from the passed ParticleEmitter will be affected by
   * @type Duck.Types.Math.BoundsLike
   * @since 3.0.0
   */
  public readonly bounds: Duck.Types.Math.BoundsLike;

  /**
   * @memberof ContainedParticleComponent
   * @description  How much energy is lost when bouncing, a number between 0-1 to loose energy,
   * 1-any to increase energy, 1 = none, must be a positive number
   * @type number
   * @since 3.0.0
   */
  public readonly restitution: number;

  /**
   * @constructor ContainedParticleComponent
   * @description Creates a ContainedParticleComponent instance
   * @param {Duck.Types.Math.BoundsLike} bounds Bounds that all Particles emitted from the passed ParticleEmitter will be affected by
   * @param {number} restitution How much energy is lost when bouncing, a number between 0-1 to loose energy, 1-any to increase energy, 1 = none, must be a positive number
   * @param {Particle} particleEmitter The ParticleEmitter that will be used to affect its emitted Particles
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(
    bounds: Duck.Types.Math.BoundsLike,
    restitution: number,
    particleEmitter: ParticleEmitter,
    game: Game,
    scene: Scene
  ) {
    super(particleEmitter, game, scene);

    this.bounds = bounds;
    this.restitution = restitution;
  }

  public update() {
    // implement
  }
}
