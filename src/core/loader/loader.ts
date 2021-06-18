// utils
import validURL from '../../utils/validURL';
import Debug from '../debug/debug';

// loads images by URL or file path
// static class

export default class Loader {
	constructor() {
		new Debug.Error(
			'Loader is a static class with no constructor. Use Loader.load.'
		);
	}

	public static async load(pathOrURL: string) {
		const isUrl = validURL(pathOrURL);
		if (isUrl) {
			const res = await fetch(pathOrURL);
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
