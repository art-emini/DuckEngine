import randomFloat from '../../utils/randomFloat';
import hexToRGBA from './hexToRGBA';
import randomColor from './randomColor';

export default function randomColorWithAlpha(alpha?: number) {
	return hexToRGBA(randomColor(), alpha || randomFloat(0.1, 0.9));
}
