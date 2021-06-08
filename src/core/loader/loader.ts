// utils
import validURL from '../../utils/validURL';

// loads images by URL or file path
// static class

export default class Loader {
	constructor() {
		throw new Error(
			'DuckEngine Error : Loader is a static class with no constructor. Use Loader.load.'
		);
	}

	public static async load(pathOrURL: string) {
		let isUrl = validURL(pathOrURL);
		if (isUrl) {
			let res = await fetch(pathOrURL);
			const blob = await res.blob();

			const url = URL.createObjectURL(blob.slice(0, 4000));

			const image = new Image();
			image.src = url;
			return image;
		} else {
			const image = new Image();
			image.src = pathOrURL;

			return image;
		}
	}
}
