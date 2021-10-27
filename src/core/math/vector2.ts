/**
 * @class Vector2
 * @classdesc Creates a Vector2
 * @description The Vector2 Class. Represents a point
 * @since 2.0.0
 */
export default class Vector2 {
	/**
	 * @constructor Vector2
	 * @description Creates a Vector2 instance
	 * @param {number} [x=0] X position, optional -> defaults: 0
	 * @param {number} [y=0] Y position, optional -> defaults: 0
	 * @since 2.0.0
	 */
	constructor(public x = 0, public y = 0) {}

	/**
	 * @memberof Vector2
	 * @description Sets the values of the Vector2
	 * @param {number} x X position to setValue of
	 * @param {number} y Y position to setValue of
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public setValues(x: number, y: number) {
		this.x = x;
		this.y = y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Sets the values of the Vector2 based on another Vector2
	 * @param {number} vector Vector2 to use to set the position
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public setValuesVec(vector: Vector2) {
		this.x = vector.x;
		this.y = vector.y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Adds a Vector2
	 * @param {Vector2} vector Vector2 to be added to
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public add(vector: Vector2) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Adds a number to the x and y properties
	 * @param {number} number Number to add to x and y properties
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public addNumber(number: number) {
		this.x += number;
		this.y += number;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Subtracts a Vector2
	 * @param {Vector2} vector Vector2 to be subtracted to
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public subtract(vector: Vector2) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Subtracts a number from the x and y properties
	 * @param {number} number Number to subtract from x and y properties
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public subtractNumber(number: number) {
		this.x -= number;
		this.y -= number;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Multiplies a Vector2
	 * @param {Vector2} vector Vector2 to be multiplied to
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public multiply(vector: Vector2) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Multiplies a number to the x and y properties
	 * @param {number} number Number to multiply to x and y properties
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public multiplyNumber(number: number) {
		this.x *= number;
		this.y *= number;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Divides a Vector2
	 * @param {Vector2} vector Vector2 to be divided to
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public divide(vector: Vector2) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Divides a number to the x and y properties
	 * @param {number} number Number to divide to x and y properties
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public divideNumber(number: number) {
		this.x /= number;
		this.y /= number;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Rounds the Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Gets the angle between two Vector2s
	 * @param {Vector2} vector A Vector2 to get the angle between from
	 * @returns number
	 * @since 2.0.0
	 */
	public angleBetween(vector: Vector2) {
		return Math.atan2(
			this.x * vector.y - this.y * vector.x,
			this.x * vector.x + this.y * vector.y
		);
	}

	/**
	 * @memberof Vector2
	 * @description Gets the angle to two Vector2s
	 * @param {Vector2} vector A Vector2 to get the angle to from
	 * @returns number
	 * @since 2.0.0
	 */
	public angleTo(vector: Vector2) {
		return Math.atan2(vector.y - this.y, vector.x - this.x);
	}

	/**
	 * @memberof Vector2
	 * @description Clones the current Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public clone() {
		return new Vector2(this.x, this.y);
	}

	/**
	 * @memberof Vector2
	 * @description Gets the distance from another Vector2
	 * @param {Vector2} vector A Vector2 to get the distance from
	 * @returns number
	 * @since 2.0.0
	 */
	public distance(vector: Vector2) {
		return Math.sqrt(
			(vector.x - this.x) * (vector.x - this.x) +
				(vector.y - this.y) * (vector.y - this.y)
		);
	}

	/**
	 * @memberof Vector2
	 * @description Gets the distance squared from another Vector2
	 * @param {Vector2} vector A Vector2 to get the distance from
	 * @returns number
	 * @since 2.0.0
	 */
	public distanceSqr(vector: Vector2) {
		return (
			(vector.x - this.x) * (vector.x - this.x) +
			(vector.y - this.y) * (vector.y - this.y)
		);
	}

	/**
	 * @memberof Vector2
	 * @description Gets the dot product with another Vector2
	 * @param {Vector2} vector A Vector2 to get the dot product from
	 * @returns number
	 * @since 2.0.0
	 */
	public dot(vector: Vector2) {
		return this.x * vector.x + this.y * vector.y;
	}

	/**
	 * @memberof Vector2
	 * @description Gets the cross dot product with another Vector2
	 * @param {Vector2} vector A Vector2 to get the cross dot product from
	 * @returns number
	 * @since 2.0.0
	 */
	public crossProduct(vector: Vector2) {
		return this.x * vector.y - this.y * vector.x;
	}

	/**
	 * @memberof Vector2
	 * @description Checks if another Vector2 is equal on both axises
	 * @param {Vector2} vector A Vector2 to compare with
	 * @returns boolean
	 * @since 2.0.0
	 */
	public equals(vector: Vector2) {
		return this.x === vector.x && this.y === vector.y;
	}

	/**
	 * @memberof Vector2
	 * @description Gets the perpendicular values of the Vector2
	 * @param {Vector2} [resultVector] The new Vector2 to save the value to, optional -> defaults: new Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public perpendicular(resultVector?: Vector2) {
		resultVector = resultVector || new Vector2();
		return resultVector.setValues(-this.y, this.x);
	}

	/**
	 * @memberof Vector2
	 * @description Gradually interpolates the Vector2 towards another Vector2 by an amount
	 * @param {Vector2} current The Current Vector
	 * @param {Vector2} target The Target Vector2
	 * @param {number} maxDistanceDelta The amount to increase by
	 * @returns Vector2
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof Vector2
	 * @description Normalizes the Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof Vector2
	 * @description Gets the normal value of the Vector2 and another Vector2
	 * @param
	 * @param {Vector2} [resultVector] The new Vector2 to save the value to, optional -> defaults: new Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public getNormal(vector: Vector2, resultVector?: Vector2) {
		resultVector = resultVector || new Vector2();
		return resultVector
			.setValues(vector.y - this.y, this.x - vector.x)
			.normalize();
	}

	/**
	 * @memberof Vector2
	 * @description Determines if Vector2.x and Vector2.y are both equal to 0
	 * @returns boolean
	 * @since 2.0.0
	 */
	public isZero() {
		return this.x === 0 && this.y === 0;
	}

	/**
	 * @memberof Vector
	 * @description Scales the Vector2 by a scalar Vector2
	 * @param {Vector2} scalar A Vector2 that is used to scale the current Vector2
	 * @returns Vector
	 * @since 2.0.0
	 */
	public scale(scalar: Vector2) {
		this.x *= scalar.x;
		this.y *= scalar.y;

		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Sets Vector2.x and Vector2.y to their negative values
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public negate() {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Returns the magnitude or length of the Vector2
	 * @returns number
	 * @since 2.0.0
	 */
	public magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * @memberof Vector2
	 * @description Returns the magnitude/lenth squared of the Vector2
	 * @returns number
	 * @since 2.0.0
	 */
	public magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	/**
	 * @memberof Vector2
	 * @description Scales the Vector2 by the magnitude or length
	 * @param magnitude The magnitude or length of the Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public scaleToMagnitude(magnitude: number) {
		const k = magnitude / this.magnitude();
		this.x *= k;
		this.y *= k;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Returns the string version of the Vector2
	 * @example console.log(new Vector2(0, 0).toString()) // Vector2(0, 0)
	 * @returns string
	 * @since 2.0.0
	 */
	public toString() {
		return `Vector2(${this.x}, ${this.y})`;
	}

	/**
	 * @memberof Vector2
	 * @description Sets the values to be precise by using Number.toPrecision
	 * @param {number} precision The precision
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public toPrecision(precision: number) {
		this.x = Number(this.x.toPrecision(precision));
		this.y = Number(this.y.toPrecision(precision));

		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Adds to the Vector2 by an amount
	 * @param {number} dx Delta x, the amount to increase the x value by
	 * @param {number} dy Delta y, the amount to increase the y value by
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public translate(dx: number, dy: number) {
		this.x += dx;
		this.y += dy;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Adds to the Vector2.x by an amount
	 * @param {number} dx Delta x, the amount to increase the x value by
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public translateX(dx: number) {
		this.x += dx;
		return this;
	}

	/**
	 * @memberof Vector2
	 * @description Adds to the Vector2.y by an amount
	 * @param {number} dy Delta y, the amount to increase the y value by
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public translateY(dy: number) {
		this.x += dy;
		return this;
	}
	/**
	 * @memberof Vector2
	 * @description Gets the dot product using three different Vector2s
	 * @param {Vector2} a A Vector2
	 * @param {Vector2} b A Vector2
	 * @param {Vector2} c A Vector2
	 * @param {Vector2} [resultVector=Vector2] A Vector2 that the result is saved in, optional -> defaults: new Vector2
	 * @returns Vector2
	 * @since 2.0.0
	 */
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

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with 0 set as x and y
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static get ZERO() {
		return new Vector2(0, 0);
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with 0 set as x and -1 set as y
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static get UP() {
		return new Vector2(0, -1);
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with 0 set as x and 1 set as y
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static get DOWN() {
		return new Vector2(0, 1);
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with -1 set as x and 0 set as y
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static get LEFT() {
		return new Vector2(-1, 0);
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with 1 set as x and 0 set as y
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static get RIGHT() {
		return new Vector2(1, 0);
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with passed parameters, if no parameters are passed, a Vector2.ZERO is returned
	 * @param {number} [x] X position, optional -> defaults: 0
	 * @param {number} [y] Y position, optional -> defaults: 0
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static CREATE(x?: number, y?: number) {
		if (!x && !y) return this.ZERO; // none
		if (x && !y) return new Vector2(x); // only x
		if (!x && y) return new Vector2(0, y); // only y
		return new Vector2(x, y); // both
	}

	/**
	 * @memberof Vector2
	 * @static
	 * @description Returns a Vector2 with values from a passed Vector2
	 * @param {Vector2} vector Vector2 to create a Vector2 from
	 * @returns Vector2
	 * @since 2.0.0
	 */
	public static fromVec(vector: Vector2) {
		return new Vector2(vector.x, vector.y);
	}
}
