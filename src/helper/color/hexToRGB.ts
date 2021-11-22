export default function hexToRGB(hex: string) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result
		? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
				result[3],
				16
		  )})`
		: null;
}
