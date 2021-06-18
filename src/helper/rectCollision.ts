import Rect from '../core/gameobjects/rect';

export default function rectCollision(
	rect: Rect,
	rect2: Rect | { x: number; y: number; w: number; h: number }
) {
	const l1 = rect.getLeft();
	const t1 = rect.getTop();
	const r1 = rect.getRight();
	const b1 = rect.getBottom();

	const l2 = rect2.x;
	const t2 = rect2.y;
	const r2 = rect2.x + rect2.w;
	const b2 = rect2.y + rect2.h;

	// not colliding
	if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
		return false;
	}

	// collides
	return true;
}
