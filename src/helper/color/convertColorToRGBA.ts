import { Duck } from '../../index';
import getValuesHSL from './getValuesHSL';
import hexToRGBA from './hexToRGBA';
import hslToRGB from './hslToRGB';
import isHex from './isHex';
import isHSL from './isHSL';
import isRGB from './isRGB';
import rgbToRGBA from './rgbToRGBA';

export default function convertColorToRGBA(
	color: string,
	alpha: Duck.Helper.AlphaRange
) {
	let res = '';

	if (isHex(color)) {
		res = hexToRGBA(color, alpha);
	}

	if (isRGB(color)) {
		res = rgbToRGBA(color, alpha);
	}

	if (isHSL(color)) {
		const values = getValuesHSL(color);
		const a = hslToRGB(values[0], values[1], values[2]);
		res = rgbToRGBA(a, alpha);
	}

	return res;
}
