import Debug from '../../core/debug/debug';
import isHex from './isHex';

export default function hexToRGBA(hex: string, alpha: number) {
	if (isHex(hex)) {
		const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
		return `rgba(${r},${g},${b},${alpha})`;
	} else {
		new Debug.Error('Cannot convert hex to RGBA. Invalid hex.');
		return 'rgba(0, 0, 0, 1)';
	}
}
