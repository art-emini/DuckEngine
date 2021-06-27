import Rect from '../gameobjects/rect';
import Sprite from '../gameobjects/sprite';

export default function rectToRectIntersect(
	rect: Rect | Sprite,
	rect2: Rect | Sprite | { x: number; y: number; w: number; h: number }
) {
	const rectCX = rect2.x + rect2.w * 0.5;
	const rectCY = rect2.y + rect2.h * 0.5;

	const thisCX = rect.x + rect.w * 0.5;
	const thisCY = rect.y + rect.h * 0.5;

	const dx = rectCX - thisCX; // x difference between centers
	const dy = rectCY - thisCY; // y difference between centers
	const aw = (rect2.w + rect.w) * 0.5; // average width
	const ah = (rect2.h + rect.h) * 0.5; // average height

	/* If either distance is greater than the average dimension there is no collision. */
	if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;
	else return true;
}
