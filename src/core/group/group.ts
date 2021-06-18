/* eslint-disable indent */
import { Duck } from '../../index';
import Camera from '../camera/camera';
import Debug from '../debug/debug';
import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';
import Text from '../interactive/text';
import StaticLight from '../lights/staticLight';
import Collider from '../physics/collider';

export default class Group<t extends Duck.Group.StackItem> {
	private stack: Duck.Group.Stack;
	public readonly name: string;

	constructor(name: string, defaultItems?: Duck.Group.Stack) {
		this.name = name;
		this.stack = defaultItems || [];
	}

	public add(item: t) {
		this.stack.push(item);
	}

	public remove(item: t) {
		if (this.find(item)) {
			this.stack.splice(this.indexOf(item), 1);
		} else {
			new Debug.Error(
				'Cannot remove item from Group. Item does not exist in Group.'
			);
		}
	}

	public find(item: t) {
		const a = this.stack.find((_a) => _a === item);
		return a;
	}

	public indexOf(item: t) {
		return this.stack.indexOf(item);
	}

	public each(cb: (item: unknown, index: number) => void) {
		return this.stack.forEach(cb.bind(this));
	}

	public filter(filter: Duck.Group.Filter) {
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

	public get group() {
		return this.stack;
	}
}
