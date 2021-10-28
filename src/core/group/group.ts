/* eslint-disable indent */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';
import Text from '../gameobjects/interactive/text';
import StaticLight from '../lights/staticLight';
import Collider from '../physics/collider';

/**
 * @class Group
 * @classdesc Creates a DuckEngine Group
 * @description The Group Class. Contains and manages a group of items
 * @template t Stack Item type generic
 * @since 1.0.0-beta
 */
export default class Group<t extends Duck.Types.Group.StackItem> {
	protected stack: t[];
	public game: Game;
	public readonly name: string;

	protected listeners: Duck.Types.Group.Listener[];

	/**
	 * @constructor
	 * @description Creates a Group instance.
	 * @param {string} name Name of group
	 * @param {Game} game Game instance
	 * @param {t[]} [defaultItems=[]] Default items, optional -> defaults: []
	 * @since 1.0.0-beta
	 */
	constructor(name: string, game: Game, defaultItems?: t[]) {
		this.name = name;
		this.stack = defaultItems || [];
		this.game = game;

		this.listeners = [];
	}

	/**
	 * @memberof Group
	 * @description Adds an item to the Group
	 * @param {t} item Item to add
	 * @since 1.0.0-beta
	 */
	public add(item: t) {
		this.stack.push(item);
		if (this.game.config.debug) {
			new Debug.Log('Added item to group.');
		}

		// listener
		const foundListener = this.listeners.find((l) => l.type === 'ADD');
		if (foundListener) {
			foundListener.func(item);
		}
	}

	/**
	 * @memberof Group
	 * @description Removes an item from the Group
	 * @param {t} item Item to remove
	 * @since 1.0.0-beta
	 */
	public remove(item: t) {
		if (this.find(item)) {
			this.stack.splice(this.indexOf(item), 1);
			if (this.game.config.debug) {
				new Debug.Log('Removed item from group.');
			}
		} else {
			new Debug.Error(
				'Cannot remove item from Group. Item does not exist in Group.'
			);
		}

		// listener
		const foundListener = this.listeners.find((l) => l.type === 'REMOVE');
		if (foundListener) {
			foundListener.func(item);
		}
	}

	/**
	 * @memberof Group
	 * @description Finds an item in the Group
	 * @param {t} item Item to find
	 * @since 1.0.0-beta
	 */
	public find(item: t) {
		const a = this.stack.find((_a) => _a === item);
		return a;
	}

	/**
	 * @memberof Group
	 * @description Gets the index of an item from the Group list array
	 * @param {t} item Item to find the index of
	 * @since 1.0.0-beta
	 */
	public indexOf(item: t) {
		return this.stack.indexOf(item);
	}

	/**
	 * @memberof Group
	 * @description Loops through each item in the Group array
	 * @param {(item: t, index: number) => void} cb Callback function
	 * @since 1.0.0-beta
	 */
	public each(cb: (item: t, index: number) => void) {
		return this.stack.forEach(cb.bind(this));
	}

	/**
	 * @memberof Group
	 * @description Pops an item from the Group array
	 * @returns t | undefined
	 * @since 1.0.0-beta
	 */
	public pop() {
		return this.stack.pop();
	}

	/**
	 * @memberof Group
	 * @description Shifts an item from the Group array
	 * @returns t | undefined
	 * @since 1.0.0-beta
	 */
	public shift() {
		return this.stack.shift();
	}

	/**
	 * @memberof Group
	 * @description Splices an item from the Group array
	 * @param {number} index Index to splice at
	 * @param {number} [deleteCount] How many items to remove, optional
	 * @returns t[]
	 * @since 1.0.0-beta
	 */
	public splice(index: number, deleteCount?: number) {
		return this.stack.splice(index, deleteCount);
	}

	/**
	 * @memberof Group
	 * @description Filters items from the Group
	 * @param {Duck.Types.Group.Filter} filter Filter string
	 * @returns t[]
	 * @since 1.0.0-beta
	 */
	public filter(filter: Duck.Types.Group.Filter) {
		switch (filter) {
			case 'cameras':
				return this.stack.filter((item) => item instanceof Camera);
				break;
			case 'gameobject':
				return this.stack.filter(
					(item) =>
						item instanceof Circle || Rect || RoundRect || Sprite
				);
				break;
			case 'interactive':
				return this.stack.filter((item) => item instanceof Text);
				break;
			case 'lights':
				return this.stack.filter((item) => item instanceof StaticLight);
				break;
			case 'physics':
				return this.stack.filter((item) => item instanceof Collider);
				break;
			default:
				new Debug.Error(
					'Cannot filter Group. Filter must be "cameras", "gameobject", "interactive", "lights", or "physics".'
				);
				return this.stack;
				break;
		}
	}

	/**
	 * @memberof Group
	 * @description Adds an event listener to Group
	 * @param {Duck.Types.Group.ListenerType} type Listener type
	 * @param {() => unknown} cb Callback function
	 * @since 1.0.0-beta
	 */
	public on(type: Duck.Types.Group.ListenerType, cb: () => unknown) {
		this.listeners.push({
			type: type,
			func: cb,
		});
	}

	/**
	 * @memberof Group
	 * @description Removes an event listener from Group
	 * @param {Duck.Types.Group.ListenerType} type Listener type
	 * @since 1.0.0-beta
	 */
	public off(type: Duck.Types.Group.ListenerType) {
		const foundListener = this.listeners.find((l) => l.type === type);

		if (foundListener) {
			this.listeners.splice(this.listeners.indexOf(foundListener), 1);
		} else {
			new Debug.Error(
				'Cannot remove event listener from group. Type does not exist.'
			);
		}
	}

	/**
	 * @memberof Group
	 * @description Returns the array
	 * @returns t[]
	 * @since 1.0.0-beta
	 */
	public get group() {
		return this.stack;
	}

	/**
	 * @memberof Group
	 * @description Returns the length of the array
	 * @returns number
	 * @since 1.0.0-beta
	 */
	public get length() {
		return this.stack.length;
	}
}
