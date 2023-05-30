export default function isHex(str: string): boolean {
  return /^#[0-9A-F]{6}|#[0-9A-F]{3}$/i.test(str);
}
