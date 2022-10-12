import { Duck } from '../../index';
import randomFloat from '../../core/math/randomFloat';
import convertColorToRGBA from './convertColorToRGBA';
import randomColor from './randomColor';

export default function randomColorWithAlpha(
  alpha?: Duck.Types.Helper.AlphaRange
) {
  return convertColorToRGBA(
    randomColor(),
    alpha || (randomFloat(0.1, 0.9) as Duck.Types.Helper.AlphaRange)
  );
}
