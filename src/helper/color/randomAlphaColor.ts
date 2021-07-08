import { Duck } from '../../index';
import randomFloat from '../../utils/randomFloat';
import convertColorToRGBA from './convertColorToRGBA';
import randomColor from './randomColor';

export default function randomColorWithAlpha(alpha?: Duck.Helper.AlphaRange) {
	return convertColorToRGBA(randomColor(), alpha || randomFloat(0.1, 0.9));
}
