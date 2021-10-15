// utils
import validURL from '../../utils/validURL';

// loads images by URL or file path
// static class

/**
 * @class Loader
 * @classdesc A static class that loads images and other assets
 * @description The Loader Class. Preloading and loading is handled here
 * @since 1.0.0-beta
 */
export default class Loader {
	/**
	 * @memberof Loader
	 * @description Loads an image
	 * @param {string} pathOrURL Path to the file or the URL
	 * @static
	 * @since 1.0.0-beta
	 */
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
