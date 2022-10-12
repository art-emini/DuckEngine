/**
 * @function
 * @description Clamps a value based on min and max
 * @param {number} x Number
 * @param {number} min Minimum
 * @param {number} max Maximum
 * @since 1.0.0-beta
 */
export default function clamp(x: number, min: number, max: number) {
  if (x < min) x = min;
  else if (x > max) x = max;
  return x;
}
