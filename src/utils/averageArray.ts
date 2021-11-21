export default function averageArray(v: number[]) {
	return v.reduce((a, b) => a + b) / v.length;
}
