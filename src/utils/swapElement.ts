export default function swapElement<t = unknown>(
	array: t[],
	index1: number,
	index2: number
) {
	array[index1] = array.splice(index2, 1, array[index1])[0];
	return array;
}
