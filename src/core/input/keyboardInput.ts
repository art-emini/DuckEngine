/* eslint-disable @typescript-eslint/no-explicit-any */
import { Duck } from '../..';
import EventEmitter from '../events/eventEmitter';
import Game from '../game';
import Scene from '../scene';
import Key from './models/key';

/**
 * @class KeyboardInput
 * @classdesc Creates a DuckEngine KeyboardInput
 * @description The KeyboardInput Class. Use the Keyboard as input
 * @since 2.0.0
 */
export default class KeyboardInput {
  /**
   * @memberof KeyboardInput
   * @description Game instance
   * @type Game
   * @since 2.0.0
   */
  public game: Game;

  /**
   * @memberof KeyboardInput
   * @description Scene instance
   * @type Scene
   * @since 2.0.0
   */
  public scene: Scene;

  /**
   * @memberof KeyboardInput
   * @description The EventEmitter used to emit for Key events
   * @type EventEmitter
   * @since 2.0.0
   */
  public eventEmitter: EventEmitter;

  /**
   * @memberof KeyboardInput
   * @description All of the Keys added to the KeyboardInput
   * @type { [key: string]: Key }
   * @since 2.0.0
   */
  public keys: {
    [key: string]: Key;
  };

  /**
   * @memberof KeyboardInput
   * @description Creates a KeyboardInput instance
   * @param {Game} game Game instance
   * @param {Scene} scene Scene instance
   * @since 2.0.0
   */
  constructor(game: Game, scene: Scene) {
    this.game = game;
    this.scene = scene;
    this.eventEmitter = new EventEmitter();

    this.keys = {};
  }

  /**
   * @memberof KeyboardInput
   * @description Adds a Key to the KeyboardInput
   * @param {number} keyCode The Key keyCode
   * @param {string} descriptor The Key descriptor, used to set the value to KeyboardInput.keys
   * @param { (e:KeyboardEvent) => any } [keyDown] Key Down callback
   * @param { (e:KeyboardEvent) => any } [keyUp] Key Up callback
   * @param { (e:KeyboardEvent) => any } [keyJustPressed] Key Just Pressed callback
   * @param { (e:KeyboardEvent) => any } [keyState] Key State callback
   * @since 2.0.0
   */
  public addKey(
    keyCode: number,
    descriptor: string,
    keyDown?: (e: KeyboardEvent) => any,
    keyUp?: (e: KeyboardEvent) => any,
    keyJustPressed?: (e: KeyboardEvent) => any,
    keyState?: (e: KeyboardEvent, state: boolean) => any
  ) {
    const myKey = new Key(
      keyCode,
      descriptor,
      this.game,
      this.scene,
      this,
      keyDown,
      keyUp,
      keyJustPressed,
      keyState
    );

    this.keys[descriptor] = myKey;

    return myKey;
  }

  /**
   * @memberof KeyboardInput
   * @description Adds a Key to the KeyboardInput
   * @param {Duck.Types.KeyboardInput.KeyBase[]} keys An array of base key configurations to create Keys from
   * @since 2.0.0
   */
  public addKeys(keys: Duck.Types.KeyboardInput.KeyBase[]) {
    keys.forEach((keyBase) => {
      this.addKey(
        keyBase.keyCode,
        keyBase.descriptor,
        keyBase.keyDown,
        keyBase.keyUp,
        keyBase.keyJustPressed,
        keyBase.keyState
      );
    });
  }

  /**
   * @memberof KeyboardInput
   * @description Removes a Key from the KeyboardInput
   * @param {string} descriptor Key descriptor
   * @since 2.0.0
   */
  public removeKey(descriptor: string) {
    const key = this.keys[descriptor];

    if (key) {
      delete this.keys[descriptor];
    }
  }

  /**
   * @memberof KeyboardInput
   * @description Adds an onInput event listener to all keys
   * @param {(key:Key,e:KeyboardEvent)=>any} cb
   * @since 2.0.0
   */
  public onInput(cb: (key: Key, e: KeyboardEvent) => any) {
    for (const key in this.keys) {
      if (Object.prototype.hasOwnProperty.call(this.keys, key)) {
        const myKey = this.keys[key];
        myKey.onInput(cb);
      }
    }
  }

  /**
   * @memberof KeyboardInput
   * @description Returns KeyboardInput.keys
   * @returns {{ [key: string]: Key }}
   * @since 2.0.0
   */
  public get inputs() {
    return this.keys;
  }
}
