export default function getImageData(
  image: HTMLImageElement,
  w: number,
  h: number,
  onComplete: (data: string) => void,
  onFail: () => void
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let data = '__EMPTY__';

  canvas.width = w;
  canvas.height = h;

  image.onload = () => {
    if (ctx) {
      ctx.drawImage(image, 0, 0);
      data = canvas.toDataURL();
      onComplete(data);
    } else {
      data = '__FAILED__';
      onFail();
    }
  };
}
