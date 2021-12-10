/* eslint-disable indent */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Game from '../game';
import StaticLight from '../lights/staticLight';
import Collider from '../physics/collider';
import EVENTS from '../events/events';
import GameObject from '../gameobjects/gameObject';
import UI from '../gameobjects/ui/ui';
import Hitbox from '../physics/models/hitbox';

/**
 * @class Group
 * @classdesc Creates a DuckEngine Group
 * @description The Group Class. Contains and manages a group of items
 * @template t Stack Item type generic
 * @since 1.0.0-beta
 */
export default class Group<t> {
	protected stack: t[];

	/**
	 * @memberof Group
	 * @description Game instance
	 * @type Game
	 * @since 1.0.0-beta
	 */
	public game: Game;

	/**
	 * @memberof Group
	 * @description Group name
	 * @type string
	 * @since 1.0.0-beta
	 */
	public readonly name: string;

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
	}

	/**
	 * @memberof Group
	 * @description Adds an item to the Group
	 * @param {t} item Item to add
	 * @emits EVENTS.GROUP.ADD
	 * @since 1.0.0-beta
	 */
	public add(item: t) {
		this.stack.push(item);
		if (this.game.config.debug) {
			new Debug.Log('Added item to group.');
		}

		// listener
		this.game.eventEmitter.emit(EVENTS.GROUP.ADD, item);
	}

	/**
	 * @memberof Group
	 * @description Removes an item from the Group
	 * @param {t} item Item to remove
	 * @emits EVENTS.GROUP.REMOVE
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
		this.game.eventEmitter.emit(EVENTS.GROUP.REMOVE, item);
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
	 * @returns {t | undefined}
	 * @since 1.0.0-beta
	 */
	public pop() {
		return this.stack.pop();
	}

	/**
	 * @memberof Group
	 * @description Shifts an item from the Group array
	 * @returns {t | undefined}
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
	 * @returns {t[]}
	 * @since 1.0.0-beta
	 */
	public splice(index: number, deleteCount?: number) {
		return this.stack.splice(index, deleteCount);
	}

	/**
	 * @memberof Group
	 * @description Filters items from the Group
	 * @param {Duck.Types.Group.Filter} filter Filter string
	 * @returns {t[]}
	 * @since 1.0.0-beta
	 */
	public filter(filter: Duck.Types.Group.Filter) {
		switch (filter) {
			case 'cameras':
				return this.stack.filter((item) => item instanceof Camera);
				break;
			case 'gameobject':
				return this.stack.filter((item) => item instanceof GameObject);
				break;
			case 'ui':
				return this.stack.filter((item) => item instanceof UI);
				break;
			case 'lights':
				return this.stack.filter((item) => item instanceof StaticLight);
				break;
			case 'physics':
				return this.stack.filter(
					(item) => item instanceof Collider || item instanceof Hitbox
				);
				break;
			default:
				new Debug.Error(
					'Cannot filter Group. Filter must be "cameras", "gameobject", "ui", "lights", or "physics".'
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
		this.game.eventEmitter.on(`GROUP_${type}`, cb);
	}

	/**
	 * @memberof Group
	 * @description Removes an event listener from Group
	 * @param {Duck.Types.Group.ListenerType} type Listener type
	 * @since 1.0.0-beta
	 */
	public off(type: Duck.Types.Group.ListenerType) {
		this.game.eventEmitter.off(`GROUP_${type}`);
	}

	/**
	 * @memberof Group
	 * @description Returns the array
	 * @returns {t[]}
	 * @since 1.0.0-beta
	 */
	public get group() {
		return this.stack;
	}

	/**
	 * @memberof Group
	 * @description Returns the length of the array
	 * @returns {number}
	 * @since 1.0.0-beta
	 */
	public get length() {
		return this.stack.length;
	}
}
