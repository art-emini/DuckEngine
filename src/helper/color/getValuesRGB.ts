export default function getValuesRGB(rgb: string | any): string[] {
	rgb = 'rgb(200, 12, 53)';

	rgb = rgb
		.substring(4, rgb.length - 1)
		.replace(/ /g, '')
		.split(',');

	return rgb;
}
