import Rect from '../gameobjects/rect';
import RoundRect from '../gameobjects/roundrect';
import Sprite from '../gameobjects/sprite';

/**
 * @function
 * @description Returns a boolean based on if a rectangle is intersecting with a rectangle
 * @param {Rect |Sprite | RoundRect | { position: { x:number; y:number }; w:number; h:number }} rect
 * @param {Rect |Sprite| RoundRect | { position: { x:number; y:number }; w:number; h:number }} rect2
 * @returns {boolean}
 * @since 1.1.0-beta
 */
export default function rectToRectIntersect(
	rect:
		| Rect
		| Sprite
		| RoundRect
		| { position: { x: number; y: number }; w: number; h: number },
	rect2:
		| Rect
		| Sprite
		| RoundRect
		| { position: { x: number; y: number }; w: number; h: number }
) {
	const rectCX = rect2.position.x + rect2.w * 0.5;
	const rectCY = rect2.position.y + rect2.h * 0.5;

	const thisCX = rect.position.x + rect.w * 0.5;
	const thisCY = rect.position.y + rect.h * 0.5;

	const dx = rectCX - thisCX; // x difference between centers
	const dy = rectCY - thisCY; // y difference between centers
	const aw = (rect2.w + rect.w) * 0.5; // average width
	const ah = (rect2.h + rect.h) * 0.5; // average height

	/* If either distance is greater than the average dimension there is no collision. */
	if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;
	else return true;
}
