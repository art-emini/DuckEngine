export default function getValuesHSL(hsl: string): string[] {
  let res = hsl
    .substring(4, hsl.length - 1)
    .replace(/ /g, '')
    .replace(/%/g, '')
    .split(',');

  return res;
}
