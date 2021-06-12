export default function getValuesHSL(hsl: string | any): string[] {
	hsl = hsl
		.substring(4, hsl.length - 1)
		.replace(/ /g, '')
		.replace(/%/g, '')
		.split(',');

	return hsl;
}
