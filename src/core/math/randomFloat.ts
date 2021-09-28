import { Duck } from '../../index';

export default function randomFloat(min: number, max: number, fixed?: number) {
	const num = Math.random() * (max - min) + min;
	const res = num.toFixed(fixed || 2);
	return Number(res) as Duck.Types.Helper.AlphaRange;
}
