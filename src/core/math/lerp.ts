/**
 * @function
 * @description Linearly interpolates between two values based on an amount
 * @param {number} start Start Value
 * @param {number} end Target Value
 * @param {number} amount amount
 * @since 2.0.0
 */
export default function lerp(start: number, end: number, amount: number) {
	return (1 - amount) * start + amount * end;
}
