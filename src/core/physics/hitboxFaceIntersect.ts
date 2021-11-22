import { Duck } from '../..';
import Hitbox from './models/hitbox';

export default function hitboxFaceIntersect(
	hitbox:
		| Hitbox
		| { position: { x: number; y: number }; w: number; h: number },
	hitbox2: Hitbox
): Duck.Types.Collider.CollisionResponseType {
	const rectCX = hitbox2.position.x + hitbox2.w * 0.5;
	const rectCY = hitbox2.position.y + hitbox2.h * 0.5;

	const thisCX = hitbox.position.x + hitbox.w * 0.5;
	const thisCY = hitbox.position.y + hitbox.h * 0.5;

	const dx = rectCX - thisCX; // x difference between centers
	const dy = rectCY - thisCY; // y difference between centers
	const aw = (hitbox2.w + hitbox.w) * 0.5; // average width
	const ah = (hitbox2.h + hitbox.h) * 0.5; // average height

	/* If either distance is greater than the average dimension there is no collision. */
	if (Math.abs(dx) > aw || Math.abs(dy) > ah) {
		return 'none';
	}

	/* To determine which region of this rectangle the rect's center
	  point is in, we have to account for the scale of the this rectangle.
	  To do that, we divide dx and dy by it's width and height respectively. */
	if (Math.abs(dx / hitbox.w) > Math.abs(dy / hitbox.h)) {
		if (dx < 0) {
			// left
			hitbox.position.x = hitbox2.position.x + hitbox2.w;

			return 'left';
		} else {
			// right
			hitbox.position.x = hitbox2.position.x - hitbox.w;

			return 'right';
		}
	} else {
		if (dy < 0) {
			// top
			hitbox.position.y = hitbox2.position.y + hitbox2.h;

			return 'top';
		} else {
			// bottom
			hitbox.position.y = hitbox2.position.y - hitbox.h;

			return 'bottom';
		}
	}
}
