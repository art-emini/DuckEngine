import Game from '../../game';
import Scene from '../../scene';
import ParticleEmitter from './particleEmitter';

/**
 * @class ParticleComponent
 * @classdesc Abstract ParticleComponent class.
 * @description The ParticleComponent Class. All particle components extend this class
 * @abstract
 * @since 3.0.0
 */
export default abstract class ParticleComponent {
  /**
   * @memberof ParticleComponent
   * @description Game instance
   * @type Game
   * @since 3.0.0
   */
  public game: Game;

  /**
   * @memberof ParticleComponent
   * @description Scene instance
   * @type Scene
   * @since 3.0.0
   */
  public scene: Scene;

  /**
   * @memberof ParticleComponent
   * @description The Particle instance that this is owned by
   * @type Particle
   * @since 3.0.0
   */
  public particleEmitter: ParticleEmitter;

  /**
   * @constructor ParticleComponent
   * @description Creates a ParticleComponent instance
   * @param {Particle} particleEmitter The ParticleEmitter that will be used to affect its emitted Particles
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(particleEmitter: ParticleEmitter, game: Game, scene: Scene) {
    this.particleEmitter = particleEmitter;
    this.game = game;
    this.scene = scene;
  }

  /**
   * @memberof ParticleComponent
   * @description Updates the Particles in a ParticleEmitter
   * @since 3.0.0
   */
  public abstract update(): void;
}
