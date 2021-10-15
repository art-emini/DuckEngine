import { Duck } from '../../index';

/**
 * @function
 * @description Returns a random float between two ranges
 * @param {number} min Minimum
 * @param {number} max Maximum
 * @param {number} [fixed=2] Number to fix the float to, optional -> defaults: 2
 */
export default function randomFloat(min: number, max: number, fixed?: number) {
	const num = Math.random() * (max - min) + min;
	const res = num.toFixed(fixed || 2);
	return Number(res);
}
