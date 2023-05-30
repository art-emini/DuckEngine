import Game from '../../../game';
import Scene from '../../../scene';
import Vector2 from '../../../math/vector2';
import ParticleComponent from '../particleComponent';
import ParticleEmitter from '../particleEmitter';

/**
 * @class GravityParticleComponent
 * @classdesc GravityParticleComponent class.
 * @description The GravityParticleComponent Class. Makes Particles emitted from the passed ParticleEmitter be affected by gravity
 * @since 3.0.0
 */
export default class GravityParticleComponent extends ParticleComponent {
  /**
   * @memberof GravityParticleComponent
   * @description Gravity that all Particles emitted from the passed ParticleEmitter will be affected by
   * @type Vector2
   * @since 3.0.0
   */
  public readonly gravity: Vector2;

  /**
   * @constructor GravityParticleComponent
   * @description Creates a GravityParticleComponent instance
   * @param {number} gravity The gravity force in pixels that will be applied to the past ParticleEmitter's emitted Particles
   * @param {Particle} particleEmitter The ParticleEmitter that will be used to affect its emitted Particles
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 3.0.0
   */
  constructor(
    gravity: number,
    particleEmitter: ParticleEmitter,
    game: Game,
    scene: Scene
  ) {
    super(particleEmitter, game, scene);

    this.gravity = new Vector2(0, -Math.abs(gravity));
  }

  public update() {
    for (const particle of this.particleEmitter.list) {
      // accel particle to gravity vel
      particle.accelerateVelocity(this.gravity, this.gravity.y);
    }
  }
}
