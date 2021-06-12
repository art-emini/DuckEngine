export default function rgbaToHSLA(
	r: number | string,
	g: number | string,
	b: number | string,
	a: number
) {
	r = parseInt(r as string);
	g = parseInt(g as string);
	b = parseInt(b as string);

	(r /= 255), (g /= 255), (b /= 255);

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h,
		s,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		//@ts-ignore
		h /= 6;
	}

	return `hsla(${h},${s},${l},${a})`;
}
