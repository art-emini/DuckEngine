import { Duck } from '../..';
import Debug from '../debug/debug';

/**
 * @class PhysicsList
 * @classdesc Creates a PhysicsList that manages Physics objects
 * @description The PhysicsList Class. Keeps track of all Physics objects
 * @since 2.0.0
 */
export default class PhysicsList {
  public list: Duck.Types.PhysicsProcessMember[] = [];

  /**
   * @memberof PhysicsList
   * @description Adds a physicsObject to the list
   * @param {Duck.Types.PhysicsProcessMember} physicsObject A physicsObject
   * @since 2.0.0
   */
  public add(physicsObject: Duck.Types.PhysicsProcessMember) {
    this.list.push(physicsObject);
  }

  /**
   * @memberof PhysicsList
   * @description Removes a physicsObject from the list
   * @param {Duck.Types.PhysicsProcessMember} physicsObject A physicsObject
   * @since 2.0.0
   */
  public remove(physicsObject: Duck.Types.PhysicsProcessMember) {
    const f = this.list.find((r) => r.id === physicsObject.id);
    if (f) {
      this.list.splice(
        this.list.findIndex((r) => r.id === physicsObject.id),
        1
      );
    } else {
      new Debug.Error(
        `INTERNAL -> Cannot remove physicsObject from physicsList with id "${physicsObject.id}". If you suspect this as a bug, please report it on github.`
      );
    }
  }

  /**
   * @memberof PhysicsList
   * @template t
   * @description Loops through each physicsObject and runs a callback with it passed
   * @param {(physicsObject: Duck.Types.PhysicsProcessMember, index: number) => t} cb Callback
   * @since 2.0.0
   */
  public each<t = void>(
    cb: (physicsBody: Duck.Types.PhysicsProcessMember, index: number) => t
  ) {
    this.list.forEach(cb.bind(this));
  }

  public enabledFilter(filter = true) {
    const filtered = this.list.filter((r) => r.enabled === filter);

    return filtered;
  }

  /**
   * @memberof PhysicsList
   * @description Removes an item from the list based on passed index
   * @param {number} index
   * @param {number} [amount]
   * @since 2.0.0
   */
  public splice(index: number, amount?: number) {
    return this.list.splice(index, amount);
  }

  /**
   * @memberof PhysicsList
   * @description Gets the length of the list
   * @since 2.0.0
   */
  public get length() {
    return this.list.length;
  }

  /**
   * @memberof PhysicsList
   * @description Overwrites the list items with passed parameter
   * @param {Duck.Types.PhysicsProcessMember[]} listItems Renderable objects to overwrite with
   * @since 2.0.0
   */
  public set listItems(listItems: Duck.Types.PhysicsProcessMember[]) {
    this.list = listItems;
  }
}
