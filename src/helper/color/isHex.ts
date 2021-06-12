export default function isHex(str: string): boolean {
	return /^#[0-9A-F]{6}$/i.test(str);
}
