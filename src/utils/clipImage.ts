export default function clipImage(
	image: HTMLImageElement,
	clipX: number,
	clipY: number,
	clipW: number,
	clipH: number,
	onComplete: (image: HTMLImageElement) => void,
	onFail: () => void
) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	let data = '__EMPTY__';

	canvas.width = clipW;
	canvas.height = clipH;

	image.onload = () => {
		if (ctx) {
			ctx.drawImage(
				image,
				clipX,
				clipY,
				clipW,
				clipH,
				0,
				0,
				clipW,
				clipH
			);
			data = canvas.toDataURL();

			const img = new Image();
			img.setAttribute('src', data);

			onComplete(img);
		} else {
			data = '__FAILED__';
			onFail();
		}
	};
}
