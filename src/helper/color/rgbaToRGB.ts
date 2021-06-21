export default function rgbaToRGB(rgba: string) {
	let res: any = rgba
		.replace('rgba', 'rgb')
		.replace(/[+-]?([.])[0-9]+/, '')
		.split(',');
	res.pop();
	res.join(',');
	res += ')';
	return res;
}
