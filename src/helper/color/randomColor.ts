export default function randomColor() {
	let a = '#';
	return (a += Math.floor(Math.random() * 16777215).toString(16));
}
