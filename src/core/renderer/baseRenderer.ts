import Game from '../game';
import TextureBase from '../texture/textureBase';
import { BlendModes } from './canvas/const/blendModes';
import Color from './models/color';

export default abstract class BaseRenderer {
  public game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public abstract clearFrame(): void;
  public abstract drawRect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: Color
  ): void;
  public abstract drawCircle(
    x: number,
    y: number,
    r: number,
    color: Color
  ): void;
  public abstract drawRoundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: Color
  ): void;
  public abstract drawSprite(
    x: number,
    y: number,
    w: number,
    h: number,
    texture: TextureBase<'image'>,
    frameWidth?: number,
    frameHeight?: number,
    currentRow?: number,
    currentCol?: number
  ): void;
  public abstract save(): void;
  public abstract restore(): void;
  public abstract scale(x: number, y: number): void;
  public abstract translate(x: number, y: number): void;
  public abstract transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): void;
  public abstract setFont(font: string): void;
  public abstract measureText(font: string, text: string): void;
  public abstract drawText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number
  ): void;
  public abstract strokeText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number
  ): void;
  public abstract setFillColor(color: Color): void;
  public abstract setStrokeColor(color: Color): void;
  public abstract setLineWidth(width: number): void;
  public abstract setBlendMode(blendMode: keyof typeof BlendModes): void;
}
