/**
 * @function
 * @description Returns a random integer between two values
 * @param {number} min Minimum
 * @param {number} max Maximum
 */
export default function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
