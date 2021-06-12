import Circle from '../core/gameobjects/circle';
import Rect from '../core/gameobjects/rect';

export default function circleRectCollision(
	circle: Circle | { x: number; y: number; w: number; h: number; r: number },
	rect: Rect | { x: number; y: number; w: number; h: number }
) {
	var dx = Math.abs(circle.x - (rect.x + rect.w / 2));
	var dy = Math.abs(circle.y - (rect.y + rect.h / 2));

	if (dx > circle.r + rect.w / 2) {
		return false;
	}
	if (dy > circle.r + rect.h / 2) {
		return false;
	}

	if (dx <= rect.w) {
		return true;
	}
	if (dy <= rect.h) {
		return true;
	}

	var dx = dx - rect.w;
	var dy = dy - rect.h;
	return dx * dx + dy * dy <= circle.r * circle.r;
}
