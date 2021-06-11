import Rect from '../core/gameobjects/rect';

export default function rectCollision(
	rect: Rect,
	rect2: Rect | { x: number; y: number; w: number; h: number }
) {
	let l1 = rect.getLeft();
	let t1 = rect.getTop();
	let r1 = rect.getRight();
	let b1 = rect.getBottom();

	let l2 = rect2.x;
	let t2 = rect2.y;
	let r2 = rect2.x + rect2.w;
	let b2 = rect2.y + rect2.h;

	// not colliding
	if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
		return false;
	}

	// collides
	return true;
}
