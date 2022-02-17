export default function getValuesRGB(rgb: string | any): number[] {
	rgb = rgb
		.substring(4, rgb.length - 1)
		.replace(/ /g, '')
		.split(',');

	return (rgb as string[]).map((str: string) => parseInt(str));
}
