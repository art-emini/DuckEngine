export default function clamp(x: number, min: number, max: number) {
	if (x < min) x = min;
	else if (x > max) x = max;
	return x;
}
