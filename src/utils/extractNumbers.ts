export default function extractNumbers(string: string) {
	return Number(string.match(/\d/g)?.join(''));
}
