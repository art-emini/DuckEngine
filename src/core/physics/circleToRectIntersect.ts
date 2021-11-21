import Circle from '../gameobjects/circle';
import Rect from '../gameobjects/rect';
import Sprite from '../gameobjects/sprite';

/**
 * @function
 * @description Returns a boolean based on if a circle is intersecting with a rectangle
 * @param {Circle| { position: { x:number; y:number }; w:number; h:number; r:number; }} circle Circle
 * @param {Rect | { position: { x:number; y:number }; w:number; h:number } | Sprite} rect Rect
 * @returns boolean
 * @since 1.1.0-beta
 */
export default function circleRectCollision(
	circle:
		| Circle
		| {
				position: { x: number; y: number };
				w: number;
				h: number;
				r: number;
		  },
	rect:
		| Rect
		| { position: { x: number; y: number }; w: number; h: number }
		| Sprite
) {
	let dx = Math.abs(circle.position.x - (rect.position.x + rect.w / 2));
	let dy = Math.abs(circle.position.y - (rect.position.y + rect.h / 2));

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

	dx = dx - rect.w;
	dy = dy - rect.h;
	return dx * dx + dy * dy <= circle.r * circle.r;
}
