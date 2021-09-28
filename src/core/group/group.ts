/* eslint-disable indent */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Game from '../game';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';
import Text from '../interactive/text';
import StaticLight from '../lights/staticLight';
import Collider from '../physics/collider';

export default class Group<t extends Duck.Types.Group.StackItem> {
	private stack: t[];
	private game: Game;
	public readonly name: string;

	private listeners: Duck.Types.Group.Listener[];

	constructor(name: string, game: Game, defaultItems?: t[]) {
		this.name = name;
		this.stack = defaultItems || [];
		this.game = game;

		this.listeners = [];
	}

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

	public find(item: t) {
		const a = this.stack.find((_a) => _a === item);
		return a;
	}

	public indexOf(item: t) {
		return this.stack.indexOf(item);
	}

	public each(cb: (item: t, index: number) => void) {
		return this.stack.forEach(cb.bind(this));
	}

	public pop() {
		return this.stack.pop();
	}

	public shift() {
		return this.stack.shift();
	}

	public splice(index: number, deleteCount?: number) {
		return this.stack.splice(index, deleteCount);
	}

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

	public on(type: Duck.Types.Group.ListenerType, cb: () => unknown) {
		this.listeners.push({
			type: type,
			func: cb,
		});
	}

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

	public get group() {
		return this.stack;
	}

	public get length() {
		return this.stack.length;
	}
}
