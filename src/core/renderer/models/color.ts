import hexNumberToString from '../../../utils/hexNumberToString';

/**
 * @class Color
 * @classdesc Creates a DuckEngine Color
 * @description The Color Class. Hexadecimal or CanvasGradients are stored and managed here, as well as stroke info
 * @since 3.0.0
 */
export default class Color {
  /**
   * @memberof Color
   * @description The color itself, string, CanvasGradient, or CanvasPattern. If passed as number, it is converted into a hex color string
   * @type string | CanvasGradient
   * @since 3.0.0
   */
  public value: string | CanvasGradient | CanvasPattern;

  /**
   * @memberof Color
   * @description Stroke color if passed, if originally a number hexadecimal color, it is converted to string, optional -> defaults: undefined
   * @type string | undefined
   * @default undefined
   * @since 3.0.0
   */
  public stroke?: string;

  /**
   * @memberof Color
   * @description Stroke width if passed, optional -> defaults: undefined
   * @type number | undefined
   * @since 3.0.0
   */
  public strokeWidth?: number;

  /**
   * @constructor Color
   * @description Creates a Color instance
   * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
   * @since 3.0.0
   */
  constructor(value: number | string | CanvasGradient | CanvasPattern);

  /**
   * @constructor Color
   * @description Creates a Color instance
   * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
   * @param {number | string} stroke Stroke color, if originally a number hexadecimal color, it is converted to string, hexadecimal ONLY
   * @param {number} strokeWidth Stroke width, must be a number
   * @since 3.0.0
   */
  constructor(
    value: number | string | CanvasGradient | CanvasPattern,
    stroke: number | string,
    strokeWidth: number
  );

  /**
   * @constructor Color
   * @description Creates a Color instance
   * @param {number | string | CanvasGradient | CanvasPattern} value Color value itself, number is converted to string later, hexadecimal, CanvasGradient, and CanvasPattern ONLY
   * @param {number | string | undefined} [stroke=undefined] Stroke color if passed, if originally a number hexadecimal color, it is converted to string, hexadecimal ONLY
   * @param {number | undefined} [strokeWidth=undefined] Stroke width if passed, must be a number
   * @since 3.0.0
   */
  constructor(
    value: number | string | CanvasGradient | CanvasPattern,
    stroke?: number | string,
    strokeWidth?: number
  ) {
    // convert value so that the CanvasRenderer can skip this step
    typeof value === 'number' ? (value = hexNumberToString(value)) : value;
    typeof stroke === 'number' ? (stroke = hexNumberToString(stroke)) : stroke;

    this.value = value;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
  }

  public static get lightRed() {
    return new Color('#df2c14');
  }

  public static get red() {
    return new Color('#ff0000');
  }

  public static get darkRed() {
    return new Color('#540100');
  }

  public static get lightOrange() {
    return new Color('#ffa136');
  }

  public static get orange() {
    return new Color('#ff8800');
  }

  public static get darkOrange() {
    return new Color('#b86200');
  }

  public static get lightYellow() {
    return new Color('#fcfc4e');
  }

  public static get yellow() {
    return new Color('#ffff00');
  }

  public static get darkYellow() {
    return new Color('#8f8f00');
  }

  public static get lightGreen() {
    return new Color('#53f553');
  }

  public static get green() {
    return new Color('#00ff00');
  }

  public static get darkGreen() {
    return new Color('#027802');
  }

  public static get lightBlue() {
    return new Color('#3131f7');
  }

  public static get blue() {
    return new Color('#0000ff');
  }

  public static get darkBlue() {
    return new Color('#000085');
  }

  public static get lightPurple() {
    return new Color('#b349f5');
  }

  public static get purple() {
    return new Color('#a020f0');
  }

  public static get darkPurple() {
    return new Color('#661499');
  }

  public static get white() {
    return new Color('#ffffff');
  }

  public static get gray() {
    return new Color('#808080');
  }

  public static get black() {
    return new Color('#000000');
  }

  public static get pink() {
    return new Color('#ffb3b3');
  }
}
