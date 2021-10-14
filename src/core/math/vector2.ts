export default class Vector2 {
	constructor(public x = 0, public y = 0) {}

	public setValues(x: number, y: number) {
		this.x = x;
		this.y = y;
		return this;
	}

	public add(vector: Vector2) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	public addNumber(number: number) {
		this.x += number;
		this.y += number;
		return this;
	}

	public subtract(vector: Vector2) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	public subtractNumber(number: number) {
		this.x -= number;
		this.y -= number;
		return this;
	}

	public multiply(vector: Vector2) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	}

	public multiplyNumber(number: number) {
		this.x *= number;
		this.y *= number;
		return this;
	}

	public divide(vector: Vector2) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	}

	public divideNumber(number: number) {
		this.x /= number;
		this.y /= number;
		return this;
	}

	public round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	public angleBetween(vector: Vector2) {
		return Math.atan2(
			this.x * vector.y - this.y * vector.x,
			this.x * vector.x + this.y * vector.y
		);
	}

	public angleTo(vector: Vector2) {
		return Math.atan2(vector.y - this.y, vector.x - this.x);
	}

	public clone() {
		return new Vector2(this.x, this.y);
	}

	public distance(vector: Vector2) {
		return Math.sqrt(
			(vector.x - this.x) * (vector.x - this.x) +
				(vector.y - this.y) * (vector.y - this.y)
		);
	}

	public distanceSqr(vector: Vector2) {
		return (
			(vector.x - this.x) * (vector.x - this.x) +
			(vector.y - this.y) * (vector.y - this.y)
		);
	}

	public dot(vector: Vector2) {
		return this.x * vector.x + this.y * vector.y;
	}

	public crossProduct(vector: Vector2) {
		return this.x * vector.y - this.y * vector.x;
	}

	public equals(vector: Vector2) {
		return this.x === vector.x && this.y === vector.y;
	}

	public perpendicular(resultVector?: Vector2) {
		resultVector = resultVector || new Vector2();
		return resultVector.setValues(-this.y, this.x);
	}

	public moveTowards(
		current: Vector2,
		target: Vector2,
		maxDistanceDelta: number
	) {
		const toVector_x = target.x - current.x;
		const toVector_y = target.y - current.y;

		const sqDist = toVector_x * toVector_x + toVector_y * toVector_y;

		if (
			sqDist === 0 ||
			(maxDistanceDelta >= 0 &&
				sqDist <= maxDistanceDelta * maxDistanceDelta)
		) {
			return target;
		}

		const dist = Math.sqrt(sqDist);

		const newX = current.x + (toVector_x / dist) * maxDistanceDelta;
		const newY = current.y + (toVector_y / dist) * maxDistanceDelta;

		return new Vector2(newX, newY);
	}

	public normalize() {
		const length = Math.sqrt(this.x * this.x + this.y * this.y);

		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.x /= length;
			this.y /= length;
		}

		return this;
	}

	public getNormal(vector: Vector2, resultVector?: Vector2) {
		resultVector = resultVector || new Vector2();
		return resultVector
			.setValues(vector.y - this.y, this.x - vector.x)
			.normalize();
	}

	public isZero() {
		return this.x === 0 && this.y === 0;
	}

	public isZeroV(vector: Vector2) {
		return vector.x === 0 && vector.y === 0;
	}

	public scale(scalar: Vector2) {
		this.x *= scalar.x;
		this.y *= scalar.y;

		return this;
	}

	public negate() {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	public magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	public scaleToMagnitude(magnitude: number) {
		const k = magnitude / this.magnitude();
		this.x *= k;
		this.y *= k;
		return this;
	}

	public toString() {
		return `Vector2(${this.x}, ${this.y})`;
	}

	public toPrecision(precision: number) {
		this.x = Number(this.x.toPrecision(precision));
	}

	public translate(dx: number, dy: number) {
		this.x += dx;
		this.y += dy;
		return this;
	}

	public translateX(dx: number) {
		this.x += dx;
		return this;
	}
	public translateY(dy: number) {
		this.x += dy;
		return this;
	}

	public tripleProduct(
		a: Vector2,
		b: Vector2,
		c: Vector2,
		resultVector?: Vector2
	) {
		resultVector = resultVector || new Vector2();
		const ac = a.dot(c);
		const bc = b.dot(c);
		return resultVector.setValues(b.x * ac - a.x * bc, b.y * ac - a.y * bc);
	}

	// STATIC

	public static get ZERO() {
		return new Vector2(0, 0);
	}

	public static get UP() {
		return new Vector2(0, -1);
	}
	public static get DOWN() {
		return new Vector2(0, 1);
	}
	public static get LEFT() {
		return new Vector2(-1, 0);
	}
	public static get RIGHT() {
		return new Vector2(-1, 0);
	}
}
