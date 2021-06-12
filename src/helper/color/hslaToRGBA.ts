import hslToRGB from './hslToRGB';

export default function hslaToRGBA(
	h: number | string,
	s: number | string,
	l: number | string,
	alpha: number
) {
	h = parseInt(h as string);
	l = parseInt(l as string);
	s = parseInt(s as string);

	var rgb = hslToRGB(h / 360, s / 100, l / 100),
		rgba =
			'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha + ')';

	return rgba;
}
