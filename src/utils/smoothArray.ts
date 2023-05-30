import averageArray from './averageArray';

export default function smoothOut(vector: number[], variance: number) {
  const t_avg = averageArray(vector) * variance;
  const ret = Array(vector.length);
  for (let i = 0; i < vector.length; i++) {
    (function () {
      const prev = i > 0 ? ret[i - 1] : vector[i];
      const next = i < vector.length ? vector[i] : vector[i - 1];
      ret[i] = averageArray([t_avg, averageArray([prev, vector[i], next])]);
    })();
  }
  return averageArray(ret);
}
