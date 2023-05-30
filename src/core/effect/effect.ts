import { Duck } from '../../index';
import Game from '../game';
import ParticleEmitter from '../gameobjects/particles/particleEmitter';
import uniqueID from '../../utils/uniqueID';

/**
 * @class Effect
 * @classdesc Creates a DuckEngine Effect
 * @description The Effect Class. Store a particleEmitter instance and particles that can be run easily
 * @since 1.2.0
 */
export default class Effect implements Duck.Types.Renderable {
  /**
   * @memberof Effect
   * @description A unique identifier for the Effect
   * @type string
   * @since 1.2.0
   */
  public readonly id: string;

  /**
   * @memberof Effect
   * @description Shape, always "Effect" used for Scene.displayList
   * @type string
   * @since 1.2.0
   */
  public readonly shape: string;

  /**
   * @memberof Effect
   * @description Range of numbers for x pos
   * @type Duck.Types.ParticleEmitter.Range
   * @since 1.2.0
   */
  public rangeX: Duck.Types.ParticleEmitter.Range;

  /**
   * @memberof Effect
   * @description Range of numbers for y pos
   * @type Duck.Types.ParticleEmitter.Range
   * @since 1.2.0
   */
  public rangeY: Duck.Types.ParticleEmitter.Range;

  /**
   * @memberof Effect
   * @description ParticleEmitter to control
   * @type ParticleEmitter
   * @since 1.2.0
   */
  public particleEmitter: ParticleEmitter;

  /**
   * @memberof Effect
   * @description Game instance
   * @type Game
   * @since 1.2.0
   */
  public game: Game;

  /**
   * @memberof Effect
   * @description Determines the visibility of the Effect
   * @type boolean
   * @since 1.2.0
   */
  public visible: boolean;

  /**
   * @memberof Effect
   * @description Used for depth sorted
   * @type number
   * @since 1.2.0
   */
  public zIndex: number;

  /**
   * @memberof Effect
   * @description Determines if the Effect should be visible by the current scene's current camera
   * @type boolean
   * @since 2.1.0
   */
  public culled: boolean;

  /**
   * @memberof Effect
   * @description A gameobject that the Effect is following
   * @type Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>| undefined
   * @since 1.2.0
   */
  public following:
    | Duck.TypeClasses.GameObjects.GameObject<Duck.Types.Texture.Type>
    | undefined;
  protected randomMaxOffset: number;

  /**
   * @constructor Effect
   * @description Creates an Effect instance.
   * @param {Duck.Types.ParticleEmitter.Range} rangeX A range of 2 numbers to determine the new created particles x position
   * @param {Duck.Types.ParticleEmitter.Range} rangeY A range of 2 numbers to determine the new created particles y position
   * @param {ParticleEmitter} particleEmitter ParticleEmitter instance
   * @param {Game} game Game instance
   * @since 1.2.0
   */
  constructor(
    rangeX: Duck.Types.ParticleEmitter.Range,
    rangeY: Duck.Types.ParticleEmitter.Range,
    particleEmitter: ParticleEmitter,
    game: Game
  ) {
    this.id = uniqueID();
    this.shape = 'effect';
    this.rangeX = rangeX;
    this.rangeY = rangeY;
    this.particleEmitter = particleEmitter;
    this.game = game;

    this.visible = true;
    this.zIndex = 2;
    this.culled = true;

    this.particleEmitter.rangeX = rangeX;
    this.particleEmitter.rangeY = rangeY;

    this.following;
    this.randomMaxOffset = 5;
  }

  /**
   * @memberof Effect
   * @description Makes the particleEmitter emit
   * @since 1.2.0
   */
  public emit() {
    this.particleEmitter.emit();
  }

  /**
   * @memberof Effect
   * @description Stops the particleEmitter emitting
   * @since 1.2.0
   */
  public stopEmit() {
    this.particleEmitter.stopEmit();
  }

  /**
   * @memberof Effect
   * @description Makes the particleEmitter emit for a duration
   * @param {number} ms Duration in milliseconds
   * @since 1.2.0
   */
  public emitFor(ms: number) {
    this.particleEmitter.emitFor(ms);
  }

  /**
   * @description Draws the effect.
   *
   * DO NOT CALL MANUALLY, CALLED IN GAME LOOP USING SCENE.displayList
   *
   */
  public _draw() {
    if (this.following) {
      const rangeX: Duck.Types.ParticleEmitter.Range = [
        this.following.position.x,
        this.following.position.x + this.randomMaxOffset,
      ];
      const rangeY: Duck.Types.ParticleEmitter.Range = [
        this.following.position.y,
        this.following.position.y + this.randomMaxOffset,
      ];

      this.particleEmitter.setRange(rangeX, rangeY);
    }
  }

  /**
   * @memberof Effect
   * @description Makes the effect follow the GameObject
   * @param {Duck.Types.GameObject<Duck.Types.Texture.Type>} object GameObject to follow
   * @param {number} [randomMaxOffset] A random offset of the effect relative to the GameObject
   * @since 1.2.0
   */
  public follow(
    object: Duck.Types.GameObject<Duck.Types.Texture.Type>,
    randomMaxOffset = 5
  ) {
    this.following = object;
    this.randomMaxOffset = randomMaxOffset;
  }

  /**
   * @memberof Effect
   * @description Makes the effect stop following the GameObject
   * @since 1.2.0
   */
  public stopFollow() {
    this.following = undefined;
  }
}
