import { Duck } from '../..';
import Debug from '../debug/debug';

export default class DisplayList {
	public list: Duck.Types.Renderable[] = [];

	public add(renderableObject: Duck.Types.Renderable) {
		this.list.push(renderableObject);
	}

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

	public depthSort() {
		const sorted = [...this.list].sort(
			(obj, obj2) => obj.zIndex - obj2.zIndex
		);

		return sorted;
	}

	public visibilityFilter(filter = true) {
		const filtered = this.list.filter((r) => r.visible === filter);

		return filtered;
	}

	public each<t = void>(
		cb: (renderableObject: Duck.Types.Renderable, index: number) => t
	) {
		this.list.forEach(cb.bind(this));
	}

	public splice(index: number, amount?: number) {
		return this.list.splice(index, amount);
	}

	public get length() {
		return this.list.length;
	}

	public set listItems(listItems: Duck.Types.Renderable[]) {
		this.list = listItems;
	}
}
