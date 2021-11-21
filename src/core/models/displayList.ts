import { Duck } from '../..';
import Debug from '../debug/debug';

/**
 * @class DisplayList
 * @classdesc Creates a DisplayList that manages Renderable objects
 * @description The DisplayList Class. Keeps track of all Renderable objects
 * @since 2.0.0
 */
export default class DisplayList {
	public list: Duck.Types.Renderable[] = [];

	/**
	 * @memberof DisplayList
	 * @description Adds a renderableObject to the list
	 * @param {Duck.Types.Renderable} renderableObject A renderableObject
	 * @since 2.0.0
	 */
	public add(renderableObject: Duck.Types.Renderable) {
		this.list.push(renderableObject);
	}

	/**
	 * @memberof DisplayList
	 * @description Removes a renderableObject from the list
	 * @param {Duck.Types.Renderable} renderableObject A renderableObject
	 * @since 2.0.0
	 */
	public remove(renderableObject: Duck.Types.Renderable) {
		const f = this.list.find((r) => r.id === renderableObject.id);
		if (f) {
			this.list.splice(
				this.list.findIndex((r) => r.id === renderableObject.id),
				1
			);
			new Debug.Log(
				`INTERNAL -> Removed renderableObject from displayList with id "${renderableObject.id}".`
			);
		} else {
			new Debug.Error(
				`INTERNAL -> Cannot remove renderableObject from displayList with id "${renderableObject.id}". If you suspect this as a bug, please report it on github.`
			);
		}
	}

	/**
	 * @memberof DisplayList
	 * @description Sorts all renderableObject by zIndex
	 * @returns Duck.Types.Renderable[]
	 * @since 2.0.0
	 */
	public depthSort() {
		const sorted = [...this.list].sort(
			(obj, obj2) => obj.zIndex - obj2.zIndex
		);

		return sorted;
	}

	/**
	 * @memberof DisplayList
	 * @description Filters all renderableObjects by its visible boolean property
	 * @param {boolean} [filter=true] By what to filter. EX: true, filters all visible objects, optional -> default: true
	 * @returns Duck.Types.Renderable[]
	 * @since 2.0.0
	 */
	public visibilityFilter(filter = true) {
		const filtered = this.list.filter((r) => r.visible === filter);

		return filtered;
	}

	/**
	 * @memberof DisplayList
	 * @template t
	 * @description Loops through each renderableObject and runs a callback with it passed
	 * @param {(renderableObject: Duck.Types.Renderable, index: number) => t} cb Callback
	 * @since 2.0.0
	 */
	public each<t = void>(
		cb: (renderableObject: Duck.Types.Renderable, index: number) => t
	) {
		this.list.forEach(cb.bind(this));
	}

	/**
	 * @memberof DisplayList
	 * @description Removes an item from the list based on passed index
	 * @param {number} index
	 * @param {number} [amount]
	 * @since 2.0.0
	 */
	public splice(index: number, amount?: number) {
		return this.list.splice(index, amount);
	}

	/**
	 * @memberof DisplayList
	 * @description Gets the length of the list
	 * @since 2.0.0
	 */
	public get length() {
		return this.list.length;
	}

	/**
	 * @memberof DisplayList
	 * @description Overwrites the list items with passed parameter
	 * @param {Duck.Types.Renderable[]} listItems Renderable objects to overwrite with
	 * @since 2.0.0
	 */
	public set listItems(listItems: Duck.Types.Renderable[]) {
		this.list = listItems;
	}
}
