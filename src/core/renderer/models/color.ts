import hexNumberToString from '../../../utils/hexNumberToString';

export default class Color {
	public value: string | CanvasGradient;
	public stroke?: number | string;
	public strokeWidth?: number;

	constructor(
		value: number | string | CanvasGradient,
		stroke?: number | string,
		strokeWidth?: number
	) {
		// convert value so that the CanvasRenderer can skip this step
		typeof value === 'number' ? (value = hexNumberToString(value)) : value;
		typeof stroke === 'number'
			? (stroke = hexNumberToString(stroke))
			: stroke;

		this.value = value;
		this.stroke = stroke;
		this.strokeWidth = strokeWidth;
	}
}
